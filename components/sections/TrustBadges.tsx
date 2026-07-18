import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { getIcon } from '@/components/ui/icon-registry';
import { trustBadges } from '@/config/content';

/**
 * Trust badges — a slim strip right under the hero. Gives dental visitors the
 * credibility signals they weigh most (insurance, availability, emergency
 * care, rating) before they've scrolled past the fold.
 */
export function TrustBadges() {
  return (
    <section className="border-y border-line bg-cream-deep/40 py-4 mb-8 lg:mb-12">
      <Container>
        <ScrollReveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
            {trustBadges.items.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li key={item.label} className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0 text-sage-deep" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-charcoal/80">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}