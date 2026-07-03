'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GoldRule } from '@/components/ui/GoldRule';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { math } from '@/config/content';

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/**
 * Section 5 — The math. A live slider drives two recalculated dollar figures
 * in real time — elegant, not a spreadsheet. Figures live in config
 * (// CLIENT: confirm), ranges kept defensible — no "double your revenue"
 * claims. Brief §6/Section 5.
 */
export function TheMath() {
  const { calculator: c } = math;
  const [patients, setPatients] = useState(c.default);
  const reduce = useReducedMotion();

  const monthly = patients * c.valuePerPatient;
  const annual = monthly * 12;

  return (
    <section className="bg-cream-deep py-12 lg:py-16">
      <Container className="max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{math.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-3 text-h2 text-sage-deep">{math.headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-charcoal/70">{math.intro}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 rounded-lg border border-line bg-cream p-6 shadow-card sm:p-9">
            {/* the slider */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="patients-slider" className="text-sm font-medium text-charcoal">
                  {c.label}
                </label>
                <span className="font-display text-2xl font-semibold text-sage-deep">{patients}</span>
              </div>
              <input
                id="patients-slider"
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={patients}
                onChange={(e) => setPatients(Number(e.target.value))}
                aria-valuetext={`${patients} new patients a month`}
                className="mt-4 h-2 w-full cursor-ew-resize appearance-none rounded-full bg-cream-deep accent-[rgb(94_107_82)]"
              />
              <div className="mt-1.5 flex justify-between text-xs text-charcoal/45">
                <span>{c.min}/mo</span>
                <span>{c.max}/mo</span>
              </div>
            </div>

            {/* live-recomputed results */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-8">
              {[
                { key: 'monthly', label: 'Revenue walking out the door, per month', value: monthly },
                { key: 'annual', label: 'That adds up to, per year', value: annual },
              ].map((stat) => (
                <div key={stat.key} className="flex flex-col items-center gap-2 text-center">
                  <div className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-none text-sage-deep">
                    {reduce ? (
                      currency(stat.value)
                    ) : (
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={stat.value}
                          className="inline-block"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                        >
                          {currency(stat.value)}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </div>
                  <GoldRule width="w-8" />
                  <p className="max-w-[20ch] text-[0.8rem] leading-relaxed text-charcoal/65">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* the one static fact */}
            <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-cream-deep px-4 py-2 text-xs text-charcoal/60">
              <span className="font-display font-semibold text-sage-deep">
                {math.fact.value}
                {math.fact.suffix}
              </span>
              {math.fact.caption}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.95rem] leading-relaxed text-charcoal/75">
            {math.closing}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <Button source="the_math" size="md">
              {math.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
