import { NextResponse } from 'next/server';
import { qualifyLeadSchema } from '@/lib/qualifyValidation';

export const runtime = 'edge';

/**
 * Qualify-flow lead handler (Edge) — the site's single conversion target
 * (id="qualify"). Same shape as the other lead routes (honeypot +
 * min-fill-time + IP rate limit, re-validates server-side, forwards to
 * LEAD_WEBHOOK_URL), tagged `source: 'qualify'` and carrying the visitor's
 * scheduling preference so the CRM knows whether to expect a Cal.com booking
 * or needs to propose a time itself.
 */

const MIN_FILL_SECONDS = 2;

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

  if (typeof body === 'object' && body !== null && 'company' in body) {
    const company = (body as Record<string, unknown>).company;
    if (typeof company === 'string' && company.trim() !== '') {
      return NextResponse.json({ ok: true });
    }
  }

  if (typeof body === 'object' && body !== null && 'renderedAt' in body) {
    const renderedAt = Number((body as Record<string, unknown>).renderedAt);
    if (Number.isFinite(renderedAt)) {
      const elapsed = (Date.now() - renderedAt) / 1000;
      if (elapsed < MIN_FILL_SECONDS) {
        return NextResponse.json({ ok: true });
      }
    }
  }

  const parsed = qualifyLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Some details look off. Please review and try again.' },
      { status: 422 },
    );
  }

  const { company: _company, renderedAt: _renderedAt, ...lead } = parsed.data;
  void _company;
  void _renderedAt;

  const record = {
    ...lead,
    source: 'qualify' as const,
    submittedAt: new Date().toISOString(),
    sourceIp: ip,
    niche: 'dental-clinic',
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.info('[qualify-lead] LEAD_WEBHOOK_URL unset — lead captured locally:', record);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error('[qualify-lead] webhook responded', res.status);
      return NextResponse.json(
        { ok: false, error: 'We couldn’t save your request. Please try again.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[qualify-lead] webhook error', err);
    return NextResponse.json(
      { ok: false, error: 'We couldn’t reach our servers. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
