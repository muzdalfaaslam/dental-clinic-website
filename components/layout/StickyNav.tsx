'use client';

import { useEffect, useState } from 'react';
import { Flower2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';
import { ctas, nav } from '@/config/content';

/**
 * Sticky top nav: brand mark left, single CTA right (brief §5). Transparent and
 * roomy over the hero; on scroll it collapses (padding shrinks) into a
 * glassmorphic bar — translucent cream, heavy backdrop blur, hairline + soft
 * shadow.
 */
export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300',
        scrolled
          ? 'border-b border-white/50 bg-cream/55 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-cream/45'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between transition-all duration-300',
          scrolled ? 'py-2.5' : 'py-5',
        )}
      >
        <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="TechxServe, back to top">
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-xl bg-sage-deep text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-300',
              scrolled ? 'size-8' : 'size-9',
            )}
          >
            <Flower2 className="size-[1.05rem]" strokeWidth={1.5} />
          </span>
          <Logo />
        </a>

        <nav aria-label="Section links" className="hidden items-center gap-7 lg:flex">
          {nav.links.map((link) => (
            
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/70 transition-colors duration-200 hover:text-sage-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          source="nav"
          size="md"
          withArrow={false}
          className="whitespace-nowrap px-3 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
        >
          {ctas.nav}
        </Button>
      </Container>
    </header>
  );
}