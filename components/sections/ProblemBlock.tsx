import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getIcon } from '@/components/ui/icon-registry';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { problem } from '@/config/content';

/**
 * Section 3 — "Sound familiar?" Soft cards with thin sage/gold line-icons (never
 * red X marks). Calm and empathetic, naming the pain the setter already raised.
 * Cream-deep background for gentle alternation. Brief §6/Section 3.
 */
export function ProblemBlock() {
  return (
    <section className="bg-cream-deep py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">A GENTLE GUT-CHECK</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep">{problem.headline}</h2>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problem.points.map((point) => {
            const Icon = getIcon(point.icon);
            return (
              <StaggerItem key={point.text}>
                <div className="group flex h-full items-start gap-4 rounded-md border border-line bg-cream p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-card">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream-deep ring-1 ring-inset ring-champagne/40 transition-colors duration-300 group-hover:bg-sage-soft/20"
                  >
                    <Icon className="size-5 text-sage-soft transition-colors duration-300 group-hover:text-sage-deep" strokeWidth={1.5} />
                  </span>
                  <p className="text-[0.95rem] leading-relaxed text-charcoal/85">{point.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
