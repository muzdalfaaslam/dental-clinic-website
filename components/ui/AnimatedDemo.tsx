'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CalendarCheck,
  Star,
  MessageSquare,
  TrendingUp,
  CreditCard,
  BellRing,
  Sparkles,
  MousePointer2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A self-contained, looping "video" — a lively motion graphic standing in for the
 * real 45–90s visual demo until it's produced (brief §2; fills the gap with no
 * external asset). It cycles through different med spa websites (each a distinct
 * clinic + style), an animated cursor "books" an appointment, a rolling stack of
 * live notifications streams in (bookings, 5-star reviews, payments, reminders),
 * and a bookings counter pops upward. Autoplays, loops, muted; respects
 * prefers-reduced-motion (renders a single composed still).
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const TICK_MS = 2100;

/* Different clinics, each with its own name + style. */
const SITES = [
  { name: 'Lumière', tag: 'Aesthetics', bg: '#FAF6F0', bar: '#5E6B52', accent: '#C5A572', block: '#8C9A7E', text: '#5E6B52' },
  { name: 'Maison Belle', tag: 'Skin Studio', bg: '#FBF3EF', bar: '#A6736B', accent: '#C9A24B', block: '#D9B8B0', text: '#7A4E47' },
  { name: 'Aurelia', tag: 'Med Spa', bg: '#F3F1ED', bar: '#2E2A26', accent: '#C5A572', block: '#8C9A7E', text: '#2E2A26' },
  { name: 'Glow & Co.', tag: 'Beauty Bar', bg: '#F7F4EC', bar: '#7C8A6B', accent: '#C5A572', block: '#B9C2A7', text: '#52603F' },
  { name: 'Velvet & Vine', tag: 'Aesthetics', bg: '#F6F1F0', bar: '#6E5A63', accent: '#BE8F5A', block: '#C9AEB6', text: '#574752' },
];

const NOTIFS = [
  { icon: CalendarCheck, title: 'New booking', body: 'Botox · 2:30pm', tint: 'bg-sage-deep' },
  { icon: Star, title: 'New 5-star review', body: '“Booked in 30 seconds.”', tint: 'bg-champagne' },
  { icon: MessageSquare, title: 'New client booked online', body: 'Hydrafacial · Fri', tint: 'bg-rose' },
  { icon: CreditCard, title: 'Payment received', body: 'Deposit · $240', tint: 'bg-sage-soft' },
  { icon: BellRing, title: 'Reminders sent', body: '14 clients · today', tint: 'bg-sage-deep' },
  { icon: CalendarCheck, title: 'Rebooking confirmed', body: 'Filler touch-up', tint: 'bg-champagne' },
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

  // Rolling stack: newest + previous notification.
  const stack = (reduce ? [tick] : [tick, tick - 1])
    .filter((i) => i >= 0)
    .map((i) => ({ key: i, ...(NOTIFS[i % NOTIFS.length] ?? NOTIFS[0]!) }));

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-lg border border-champagne/40 bg-gradient-to-br from-cream-deep to-cream shadow-card ring-1 ring-inset ring-sage-soft/20 sm:aspect-video',
        className,
      )}
      role="img"
      aria-label="Animated demo: med spa websites in different styles, with an appointment being booked, live notifications, and a rising bookings counter."
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

      {/* floating sparkles */}
      {!reduce && (
        <>
          <Sparkles className="absolute left-[8%] top-[26%] size-4 text-champagne/60 animate-float-slow" strokeWidth={1.5} />
          <Sparkles className="absolute left-[12%] bottom-[20%] size-3 text-sage-soft/60 animate-float-slower" strokeWidth={1.5} />
        </>
      )}

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

      {/* rolling notification stack (top-right) — hidden on the smallest
          screens, where there isn't enough room for it beside the phone
          without overlapping (it's decorative, not essential). */}
      <div className="absolute right-4 top-12 z-20 hidden w-[min(58%,15rem)] flex-col gap-2 sm:flex">
        <AnimatePresence initial={false} mode="popLayout">
          {stack.map((n) => {
            const NotifIcon = n.icon;
            return (
              <motion.div
                key={n.key}
                layout
                initial={reduce ? false : { opacity: 0, x: 48, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 48, scale: 0.9 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex items-center gap-3 rounded-lg bg-cream/95 p-2.5 shadow-card ring-1 ring-line backdrop-blur-sm">
                  <span className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-full text-cream', n.tint)}>
                    <NotifIcon className="size-4" strokeWidth={1.75} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[0.72rem] font-semibold text-charcoal">{n.title}</div>
                    <div className="text-[0.66rem] text-charcoal/60">{n.body}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
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
