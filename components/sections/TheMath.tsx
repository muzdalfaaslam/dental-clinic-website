import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatBlock } from '@/components/ui/StatBlock';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { math } from '@/config/content';

/**
 * Section 5 — The math. Elegant, not a spreadsheet: large airy stat blocks with
 * sage numbers + gold underlines. Figures live in config (// CLIENT: confirm),
 * ranges kept defensible — no "double your revenue" claims. Brief §6/Section 5.
 */
export function TheMath() {
  return (
    <section className="bg-cream-deep py-16 lg:py-24">
      <Container className="max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{math.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-3 text-h2 text-sage-deep">{math.headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-charcoal/70">{math.intro}</p>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {math.stats.map((s) => (
            <StaggerItem key={s.caption} className="h-full">
              {/* Accent cards — compact, each fully contained so nothing overlaps. */}
              <div className="group flex h-full items-center justify-center rounded-lg border border-line bg-cream px-4 py-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-card">
                <StatBlock value={s.value} suffix={s.suffix} caption={s.caption} centered compact />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.05}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.95rem] leading-relaxed text-charcoal/75">
            {math.closing}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <Button source="the_math" size="md">
              {math.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
