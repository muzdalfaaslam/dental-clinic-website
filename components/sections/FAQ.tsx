'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { faq } from '@/config/content';

/**
 * FAQ — a simple accordion answering the questions patients actually have
 * before booking (insurance, nerves, first visit, kids, emergencies).
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream-deep/40 py-section">
      <Container className="max-w-2xl">
        <div className="text-center">
          <ScrollReveal>
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-sage-deep/80">
              {faq.eyebrow}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-extrabold text-sage-deep">
              {faq.headline}
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={item.question} delay={0.04 * i}>
                <div className="overflow-hidden rounded-lg bg-cream ring-1 ring-inset ring-line">
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => (prev === i ? null : i))}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-display text-[1rem] font-extrabold text-sage-deep">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={
                        'size-5 shrink-0 text-sage-soft transition-transform duration-200 ' +
                        (isOpen ? 'rotate-180' : '')
                      }
                      strokeWidth={1.75}
                    />
                  </button>
                  <div
                    className={
                      'grid transition-all duration-300 ease-out ' +
                      (isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')
                    }
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal/70">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}