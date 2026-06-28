import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { form } from '@/config/content';

export const runtime = 'edge';

/**
 * Lead handler (Edge). Re-validates with the SAME Zod schema (never trust the
 * client), enforces honeypot + min-fill-time, rate-limits by IP, records consent
 * + timestamp for the TCPA audit trail, and forwards to LEAD_WEBHOOK_URL. If the
 * webhook env var is unset it logs and returns success so the UI flow is testable
 * in dev. Never throws an unhandled error to the user. Brief §7.
 */

// Minimum seconds a real human takes to fill the form (timing spam guard).
const MIN_FILL_SECONDS = 3;

// Simple in-memory IP rate limit. Edge isolates are short-lived, so this is a
// best-effort guard; swap for Edge KV / Upstash for durable limits across regions.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request): Promise<Response> {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again in a moment.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: a filled "company" field means a bot. Pretend success, drop silently.
  if (typeof body === 'object' && body !== null && 'company' in body) {
    const company = (body as Record<string, unknown>).company;
    if (typeof company === 'string' && company.trim() !== '') {
      return NextResponse.json({ ok: true });
    }
  }

  // Timing guard: submitted implausibly fast → treat as spam, drop silently.
  if (typeof body === 'object' && body !== null && 'renderedAt' in body) {
    const renderedAt = Number((body as Record<string, unknown>).renderedAt);
    if (Number.isFinite(renderedAt)) {
      const elapsed = (Date.now() - renderedAt) / 1000;
      if (elapsed < MIN_FILL_SECONDS) {
        return NextResponse.json({ ok: true });
      }
    }
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Some details look off. Please review and try again.' },
      { status: 422 },
    );
  }

  // Strip spam-control fields; assemble the durable lead record.
  const { company: _company, renderedAt: _renderedAt, ...lead } = parsed.data;
  void _company;
  void _renderedAt;

  const record = {
    ...lead,
    consent: true as const,
    consentText: form.consent.text, // exact text the user agreed to
    consentVersion: form.consent.version, // version stamp for the audit trail
    submittedAt: new Date().toISOString(),
    sourceIp: ip,
    niche: 'med-spa',
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Dev fallback: no webhook configured. Log so the flow is testable; return ok.
    console.info('[lead] LEAD_WEBHOOK_URL unset — lead captured locally:', record);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error('[lead] webhook responded', res.status);
      return NextResponse.json(
        { ok: false, error: 'We couldn’t save your request. Please try again.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[lead] webhook error', err);
    return NextResponse.json(
      { ok: false, error: 'We couldn’t reach our servers. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
