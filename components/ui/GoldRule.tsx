import { cn } from '@/lib/utils';

/** Thin champagne divider — gold is seasoning, used sparingly (brief §4.1, §4.3). */
export function GoldRule({
  className,
  width = 'w-12',
}: {
  className?: string;
  width?: string;
}) {
  return <span aria-hidden className={cn('block h-px bg-champagne', width, className)} />;
}
