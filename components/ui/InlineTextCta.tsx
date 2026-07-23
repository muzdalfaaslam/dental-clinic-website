'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';

const variants = {
  // Quiet, underlined text link.
  subtle:
    'inline-flex items-center gap-1.5 text-sm text-charcoal/60 underline decoration-champagne/60 underline-offset-4 hover:text-sage-deep',
  // Full-weight primary button, same visual language as Button's primary variant.
  bold:
    'inline-flex items-center justify-center gap-2 rounded-lg bg-sage-deep px-8 py-4 text-base font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 hover:-translate-y-0.5 hover:bg-[rgb(15_70_87)] hover:shadow-card motion-safe:hover:-translate-y-0.5',
};

/**
 * A CTA for real page navigation (e.g. to /quiz) — distinct from Button,
 * which only ever smooth-scrolls to the on-page conversion anchor (#qualify).
 * `variant="subtle"` is a quiet underlined text link; `variant="bold"` reads
 * as a full primary CTA button while still doing a real Link navigation.
 */
export function InlineTextCta({
  href,
  source,
  variant = 'subtle',
  className,
  children,
}: {
  href: string;
  source: string;
  variant?: 'subtle' | 'bold';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => track('cta_click', { source })}
      className={cn('group transition-all duration-200', variants[variant], className)}
    >
      {children}
      <ArrowRight
        aria-hidden
        className={cn(
          'transition-transform duration-200 motion-safe:group-hover:translate-x-0.5',
          variant === 'bold' ? 'size-4' : 'size-3.5',
        )}
        strokeWidth={1.75}
      />
    </Link>
  );
}