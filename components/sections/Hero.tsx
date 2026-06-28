import { ShieldCheck, Clock, Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { hero } from '@/config/content';

/**
 * Section 1 — Hero (above the fold). Centered single-column layout with an
 * on-brand decorative backdrop (no device mockup). Eyebrow, Playfair headline,
 * subhead, single gold-accented CTA, trust line, and a slim row of reassurance
 * chips. CTA visible without scrolling on mobile. Brief §6/Section 1.
 */
const CHIPS = [
  { icon: Clock, label: 'Live in ~3 days' },
  { icon: Smartphone, label: 'Mobile-first' },
  { icon: ShieldCheck, label: 'US-registered company' },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-wash pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40"
    >
      <HeroBackground />
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{hero.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="mt-6 text-display text-sage-deep text-balance">{hero.headline}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-xl text-body-lg text-charcoal/80">{hero.subhead}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <Button source="hero" size="lg">
                {hero.cta}
              </Button>
              <p className="text-sm text-charcoal/60">{hero.trustLine}</p>
            </div>
          </ScrollReveal>

          {/* reassurance chips */}
          <ScrollReveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {CHIPS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-cream/70 px-4 py-2 text-sm text-charcoal/75 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/50 hover:text-charcoal hover:shadow-card"
                >
                  <Icon className="size-4 text-sage-soft transition-colors group-hover:text-sage-deep" strokeWidth={1.5} />
                  {label}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Container>

      {/* soft fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
