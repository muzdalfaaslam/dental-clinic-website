import { cn } from '@/lib/utils';

/** Centered max-width wrapper with fluid side gutters (brief §4.3). */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-container px-gutter', className)}
    >
      {children}
    </Tag>
  );
}
