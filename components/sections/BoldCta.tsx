import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { boldCta } from '@/config/content';

/**
 * Bold CTA band — a full-color section (not another white/cream card) that
 * breaks up the page rhythm and gives the site one confident, high-contrast
 * moment. Sits between Social Proof and the booking form.
 */
export function BoldCta() {
  return (
    <section className="relative overflow-hidden bg-[rgb(16_22_32)] py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[rgb(90_160_200)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-[rgb(235_240_245)]/10 blur-3xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgb(235_240_245)]/10 px-4 py-1.5 text-eyebrow font-medium uppercase tracking-[0.16em] text-[rgb(235_240_245)]/90">
              <span aria-hidden className="size-1.5 rounded-full bg-[rgb(90_160_200)]" />
              {boldCta.eyebrow}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.3rem)] font-extrabold text-[rgb(235_240_245)]">
              {boldCta.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-md text-[rgb(235_240_245)]/80">{boldCta.blurb}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-7">
              <Button source="bold_cta" variant="invert" size="lg">
                {boldCta.cta}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}