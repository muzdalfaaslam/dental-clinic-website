import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { hero } from '@/config/content';

/**
 * Section 1 — Hero (above the fold). Split layout: copy + single gold-accented
 * CTA left, phone mockup right. Cream/wash background, sage Playfair headline,
 * trust line directly under the button. On mobile the CTA is visible without
 * scrolling (compact stack, mockup below). Brief §6/Section 1.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-wash pb-16 pt-24 sm:pt-28 lg:pb-24 lg:pt-36">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <ScrollReveal>
              <SectionLabel>{hero.eyebrow}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="mt-5 text-display text-sage-deep text-balance">{hero.headline}</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 max-w-lg text-body-lg text-charcoal/80">{hero.subhead}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-8 flex flex-col items-start gap-3">
                <Button source="hero" size="lg">
                  {hero.cta}
                </Button>
                <p className="text-sm text-charcoal/60">{hero.trustLine}</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual */}
          <ScrollReveal delay={0.1} className="order-first lg:order-last">
            <div className="relative">
              {/* soft sage halo behind the device */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-soft/10 blur-2xl"
              />
              <PhoneMockup src={hero.mockup.src} alt={hero.mockup.alt} priority />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
