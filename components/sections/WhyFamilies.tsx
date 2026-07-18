import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { getIcon } from '@/components/ui/icon-registry';
import { whyFamilies } from '@/config/content';

/**
 * "Why families choose us" — a warm, trust-building feature grid sitting right
 * after the Live Preview. This is the section that carries most of the new
 * "warm & approachable" direction: rounded cards, a soft warm-accent icon on
 * the first card, gentle copy aimed at nervous or first-time patients.
 */
export function WhyFamilies() {
  return (
    <section className="bg-cream-deep/40 py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-sage-deep/80">
              {whyFamilies.eyebrow}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-extrabold text-sage-deep">
              {whyFamilies.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-3 text-charcoal/75">{whyFamilies.blurb}</p>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyFamilies.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            const isWarm = i === 0;
            return (
              <ScrollReveal key={item.title} delay={0.05 * i}>
                <div className="h-full rounded-lg bg-cream p-6 text-left shadow-soft ring-1 ring-inset ring-line">
                  <span
                    className={
                      'inline-flex size-11 items-center justify-center rounded-md ' +
                      (isWarm ? 'bg-warm/15 text-warm' : 'bg-sage-deep/10 text-sage-deep')
                    }
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-extrabold text-sage-deep">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}