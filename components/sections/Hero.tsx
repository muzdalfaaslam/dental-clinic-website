import { Container } from '@/components/ui/Container';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { hero } from '@/config/content';

/**
 * Section 1 — Hero (above the fold). Redesigned for warmth: a rounded pill
 * eyebrow (not thin gradient rules), a warm-accent highlight + underline on the
 * headline, and a real primary CTA button living directly in the hero instead
 * of only appearing further down the page. Clean cream field, softer corners
 * throughout (brief: clean & clinical + warm & approachable).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pb-10 pt-24 sm:pt-24 lg:pb-14 lg:pt-28"
    >
      <HeroBackground />
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* eyebrow — a rounded pill badge, friendlier than thin flanking rules */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-deep px-4 py-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-warm" />
              <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-sage-deep/80">
                {hero.eyebrow}
              </span>
            </div>
          </ScrollReveal>

          {/* headline — two lines: sage line 1, charcoal line 2 with a warm-tinted
              mark on "Booked Patients" and a warm underline on "3 Days" */}
          <ScrollReveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,2.85rem)] font-extrabold leading-[1.28] tracking-[-0.01em] text-sage-deep">
              {hero.headline.line1}
              <br />
              <span className="text-charcoal">
                {hero.headline.line2.pre}{' '}
                <mark className="rounded-md bg-warm/15 px-1.5 py-0.5 text-charcoal">
                  {hero.headline.line2.mark}
                </mark>{' '}
                {hero.headline.line2.mid}{' '}
                <span className="relative whitespace-nowrap">
                  {hero.headline.line2.underline}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[0.14em] w-full rounded-full bg-warm"
                  />
                </span>
              </span>
            </h1>
          </ScrollReveal>

          {/* subhead */}
          <ScrollReveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-charcoal/80">
              {hero.subhead}
            </p>
          </ScrollReveal>

          {/* primary CTA — now lives directly in the hero */}
          <ScrollReveal delay={0.15}>
            <div className="mt-7">
              <Button source="hero" size="lg">
                {hero.cta}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}