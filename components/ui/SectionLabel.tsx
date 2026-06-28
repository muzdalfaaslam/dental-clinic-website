import { cn } from '@/lib/utils';

/**
 * Eyebrow label — uppercase Inter, wide tracking, sage-soft. Optionally paired
 * with a short champagne rule to its left for an editorial feel (brief §4.2).
 */
export function SectionLabel({
  children,
  className,
  withRule = true,
}: {
  children: React.ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-eyebrow font-medium uppercase text-sage-soft',
        className,
      )}
    >
      {withRule && (
        <span aria-hidden className="h-px w-8 bg-champagne" />
      )}
      {children}
    </p>
  );
}
