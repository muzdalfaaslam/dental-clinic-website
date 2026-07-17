'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Star, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A self-contained, looping "video" — a lively motion graphic standing in for the
 * real 45–90s visual demo until it's produced (brief §2; fills the gap with no
 * external asset). It cycles through different dental clinic websites (each a distinct
 * clinic + style), an animated cursor "books" an appointment, and a bookings counter
 * pops upward. Autoplays, loops, muted; respects prefers-reduced-motion (renders a
 * single composed still).
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const TICK_MS = 2100;

/* Different clinics, each with its own name + style. */
const SITES = [
  { name: 'Lumière', tag: 'Dental Care', bg: '#FAF6F0', bar: '#145A6E', accent: '#3C8296', block: '#5AA0AF', text: '#145A6E' },
  { name: 'Bright Smile', tag: 'Family Dentistry', bg: '#F0F6F8', bar: '#2C6E8C', accent: '#4A90A4', block: '#A9CFDA', text: '#1F4E63' },
  { name: 'Aurelia', tag: 'Dental Studio', bg: '#F3F1ED', bar: '#22323F', accent: '#3C8296', block: '#7FA8B8', text: '#22323F' },
  { name: 'True North', tag: 'Dental Group', bg: '#F0F5F4', bar: '#1F5C66', accent: '#3C8296', block: '#9FC7CB', text: '#204A52' },
  { name: 'Willow Dental', tag: 'Orthodontics', bg: '#F1F2F6', bar: '#3A4A6B', accent: '#5E77A8', block: '#AAB8D9', text: '#2E3A56' },
];

const BOOK_MIN = 12;
const BOOK_MAX = 24;

function MiniSite({ site }: { site: (typeof SITES)[number] }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: site.bg }}>
      {/* top bar */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="font-display text-[0.72rem] font-semibold leading-none" style={{ color: site.text }}>
          {site.name}
          <span className="ml-1 align-middle text-[0.42rem] font-normal uppercase tracking-wider opacity-60">
            {site.tag}
          </span>
        </span>
        <span className="rounded-full px-2 py-0.5 text-[0.5rem] text-white" style={{ background: site.bar }}>
          Menu
        </span>
      </div>
      {/* hero */}
      <div className="relative mx-3 h-[42%] rounded-md" style={{ background: site.bar }}>
        <div className="absolute left-3 top-3 space-y-1.5">
          <div className="h-2 w-16 rounded-full bg-white/85" />
          <div className="h-2 w-10 rounded-full bg-white/50" />
        </div>
        <div
          className="absolute bottom-3 right-3 size-9 rounded-full opacity-70"
          style={{ background: site.block }}
        />
      </div>
      {/* tiles */}
      <div className="mt-auto grid grid-cols-3 gap-1.5 p-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-9 rounded" style={{ background: site.block, opacity: 0.32 }} />
        ))}
      </div>
    </div>
  );
}

