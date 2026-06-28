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
    <section className="bg-cream-deep py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{math.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep">{math.headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-body-lg text-charcoal/75">{math.intro}</p>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {math.stats.map((s) => (
            <StaggerItem key={s.caption}>
              <StatBlock value={s.value} suffix={s.suffix} caption={s.caption} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.05}>
          <p className="mx-auto mt-14 max-w-3xl text-center text-body-lg text-charcoal/80">
            {math.closing}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mt-10 flex justify-center">
            <Button source="the_math" size="lg">
              {math.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
