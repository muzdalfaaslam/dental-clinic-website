import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { reassurance } from '@/config/content';

/**
 * Section 8 — Reassurance strip. Slim horizontal strip of four items with small
 * gold check-marks. Calm, confident — the last nudge after the form button.
 * Brief §8/Section 8.
 */
export function ReassuranceStrip() {
  return (
    <section className="border-y border-line bg-cream py-8">
      <Container>
        <ScrollReveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reassurance.items.map((item) => (
              <li
                key={item}
                className="group flex items-center gap-3 rounded-full px-2 py-1 transition-colors duration-300 hover:bg-cream-deep"
              >
                <span
                  aria-hidden
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-champagne/50 transition-colors duration-300 group-hover:bg-champagne"
                >
                  <Check className="size-3.5 text-champagne transition-colors duration-300 group-hover:text-cream" strokeWidth={2} />
                </span>
                <span className="text-sm font-medium text-charcoal/85">{item}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
