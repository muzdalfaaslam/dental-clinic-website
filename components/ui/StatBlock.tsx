'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { GoldRule } from './GoldRule';
import { cn } from '@/lib/utils';

/**
 * Big sage number + gold underline + caption. If the value is purely numeric it
 * counts up on scroll-in; non-numeric values (e.g. "Hundreds") render as-is.
 * Count-up is disabled under prefers-reduced-motion (brief §4.4, §5).
 */
export function StatBlock({
  value,
  suffix = '',
  caption,
  className,
  centered = false,
}: {
  value: string;
  suffix?: string;
  caption: string;
  className?: string;
  centered?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  // Count up only when the value is a clean integer (e.g. "19", not "2–4").
  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null;
  const [display, setDisplay] = useState<string>(numeric !== null && !reduce ? '0' : value);

  useEffect(() => {
    if (numeric === null || reduce || !inView) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const durationMs = 1100;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(eased * numeric)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, reduce, value]);

  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-3', centered && 'items-center text-center', className)}
    >
      <div className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-[1.05] text-sage-deep">
        {display}
        {suffix && <span className="text-[0.5em] font-medium text-sage-soft">{suffix}</span>}
      </div>
      <GoldRule width="w-10" />
      <p className={cn('text-sm leading-relaxed text-charcoal/70', centered ? 'max-w-[24ch]' : 'max-w-[22ch]')}>
        {caption}
      </p>
    </div>
  );
}
