'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { applyThemeVars, resetThemeVars } from '@/lib/theme-runtime';
import { themeVariants } from '@/config/theme';
import { whatWeBuild, themeShowcase, platformCatalog } from '@/config/content';
import { cn } from '@/lib/utils';

const swatchKeys = ['--color-sage-deep', '--color-champagne', '--color-rose'] as const;

/**
 * Combined section — replaces the old separate "platform showcase" box and
 * the standalone theme-switcher section with one smaller, two-column block:
 * left is a quiet, minimal service list (no pill chips — hover swaps the
 * label for its one-line description); right is the live color-theme
 * switcher. Brief §6/Section 4 follow-up + new theme-showcase feature.
 */
export function PlatformThemeShowcase() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<number | null>(null);

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
        <div className="rounded-lg border border-line bg-cream-deep/50 p-6 sm:p-9">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* left — minimal service list */}
            <div>
              <ScrollReveal>
                <SectionLabel>{whatWeBuild.platform.eyebrow}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h3 className="mt-4 text-h3 text-sage-deep">{whatWeBuild.platform.heading}</h3>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <p className="mt-3 text-[0.95rem] text-charcoal/70">{whatWeBuild.platform.blurb}</p>
              </ScrollReveal>

              <ul className="mt-6 border-t border-line/60">
                {platformCatalog.map((group, i) => (
                  <li key={group.title} className="group relative h-11 overflow-hidden border-b border-line/60">
                    <button
                      type="button"
                      onClick={() => setRevealed((r) => (r === i ? null : i))}
                      aria-expanded={revealed === i}
                      className="absolute inset-0 flex w-full items-center text-left"
                    >
                      <span
                        className={cn(
                          'absolute inset-0 flex items-center text-[0.95rem] text-charcoal/80 transition-transform duration-300 ease-out group-hover:-translate-y-full',
                          revealed === i && '-translate-y-full',
                        )}
                      >
                        {group.title}
                      </span>
                      <span
                        className={cn(
                          'absolute inset-0 flex translate-y-full items-center text-[0.95rem] font-medium text-sage-deep transition-transform duration-300 ease-out group-hover:translate-y-0',
                          revealed === i && 'translate-y-0',
                        )}
                      >
                        {group.tagline}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <ScrollReveal delay={0.05}>
                <p className="mt-5 text-sm italic text-charcoal/60">
                  {whatWeBuild.platform.upsellSeed} {whatWeBuild.platform.upsellHighlight}
                </p>
              </ScrollReveal>
            </div>

            {/* right — live theme switcher */}
            <div>
              <ScrollReveal>
                <SectionLabel>{themeShowcase.eyebrow}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h3 className="mt-4 text-h3 text-sage-deep">{themeShowcase.headline}</h3>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <p className="mt-3 text-[0.95rem] text-charcoal/70">{themeShowcase.blurb}</p>
              </ScrollReveal>

              <StaggerGroup className="mt-6 flex flex-wrap gap-3" stagger={0.05}>
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
                <div className="mt-5">
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
