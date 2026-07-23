'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { getIcon } from '@/components/ui/icon-registry';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { problem } from '@/config/content';

/**
 * Section 3 — "Sound familiar?" Auto-scrolling glassmorphic carousel (same
 * duplicate-list marquee mechanic as TestimonialMarquee, translucent/blurred
 * cards instead of opaque ones). Clicking a card pauses the scroll and reveals
 * its response below; hover/keyboard-focus also pauses (via .marquee-paused,
 * extended with :focus-within in globals.css). Reduced motion falls back to a
 * static horizontally-scrollable row.
 */
export function ProblemBlock() {
  const [active, setActive] = useState<number | null>(null);
  const [inView, setInView] = useState(true);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { points } = problem;

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (i: number) => setActive((prev) => (prev === i ? null : i));

  const cardClasses = (isActive: boolean) =>
    [
      'group flex h-28 w-64 shrink-0 cursor-pointer items-start gap-3 rounded-md border p-4 text-left backdrop-blur-md',
      'transition-all duration-200',
      isActive
        ? 'border-champagne/60 bg-cream/70'
        : 'border-white/40 bg-cream/35 hover:border-champagne/50 hover:bg-cream/55',
    ].join(' ');

  const renderCard = (point: (typeof points)[number], originalIndex: number, key: string, ariaHidden = false) => {
    const Icon = getIcon(point.icon);
    const isActive = active === originalIndex;
    return (
      <button
        key={key}
        type="button"
        tabIndex={ariaHidden ? -1 : 0}
        aria-hidden={ariaHidden || undefined}
        onClick={(e) => {
          select(originalIndex);
          if (e.detail > 0) e.currentTarget.blur();
        }}
        aria-pressed={isActive}
        className={cardClasses(isActive)}
      >
        <span
          aria-hidden
          className={[
            'mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
            isActive
              ? 'bg-champagne text-cream'
              : 'bg-cream-deep/60 ring-1 ring-inset ring-champagne/40 text-sage-soft group-hover:bg-champagne/15 group-hover:text-champagne',
          ].join(' ')}
        >
          {isActive ? <Check className="size-3.5" strokeWidth={2} /> : <Icon className="size-3.5" strokeWidth={1.5} />}
        </span>
        <p
          className={[
            'line-clamp-2 text-[0.85rem] leading-snug transition-colors duration-200',
            isActive ? 'font-medium text-sage-deep' : 'text-charcoal/80',
          ].join(' ')}
        >
          {point.text}
        </p>
      </button>
    );
  };

  const activePoint = active !== null ? points[active] : null;
  const duration = Math.max(24, points.length * 6);

  return (
    <section className="relative overflow-hidden bg-cream-deep py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-cover bg-center opacity-[0.4]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1704455306251-b4634215d98f?fm=jpg&q=60&w=1600&auto=format&fit=crop')" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b from-transparent via-cream-deep/50 to-cream-deep"
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">A QUICK CHECKUP</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep">{problem.headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="mt-3 text-sm text-charcoal/50">Tap anything that sounds like your practice.</p>
          </ScrollReveal>
        </div>
      </Container>

      <ScrollReveal delay={0.1} className="mt-10">
        {reduce ? (
          <Container>
            <ul className="flex snap-x gap-4 overflow-x-auto py-3" aria-label="Common frustrations">
              {points.map((p, i) => (
                <li key={p.text} className="snap-start">
                  {renderCard(p, i, `static-${i}`)}
                </li>
              ))}
            </ul>
          </Container>
        ) : (
          <div
            ref={marqueeRef}
            className="marquee-paused relative overflow-hidden py-3"
            aria-label="Common frustrations"
            style={{
              maskImage:
                'linear-gradient(90deg, transparent, #000 5rem, #000 calc(100% - 5rem), transparent)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent, #000 5rem, #000 calc(100% - 5rem), transparent)',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <ul
              className="animate-marquee flex w-max gap-4 px-4"
              style={
                {
                  '--marquee-duration': `${duration}s`,
                  animationPlayState: active !== null || !inView ? 'paused' : undefined,
                } as React.CSSProperties
              }
            >
              {[...points, ...points].map((p, idx) => {
                const original = idx % points.length;
                return renderCard(p, original, `m-${idx}`, idx >= points.length);
              })}
            </ul>
          </div>
        )}
      </ScrollReveal>

      <Container>
        <div
          className={[
            'mx-auto mt-8 max-w-xl overflow-hidden rounded-lg border',
            'bg-gradient-to-br from-cream to-cream-deep border-champagne/50',
            'transition-[max-height,opacity] duration-300 ease-out',
            activePoint ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <div aria-live="polite" className="p-6 text-center">
            {activePoint && (
              <div key={active} className="animate-fade-in-up">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-champagne">
                  1 issue selected
                </p>
                <p className="mt-2 font-display text-[1.05rem] font-semibold leading-snug text-sage-deep">
                  {activePoint.response.headline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{activePoint.response.body}</p>
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