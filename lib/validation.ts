import { z } from 'zod';
import { qualifierOptions } from '@/config/content';

/**
 * Shared validation primitives — reused by both the qualify flow
 * (lib/qualifyValidation.ts) and the quiz funnel (lib/quizValidation.ts) so
 * option enums and the URL check stay in sync everywhere they're used.
 */

/** Loose URL normalizer for the optional website field. */
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export const looseUrl = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (v) => v === '' || /^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v.replace(/^https?:\/\//i, '')),
    { message: 'Please enter a valid website (e.g. glowaesthetic.com).' },
  );

/* ── Option enums (non-empty tuples for z.enum) ───────────────────────────── */
export const asTuple = (arr: readonly string[]) => arr as [string, ...string[]];

export const roleEnum = z.enum(asTuple(qualifierOptions.role));
export const patientsEnum = z.enum(asTuple(qualifierOptions.patientsPerMonth));
export const timelineEnum = z.enum(asTuple(qualifierOptions.timeline));
export const frustrationValues = qualifierOptions.frustration;