export function AnimatedDemo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const siteIndex = tick % SITES.length;
  const site = SITES[siteIndex] ?? SITES[0]!;
  const bookings = reduce ? BOOK_MAX : BOOK_MIN + (tick % (BOOK_MAX - BOOK_MIN + 1));

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-lg border border-champagne/40 bg-gradient-to-br from-cream-deep to-cream shadow-card ring-1 ring-inset ring-sage-soft/20 sm:aspect-video',
        className,
      )}
      role="img"
      aria-label="Animated demo: dental clinic websites in different styles, with an appointment being booked and a rising bookings counter."
    >
      {/* top progress shimmer — implies the site building itself */}
      {!reduce && (
        <motion.div
          className="absolute left-0 top-0 z-30 h-[3px] bg-gradient-to-r from-champagne via-sage-soft to-champagne"
          animate={{ width: ['0%', '100%'], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: TICK_MS / 1000, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* ambient backdrop */}
      <div aria-hidden className="absolute -left-16 -top-16 size-56 rounded-full bg-sage-soft/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 -right-10 size-56 rounded-full bg-rose/20 blur-3xl" />

      {/* live badge */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-charcoal/80 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-cream">
        <span className={cn('size-1.5 rounded-full bg-rose', !reduce && 'animate-pulse')} />
        Live preview
      </div>

      {/* device showing cycling sites + an animated cursor booking */}
      <div className="absolute left-1/2 top-1/2 z-10 h-[74%] w-[33%] min-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.4rem] border-[5px] border-charcoal bg-charcoal shadow-card">
        <div className="relative h-full w-full overflow-hidden rounded-[1rem]">
          {reduce ? (
            <MiniSite site={site} />
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={siteIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <MiniSite site={site} />
              </motion.div>
            </AnimatePresence>
          )}

          {/* persistent CTA the cursor clicks — hidden on the smallest
              screens, where the shrunk phone mockup doesn't have room for
              it (the button text wraps and the ripple/cursor overlap the
              site content beneath it). */}
          <div className="absolute bottom-[20%] left-1/2 z-20 hidden -translate-x-1/2 sm:block">
            <motion.div
              className="whitespace-nowrap rounded-full bg-sage-deep px-4 py-1.5 text-[0.6rem] font-medium text-cream shadow-card ring-1 ring-champagne/40"
              animate={reduce ? undefined : { scale: [1, 1, 0.92, 1, 1] }}
              transition={{ duration: TICK_MS / 1000, times: [0, 0.42, 0.5, 0.58, 1], repeat: Infinity }}
            >
              Book Now
            </motion.div>
            {/* click ripple */}
            {!reduce && (
              <motion.span
                className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne"
                animate={{ scale: [0, 1.8], opacity: [0.55, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: TICK_MS / 1000 - 1, ease: 'easeOut' }}
              />
            )}
            {/* cursor */}
            {!reduce && (
              <motion.div
                className="absolute -right-3 top-3 text-charcoal drop-shadow"
                animate={{ x: [6, 0, 0, 6], y: [6, 0, 0, 6] }}
                transition={{ duration: TICK_MS / 1000, times: [0, 0.42, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }}
              >
                <MousePointer2 className="size-4 fill-cream" strokeWidth={1.5} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* clinic name caption under the device */}
      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-center">
        {reduce ? (
          <span className="rounded-full bg-cream/85 px-3 py-1 text-[0.7rem] font-medium text-sage-deep shadow-soft">
            {site.name}
          </span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={siteIndex}
              className="inline-block rounded-full bg-cream/85 px-3 py-1 text-[0.7rem] font-medium text-sage-deep shadow-soft backdrop-blur-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              {site.name} · {site.tag}
            </motion.span>
          </AnimatePresence>
        )}
      </div>

      {/* bookings counter (bottom-left) with pop + "+1" flyup */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-lg bg-cream/85 px-2.5 py-2 shadow-soft backdrop-blur-sm sm:bottom-4 sm:left-4 sm:gap-2.5 sm:px-3.5 sm:py-2.5">
        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep sm:size-7">
          <TrendingUp className="size-3.5 sm:size-4" strokeWidth={1.75} />
        </span>
        <div className="relative leading-tight">
          <div className="flex items-baseline gap-1 font-display text-base font-semibold text-sage-deep sm:text-lg">
            {reduce ? (
              <span>{bookings}</span>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={bookings}
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {bookings}
                </motion.span>
              </AnimatePresence>
            )}
            <span className="text-xs font-medium text-sage-soft">online bookings</span>
            {/* +1 flyup */}
            {!reduce && (
              <motion.span
                key={`plus-${tick}`}
                className="absolute -right-5 -top-1 text-[0.6rem] font-semibold text-sage-deep"
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: [0, 1, 0], y: -16 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              >
                +1
              </motion.span>
            )}
          </div>
          {/* sequentially shining stars */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                animate={reduce ? undefined : { scale: [1, 1, 1.35, 1], y: [0, 0, -1, 0] }}
                transition={{ duration: 2, times: [0, 0.1 + i * 0.08, 0.18 + i * 0.08, 1], repeat: Infinity, repeatDelay: 0.4 }}
              >
                <Star className="size-2.5 text-champagne" strokeWidth={1.5} fill="currentColor" />
              </motion.span>
            ))}
            <span className="ml-1 text-[0.6rem] text-charcoal/55">this month</span>
          </div>
        </div>
      </div>
    </div>
  );
}