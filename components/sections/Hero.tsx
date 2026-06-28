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
      className="relative overflow-hidden bg-wash pb-8 pt-24 sm:pt-24 lg:pb-10 lg:pt-28"
    >
      <HeroBackground />
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* pill eyebrow */}
          <ScrollReveal>
            <span className="inline-flex items-center rounded-full border border-sage-soft/45 bg-cream/50 px-4 py-1.5 text-eyebrow font-medium uppercase text-sage-deep backdrop-blur-sm">
              {hero.eyebrow}
            </span>
          </ScrollReveal>

          {/* headline */}
          <ScrollReveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,5.6vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.01em] text-sage-deep text-balance">
              {hero.headline}
            </h1>
          </ScrollReveal>

          {/* subhead */}
          <ScrollReveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/80">
              {hero.subhead}
            </p>
          </ScrollReveal>

          {/* CTA with leading arrow */}
          <ScrollReveal delay={0.15}>
            <div className="mt-6">
              <Button source="hero" size="lg" arrowSide="left" className="px-8 py-3.5">
                {hero.cta}
              </Button>
            </div>
          </ScrollReveal>

          {/* fine-print trust line */}
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-charcoal/45">
              {hero.trustLine}
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
