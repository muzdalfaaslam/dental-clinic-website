'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { applyThemeVars, resetThemeVars } from '@/lib/theme-runtime';
import { themeVariants } from '@/config/theme';
import { whatWeBuild, themeShowcase, platformCatalog } from '@/config/content';
import { getIcon } from '@/components/ui/icon-registry';
import { cn } from '@/lib/utils';

const swatchKeys = ['--color-sage-deep', '--color-champagne', '--color-rose'] as const;

/**
 * Combined section — left: hover-only service list showing all services without
 * scrolling; right: live color-theme switcher.
 */
export function PlatformThemeShowcase() {
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
        <div className="rounded-lg border border-line bg-cream-deep/50 p-6 sm:p-9">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

            {/* left — hover-only service list, no scrolling */}
            <div>
              <ScrollReveal>
                <SectionLabel lines={['EVERYTHING UNDER', 'ONE ROOF']} />
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h3 className="mt-4 text-h3 text-sage-deep">{whatWeBuild.platform.heading}</h3>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <p className="mt-3 text-[0.95rem] text-charcoal/70">{whatWeBuild.platform.blurb}</p>
              </ScrollReveal>

              <ul className="mt-5 border-t border-line/60">
                {platformCatalog.map((group) => {
                  const Icon = getIcon(group.icon);
                  return (
                    <li
                      key={group.title}
                      className="group relative overflow-hidden border-b border-line/60"
                    >
                      {/* fixed-height row so all 11 fit without scrolling */}
                      <div className="flex h-9 items-center gap-2.5 px-0.5">
                        <Icon
                          className="size-3.5 shrink-0 text-charcoal/35 transition-colors duration-200 group-hover:text-sage-deep"
                          strokeWidth={1.75}
                        />
                        {/* title slides up on hover, tagline slides in from below */}
                        <span className="relative flex-1 overflow-hidden h-5">
                          <span className={cn(
                            'absolute inset-0 flex items-center text-[0.88rem] text-charcoal/75',
                            'transition-transform duration-300 ease-out group-hover:-translate-y-full',
                          )}>
                            {group.title}
                          </span>
                          <span className={cn(
                            'absolute inset-0 flex items-center text-[0.88rem] font-medium text-sage-deep',
                            'translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0',
                          )}>
                            {group.tagline}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <ScrollReveal delay={0.05}>
                <p className="mt-4 text-sm italic text-charcoal/60">
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

              {/* live preview card */}
              <ScrollReveal delay={0.14}>
                <div className="mt-8 overflow-hidden rounded-lg border border-line bg-cream shadow-soft transition-colors duration-300">
                  <div className="flex items-center gap-1.5 border-b border-line bg-cream-deep/60 px-3.5 py-2.5">
                    <span aria-hidden className="size-2 rounded-full bg-rose/70" />
                    <span aria-hidden className="size-2 rounded-full bg-champagne/70" />
                    <span aria-hidden className="size-2 rounded-full bg-sage-soft/70" />
                    <span className="ml-auto text-[0.65rem] uppercase tracking-wider text-charcoal/40">
                      Live preview
                    </span>
                  </div>
                  <div className="space-y-3.5 p-5">
                    <div className="h-3 w-2/3 rounded-full bg-sage-deep transition-colors duration-300" />
                    <div className="h-2 w-1/2 rounded-full bg-charcoal/20 transition-colors duration-300" />
                    <div className="flex items-center gap-2 pt-1">
                      <span className="inline-flex items-center rounded-full bg-sage-deep px-3.5 py-1.5 text-xs font-medium text-cream transition-colors duration-300">
                        Book Now
                      </span>
                      <span
                        aria-hidden
                        className="inline-flex size-7 items-center justify-center rounded-full bg-champagne/70 transition-colors duration-300"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="h-10 flex-1 rounded-md bg-cream-deep transition-colors duration-300" />
                      <div className="h-10 flex-1 rounded-md bg-rose/30 transition-colors duration-300" />
                      <div className="h-10 flex-1 rounded-md bg-sage-soft/25 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
