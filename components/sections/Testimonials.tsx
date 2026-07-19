import { Star, UserRound } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { testimonials } from '@/config/content';

/**
 * Patient testimonials — fills the trust-building gap left after removing the
 * old before/after comparison section. Warm, rounded cards with a placeholder
 * avatar per patient (no real photos available) and a star rating.
 */
export function Testimonials() {
  return (
    <section className="py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-sage-deep/80">
              {testimonials.eyebrow}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-extrabold text-sage-deep">
              {testimonials.headline}
            </h2>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <ScrollReveal key={t.name} delay={0.06 * i}>
              <div className="flex h-full flex-col rounded-lg bg-cream-deep/40 p-6 shadow-soft ring-1 ring-inset ring-line">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="size-4 text-warm" strokeWidth={1.5} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-[0.95rem] italic leading-relaxed text-charcoal/80">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep">
                    <UserRound className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-sage-deep">{t.name}</p>
                    <p className="text-xs text-charcoal/55">{t.detail}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}