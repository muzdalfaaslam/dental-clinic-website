import { Container } from '@/components/ui/Container';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { InlineTextCta } from '@/components/ui/InlineTextCta';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { hero, quiz } from '@/config/content';

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
      className="relative overflow-hidden bg-cream pb-8 pt-24 sm:pt-24 lg:pb-10 lg:pt-28"
    >
      <HeroBackground />
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* eyebrow — editorial label flanked by fading gold rules (no pill) */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-champagne sm:w-12" />
              <span className="text-eyebrow font-medium uppercase tracking-[0.2em] text-sage-deep/80">
                {hero.eyebrow}
              </span>
              <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-champagne sm:w-12" />
            </div>
          </ScrollReveal>

          {/* headline — two lines: sage line 1, charcoal line 2 with a sage marker
              on "Booked Treatments" and a gold underline on "3 Days" */}
          <ScrollReveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,2.85rem)] font-semibold leading-[1.28] tracking-[-0.01em] text-sage-deep">
              {hero.headline.line1}
              <br />
              <span className="text-charcoal">
                {hero.headline.line2.pre}{' '}
                <mark className="rounded-[3px] bg-sage-soft/30 px-1.5 py-0.5 text-charcoal">
                  {hero.headline.line2.mark}
                </mark>{' '}
                {hero.headline.line2.mid}{' '}
                <span className="relative whitespace-nowrap">
                  {hero.headline.line2.underline}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[0.14em] w-full rounded-full bg-champagne"
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

          {/* trust line — the single main CTA lives below the live preview */}
          <ScrollReveal delay={0.15}>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-charcoal/45">
              {hero.trustLine}
            </p>
          </ScrollReveal>

          {/* secondary, low-key CTA into the fast one-question-at-a-time path */}
          <ScrollReveal delay={0.18}>
            <InlineTextCta href="/quiz" source="hero_quiz" className="mt-5">
              {quiz.entryCta}
            </InlineTextCta>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
