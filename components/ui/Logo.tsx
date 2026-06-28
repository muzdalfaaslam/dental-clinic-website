import { cn } from '@/lib/utils';

/**
 * TechxServe wordmark. Deliberately understated on the page — the brand lives
 * only in the nav + footer (brief §5, §11). The "x" is the single brand glyph;
 * in the footer it may carry the small permitted red accent via `accent`.
 */
export function Logo({
  className,
  accent = false,
}: {
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        'font-display text-lg font-semibold tracking-tight text-sage-deep',
        className,
      )}
    >
      Techx
      <span className={accent ? 'text-accent-brand' : 'text-champagne'}>Serve</span>
    </span>
  );
}
