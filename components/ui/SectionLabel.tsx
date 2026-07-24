import { cn } from '@/lib/utils';

/**
 * Eyebrow label — uppercase Inter, wide tracking, sage-soft. Optionally paired
 * with a short champagne rule to its left for an editorial feel (brief §4.2).
 * `tone="invert"` switches to cream tones for use on dark (sage-deep) sections.
 * Pass `lines` (instead of `children`) for a deliberate multi-line eyebrow —
 * this avoids the browser wrapping a short phrase mid-word/mid-phrase.
 */
export function SectionLabel({
  children,
  lines,
  className,
  withRule = true,
  tone = 'default',
}: {
  children?: React.ReactNode;
  lines?: string[];
  className?: string;
  withRule?: boolean;
  tone?: 'default' | 'invert';
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-eyebrow font-medium uppercase',
        tone === 'invert' ? 'text-cream/80' : 'text-sage-soft',
        className,
      )}
    >
      {withRule && (
        <span aria-hidden className={cn('h-px w-8 shrink-0', tone === 'invert' ? 'bg-cream/40' : 'bg-champagne')} />
      )}
      {lines ? (
        <span className="flex flex-col">
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      ) : (
        children
      )}
    </p>
  );
}