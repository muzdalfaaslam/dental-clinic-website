import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { getIcon } from '@/components/ui/icon-registry';
import { meetDentist } from '@/config/content';

/**
 * "Meet the dentist" — adds a real face and warmth to the practice. Uses an
 * illustrated placeholder avatar until a real headshot is supplied
 * (config/content.ts → meetDentist.photo).
 */
export function MeetDentist() {
  const QuoteIcon = getIcon('quote');
  const UserIcon = getIcon('userRound');

  return (
    <section className="py-section">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg bg-cream-deep/50 p-8 text-center shadow-soft ring-1 ring-inset ring-line sm:p-12">
          <ScrollReveal>
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-sage-deep/80">
              {meetDentist.eyebrow}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            {meetDentist.photo ? (
              <Image
                src={meetDentist.photo}
                alt={meetDentist.name}
                width={96}
                height={96}
                className="size-24 rounded-full object-cover shadow-card"
              />
            ) : (
              <span className="inline-flex size-24 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep ring-1 ring-inset ring-line">
                <UserIcon className="size-11" strokeWidth={1.5} />
              </span>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h2 className="font-display text-[1.3rem] font-extrabold text-sage-deep">{meetDentist.name}</h2>
              <p className="mt-1 text-sm text-charcoal/60">{meetDentist.credentials}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative max-w-xl">
              <QuoteIcon aria-hidden className="absolute -left-2 -top-2 size-6 text-warm/40" strokeWidth={1.5} />
              <p className="px-6 text-[1.05rem] italic leading-relaxed text-charcoal/80">
                {meetDentist.quote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}