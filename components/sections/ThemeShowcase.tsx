'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { applyThemeVars, resetThemeVars } from '@/lib/theme-runtime';
import { themeVariants } from '@/config/theme';
import { themeShowcase } from '@/config/content';

const swatchKeys = ['--color-sage-deep', '--color-champagne', '--color-rose'] as const;

/**
 * New section — a live, visitor-facing proof of the re-skin seam the README
 * documents for developers: swapping `--color-*` values re-skins the whole
 * page instantly. Purely a client-side/session-only demo — no persistence,
 * no SSR change (see lib/theme-runtime.ts).
 */
export function ThemeShowcase() {
  const [active, setActive] = useState(0);

  const select = (i: number) => {
    setActive(i);
    applyThemeVars(themeVariants[i]!.cssVars);
  };

  const reset = () => {
    setActive(0);
    resetThemeVars(themeVariants[active]!.cssVars);
  };

  return (
    <section className="py-section">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{themeShowcase.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep">{themeShowcase.headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-charcoal/70">{themeShowcase.blurb}</p>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-9 flex flex-wrap items-center justify-center gap-3" stagger={0.05}>
          {themeVariants.map((variant, i) => (
            <StaggerItem key={variant.name}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={active === i}
                className={[
                  'group flex items-center gap-3 rounded-full border bg-cream py-2 pl-2 pr-4 transition-all duration-200',
                  active === i
                    ? 'border-sage-deep/50 shadow-card'
                    : 'border-line shadow-soft hover:border-champagne/50 hover:shadow-card',
                ].join(' ')}
              >
                <span className="flex -space-x-1.5" aria-hidden>
                  {swatchKeys.map((key) => (
                    <span
                      key={key}
                      className="size-5 rounded-full ring-2 ring-cream"
                      style={{ backgroundColor: `rgb(${variant.cssVars[key]})` }}
                    />
                  ))}
                </span>
                <span className="text-sm font-medium text-charcoal">{variant.name}</span>
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.1}>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={reset}
              disabled={active === 0}
              className="inline-flex items-center gap-1.5 text-sm text-charcoal/55 transition-colors duration-200 hover:text-sage-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="size-3.5" strokeWidth={1.75} />
              {themeShowcase.resetLabel}
            </button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
