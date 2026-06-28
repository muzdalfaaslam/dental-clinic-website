'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ctas, FORM_ANCHOR } from '@/config/content';

/**
 * Fixed bottom CTA bar, mobile only — keeps the single action one tap away since
 * the form sits far down the page (brief §5, §12). Hidden while the form itself
 * is on screen (no point pointing at what you're already looking at) and hidden
 * on lg+ where the sticky nav CTA is always visible.
 */
export function StickyMobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(FORM_ANCHOR);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(Boolean(entry?.isIntersecting)),
      { rootMargin: '0px 0px -40% 0px' },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden',
        hidden ? 'translate-y-full' : 'translate-y-0',
      )}
    >
      <Button source="sticky_mobile" size="lg" className="w-full" withArrow={false}>
        {ctas.stickyMobile}
      </Button>
    </div>
  );
}
