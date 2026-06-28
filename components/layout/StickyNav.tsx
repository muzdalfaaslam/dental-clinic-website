'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';
import { ctas } from '@/config/content';

/**
 * Sticky top nav: small TechxServe logo left, single CTA right, nothing else
 * (brief §5). Transparent over the hero; condenses to a solid cream bar with a
 * hairline + shadow once scrolled.
 */
export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-line bg-cream/85 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex items-center justify-between py-3.5">
        <a href="#top" className="inline-flex items-center" aria-label="TechxServe, back to top">
          <Logo />
        </a>
        <Button source="nav" size="md" withArrow={false} className="px-5 py-2.5 text-sm">
          {ctas.nav}
        </Button>
      </Container>
    </header>
  );
}
