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
  const [lastActive, setLastActive] = useState<number | null>(null);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        // If there are still checked items, surface the most recent other one
        if (next.size > 0) {
          const remaining = [...next];
          setLastActive(remaining[remaining.length - 1] ?? null);
        } else {
          setLastActive(null);
        }
      } else {
        next.add(i);
        setLastActive(i);
      }
      return next;
    });
  };

  const count = checked.size;
  const activePoint = lastActive !== null ? problem.points[lastActive] : null;

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

        {/* Per-item response callout — reveal shell animates height+opacity only */}
        <div
          className={[
            'mx-auto mt-8 max-w-xl overflow-hidden rounded-lg border shadow-card',
            'bg-gradient-to-br from-cream to-cream-deep border-champagne/50',
            'transition-[max-height,opacity] duration-300 ease-out',
            count > 0 ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          ].join(' ')}
        >
          {/* Inner padding is never animated — text stays perfectly formed */}
          <div aria-live="polite" className="p-6 text-center">
            {activePoint && (
              <div key={lastActive} className="animate-fade-in-up">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-champagne">
                  {count > 1 ? `${count} issues selected` : '1 issue selected'}
                </p>
                <p className="mt-2 font-display text-[1.05rem] font-semibold leading-snug text-sage-deep">
                  {activePoint.response.headline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                  {activePoint.response.body}
                </p>
                <div className="mt-5">
                  <Button source="problem_block" size="md">
                    Show Me What We&apos;d Fix
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
