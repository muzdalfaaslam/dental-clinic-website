'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';

/**
 * A quiet, underlined text-link CTA for real page navigation (e.g. to /quiz).
 * Distinct from Button, which only ever smooth-scrolls to the on-page
 * conversion anchor (#qualify) — this one leaves the page.
 */
export function InlineTextCta({
  href,
  source,
  className,
  children,
}: {
  href: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => track('cta_click', { source })}
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm text-charcoal/60 underline decoration-champagne/60 underline-offset-4 transition-colors duration-200 hover:text-sage-deep',
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  );
}
