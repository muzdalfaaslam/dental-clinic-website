import { z } from 'zod';
import { form } from '@/config/content';

/**
 * Single Zod schema — the SAME object validates on the client (React Hook Form
 * resolver) and again on the server (Edge API route). Never trust the client.
 * Option enums are derived from config/content.ts so adding a dropdown choice in
 * one place keeps both sides in sync. See brief §7.
 */

/* ── Phone helpers ────────────────────────────────────────────────────────── */

/** Strip to digits, dropping a leading US country code if the user typed one. */
export function digitsOnly(value: string): string {
  const d = value.replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d;
}

/** Progressively format keystrokes into US `(xxx) xxx-xxxx`. */
export function formatUsPhone(value: string): string {
  const d = digitsOnly(value).slice(0, 10);
  if (d.length === 0) return '';
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Loose URL normalizer for the optional website field. */
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const looseUrl = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (v) => v === '' || /^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v.replace(/^https?:\/\//i, '')),
    { message: 'Please enter a valid website (e.g. glowaesthetic.com).' },
  );

/* ── Option enums (non-empty tuples for z.enum) ───────────────────────────── */
const asTuple = (arr: readonly string[]) => arr as [string, ...string[]];

const roleEnum = z.enum(asTuple(form.fields.role.options));
const patientsEnum = z.enum(asTuple(form.fields.patientsPerMonth.options));
const timelineEnum = z.enum(asTuple(form.fields.timeline.options));
const frustrationValues = form.fields.frustration.options;

/* ── The lead schema ──────────────────────────────────────────────────────── */
export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'That name is a little too long.'),
  clinicName: z
    .string()
    .trim()
    .min(2, 'Please enter your clinic or business name.')
    .max(120, 'That name is a little too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .max(254, 'That email is a little too long.')
    .email('Please enter a valid email address.'),
  website: looseUrl.optional().default(''),
  phone: z
    .string()
    .transform((v) => digitsOnly(v))
    .pipe(z.string().length(10, 'Please enter a valid 10-digit US phone number.')),
  cityState: z
    .string()
    .trim()
    .min(2, 'Please enter your city and state.')
    .max(80, 'That’s a little too long.'),
  role: roleEnum,
  patientsPerMonth: patientsEnum,
  frustration: z
    .array(z.enum(asTuple(frustrationValues)))
    .min(1, 'Please pick at least one.'),
  timeline: timelineEnum,
  // ⚠ TCPA: must be literally true — the form cannot submit otherwise.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to be contacted so we can reach you.' }),
  }),
  // Anti-spam: honeypot must stay empty; renderedAt powers a min-fill-time check.
  company: z.string().max(0).optional().default(''), // honeypot (hidden field)
  renderedAt: z.number().optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

/** Default values for React Hook Form. */
export const leadDefaults: LeadInput = {
  fullName: '',
  clinicName: '',
  email: '',
  website: '',
  phone: '',
  cityState: '',
  role: '' as LeadInput['role'],
  patientsPerMonth: '' as LeadInput['patientsPerMonth'],
  frustration: [],
  timeline: '' as LeadInput['timeline'],
  consent: false as unknown as true,
  company: '',
};
