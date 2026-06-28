/**
 * Tiny classname combiner — conditionally joins truthy strings and de-dupes
 * whitespace. Kept dependency-free (no clsx/tailwind-merge) to keep first-load JS lean.
 */
export type ClassValue = string | number | null | false | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}
