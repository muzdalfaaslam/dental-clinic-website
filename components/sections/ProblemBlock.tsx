'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { getIcon } from '@/components/ui/icon-registry';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { problem } from '@/config/content';

export function ProblemBlock() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });

  const count = checked.size;

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
          <ScrollReveal delay={0.08}>
            <p className="mt-3 text-sm text-charcoal/50">Tap anything that applies to you.</p>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problem.points.map((point, i) => {
            const Icon = getIcon(point.icon);
            const active = checked.has(i);
            return (
              <StaggerItem key={point.text}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={active}
                  className={[
                    'group flex h-full w-full cursor-pointer items-start gap-4 rounded-md border p-5 text-left',
                    'transition-all duration-200',
                    active
                      ? 'border-sage-deep/40 bg-sage-deep/6 shadow-soft'
                      : 'border-line bg-cream shadow-soft hover:border-champagne/50 hover:shadow-card',
                  ].join(' ')}
                >
                  <span
                    aria-hidden
                    className={[
                      'mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                      active
                        ? 'bg-sage-deep text-cream'
                        : 'bg-cream-deep ring-1 ring-inset ring-champagne/40 text-sage-soft group-hover:bg-sage-soft/20 group-hover:text-sage-deep',
                    ].join(' ')}
                  >
                    {active ? (
                      <Check className="size-4" strokeWidth={2} />
                    ) : (
                      <Icon className="size-4" strokeWidth={1.5} />
                    )}
                  </span>
                  <p
                    className={[
                      'text-[0.92rem] leading-snug transition-colors duration-200',
                      active ? 'font-medium text-sage-deep' : 'text-charcoal/80',
                    ].join(' ')}
                  >
                    {point.text}
                  </p>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Reactive callout */}
        <div
          aria-live="polite"
          className={[
            'mx-auto mt-8 max-w-xl overflow-hidden rounded-lg border text-center transition-all duration-300',
            count > 0
              ? 'border-champagne/50 bg-gradient-to-br from-cream to-cream-deep p-6 opacity-100 shadow-card'
              : 'max-h-0 border-transparent p-0 opacity-0',
          ].join(' ')}
        >
          {count > 0 && (
            <>
              <p className="font-display text-[1.05rem] font-semibold text-sage-deep">
                {count === 1
                  ? 'Even one of these is costing you patients every month.'
                  : count <= 3
                  ? `${count} of these are quietly costing you patients every month.`
                  : `${count} of these? Your site is losing you real revenue, every single month.`}
              </p>
              <p className="mt-2 text-sm text-charcoal/65">
                A website built to convert fixes all of this. In about 3 days.
              </p>
              <div className="mt-5">
                <Button source="problem_block" size="md">
                  Show Me What We&apos;d Fix
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
