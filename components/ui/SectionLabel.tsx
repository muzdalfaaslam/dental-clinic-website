import { cn } from '@/lib/utils';

/**
 * Eyebrow label — uppercase Inter, wide tracking, sage-soft. Optionally paired
 * with a short champagne rule to its left for an editorial feel (brief §4.2).
 * `tone="invert"` switches to cream tones for use on dark (sage-deep) sections.
 */
export function SectionLabel({
  children,
  className,
  withRule = true,
  tone = 'default',
}: {
  children: React.ReactNode;
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
        <span aria-hidden className={cn('h-px w-8', tone === 'invert' ? 'bg-cream/40' : 'bg-champagne')} />
      )}
      {children}
    </p>
  );
}