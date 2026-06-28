import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { hero } from '@/config/content';

/**
 * Section 1 — Hero (above the fold). Centered layout matching the reference:
 * a bordered pill eyebrow, an oversized Playfair headline, a constrained subhead,
 * one big CTA with a leading arrow, and a fine-print trust line — all on a clean
 * cream field with a thin line motif. CTA visible without scrolling on mobile.
 * Med spa skin (sage/champagne), not roofing's terracotta/condensed type.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-wash pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      <HeroBackground />
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* pill eyebrow */}
          <ScrollReveal>
            <span className="inline-flex items-center rounded-full border border-sage-soft/45 bg-cream/50 px-5 py-2 text-eyebrow font-medium uppercase text-sage-deep backdrop-blur-sm">
              {hero.eyebrow}
            </span>
          </ScrollReveal>

          {/* oversized headline */}
          <ScrollReveal delay={0.05}>
            <h1 className="mt-7 font-display text-[clamp(2.6rem,7.5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-sage-deep text-balance">
              {hero.headline}
            </h1>
          </ScrollReveal>

          {/* subhead */}
          <ScrollReveal delay={0.1}>
            <p className="mt-7 max-w-xl text-body-lg text-charcoal/80">{hero.subhead}</p>
          </ScrollReveal>

          {/* big CTA with leading arrow */}
          <ScrollReveal delay={0.15}>
            <div className="mt-10">
              <Button source="hero" size="lg" arrowSide="left" className="px-9 py-4 text-base">
                {hero.cta}
              </Button>
            </div>
          </ScrollReveal>

          {/* fine-print trust line */}
          <ScrollReveal delay={0.2}>
            <p className="mt-7 text-xs uppercase tracking-[0.16em] text-charcoal/45">
              {hero.trustLine}
            </p>
          </ScrollReveal>
        </div>
      </Container>

      {/* soft fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
