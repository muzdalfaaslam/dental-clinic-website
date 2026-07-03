'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DesktopMockup } from './DesktopMockup';
import { getIcon, type IconKey } from './icon-registry';
import { cn } from '@/lib/utils';

export interface PointerFeature {
  icon: IconKey;
  label: string;
  desc?: string;
  hotspot: { x: number; y: number };
}

const TICK_MS = 3500;

/**
 * A wireframe "site" inside a DesktopMockup with pulsing numbered pins over
 * feature hotspots, synced to an auto-advancing list beside it. Standing in
 * for a real product-tour screenshot (brief's placeholder-asset spirit).
 */
function Wireframe({ features, active }: { features: PointerFeature[]; active: number }) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-cream to-cream-deep">
      {/* nav bar */}
      <div className="absolute inset-x-0 top-0 flex h-[9%] items-center justify-between px-[4%]">
        <div className="h-[35%] w-[16%] rounded-full bg-sage-deep/70" />
        <div className="flex gap-[3%]">
          <div className="h-[10%] w-[8%] rounded-full bg-sage-soft/40" />
          <div className="h-[10%] w-[8%] rounded-full bg-sage-soft/40" />
          <div className="h-[10%] w-[8%] rounded-full bg-sage-soft/40" />
        </div>
      </div>
      {/* hero block */}
      <div className="absolute left-[8%] right-[8%] top-[15%] h-[24%] overflow-hidden rounded-md bg-sage-deep/85">
        <div className="absolute left-[6%] top-[16%] h-[10%] w-[34%] rounded-full bg-cream/85" />
        <div className="absolute left-[6%] top-[34%] h-[7%] w-[20%] rounded-full bg-cream/50" />
      </div>
      {/* floating booking CTA */}
      <div className="absolute right-[10%] top-[42%] rounded-full bg-champagne px-[3%] py-[1.4%] text-[0.5rem] font-medium text-charcoal shadow-soft sm:text-[0.6rem]">
        Book Now
      </div>
      {/* service cards row */}
      <div className="absolute inset-x-[8%] top-[56%] grid h-[14%] grid-cols-3 gap-[3%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded bg-sage-soft/25" />
        ))}
      </div>
      {/* gallery strip */}
      <div className="absolute inset-x-[8%] top-[74%] grid h-[12%] grid-cols-4 gap-[2%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded bg-rose/35" />
        ))}
      </div>
      {/* footer / contact bar */}
      <div className="absolute inset-x-0 bottom-0 h-[8%] bg-charcoal/85" />

      {/* pins */}
      {features.map((f, i) => {
        const isActive = i === active;
        const Icon = getIcon(f.icon);
        return (
          <div
            key={f.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${f.hotspot.x}%`, top: `${f.hotspot.y}%` }}
          >
            {isActive && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-sage-deep/40"
                animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <span
              aria-hidden
              className={cn(
                'relative flex items-center justify-center rounded-full shadow-soft ring-2 transition-all duration-300',
                isActive
                  ? 'size-7 bg-sage-deep text-cream ring-cream'
                  : 'size-5 bg-cream/90 text-sage-deep ring-champagne/50',
              )}
            >
              <Icon className={cn(isActive ? 'size-3.5' : 'size-2.5')} strokeWidth={2} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function FeaturePointerMockup({ features }: { features: PointerFeature[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % features.length), TICK_MS);
    return () => clearInterval(id);
  }, [reduce, paused, features.length]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <div
      className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <DesktopMockup className="w-full" url="yourclinic.com">
        <Wireframe features={features} active={reduce ? -1 : active} />
      </DesktopMockup>

      <ul className="flex flex-col gap-2" aria-label="Website features">
        {features.map((f, i) => {
          const Icon = getIcon(f.icon);
          const isActive = !reduce && i === active;
          return (
            <li key={f.label}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                className={cn(
                  'group flex w-full items-start gap-3 rounded-md border p-3.5 text-left transition-all duration-300',
                  isActive
                    ? 'border-sage-deep/40 bg-sage-deep/6 shadow-soft'
                    : 'border-transparent hover:border-line hover:bg-cream-deep/60',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                    isActive
                      ? 'bg-sage-deep text-cream'
                      : 'bg-sage-deep/8 text-sage-deep ring-1 ring-inset ring-sage-deep/15',
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[0.9rem] font-medium leading-snug text-charcoal">{f.label}</span>
                  {f.desc && <span className="mt-0.5 block text-xs leading-snug text-charcoal/55">{f.desc}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
