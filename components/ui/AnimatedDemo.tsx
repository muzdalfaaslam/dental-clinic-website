'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Star, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A self-contained, looping "video" — a motion graphic standing in for the real
 * 45–90s visual demo until it's produced (brief §2; fills the gap with no external
 * asset). It cycles through different med spa website styles, pops in live
 * notifications (new booking, 5-star review, new client booked), and ticks a
 * "bookings this month" counter upward. Autoplays, loops, muted, and respects
 * prefers-reduced-motion (renders a single composed still).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Three distinct on-brand website "styles" cycled in the device. */
const STYLES = [
  { name: 'Clinical Luxe', bg: '#FAF6F0', bar: '#5E6B52', accent: '#C5A572', block: '#8C9A7E', text: '#5E6B52' },
  { name: 'Warm Glow', bg: '#FBF3EF', bar: '#A6736B', accent: '#C9A24B', block: '#D9B8B0', text: '#7A4E47' },
  { name: 'Modern Spa', bg: '#F4F2EE', bar: '#2E2A26', accent: '#C5A572', block: '#8C9A7E', text: '#2E2A26' },
];

const NOTIFS = [
  { icon: CalendarCheck, title: 'New booking', body: 'Botox · 2:30pm', tint: 'bg-sage-deep' },
  { icon: Star, title: 'New 5-star review', body: '“Booked in 30 seconds.”', tint: 'bg-champagne' },
  { icon: MessageSquare, title: 'New client booked online', body: 'Hydrafacial · Fri', tint: 'bg-rose' },
];

const BOOK_MIN = 12;
const BOOK_MAX = 19;

function MiniSite({ style }: { style: (typeof STYLES)[number] }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: style.bg }}>
      {/* top bar */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="font-display text-[0.7rem] font-semibold" style={{ color: style.text }}>
          Lumière
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[0.55rem] text-white"
          style={{ background: style.bar }}
        >
          Book
        </span>
      </div>
      {/* hero */}
      <div className="relative mx-3 flex-1 rounded-md" style={{ background: style.bar }}>
        <div className="absolute left-3 top-3 space-y-1.5">
          <div className="h-2 w-16 rounded-full bg-white/85" />
          <div className="h-2 w-10 rounded-full bg-white/50" />
          <div
            className="mt-2 h-3 w-14 rounded-full"
            style={{ background: style.accent }}
          />
        </div>
        <div
          className="absolute bottom-3 right-3 size-10 rounded-full opacity-70"
          style={{ background: style.block }}
        />
      </div>
      {/* tiles */}
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-7 rounded" style={{ background: style.block, opacity: 0.35 }} />
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
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const styleIndex = tick % STYLES.length;
  const style = STYLES[styleIndex] ?? STYLES[0]!;
  const notif = NOTIFS[tick % NOTIFS.length] ?? NOTIFS[0]!;
  const bookings = reduce ? BOOK_MAX : BOOK_MIN + (tick % (BOOK_MAX - BOOK_MIN + 1));
  const NotifIcon = notif.icon;

  return (
    <div
      className={cn(
        'relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-lg border border-champagne/40 bg-gradient-to-br from-cream-deep to-cream shadow-card ring-1 ring-inset ring-sage-soft/20',
        className,
      )}
      role="img"
      aria-label="Animated demo: med spa websites in different styles, with live bookings, new five-star reviews, and clients booking online."
    >
      {/* ambient backdrop */}
      <div aria-hidden className="absolute -left-16 -top-16 size-56 rounded-full bg-sage-soft/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 -right-10 size-56 rounded-full bg-rose/20 blur-3xl" />

      {/* live badge */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-charcoal/80 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-cream">
        <span className={cn('size-1.5 rounded-full bg-rose', !reduce && 'animate-pulse')} />
        Live preview
      </div>

      {/* device showing cycling website styles */}
      <div className="absolute left-1/2 top-1/2 z-10 h-[72%] w-[34%] min-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.4rem] border-[5px] border-charcoal bg-charcoal shadow-card">
        <div className="relative h-full w-full overflow-hidden rounded-[1rem]">
          {reduce ? (
            <MiniSite style={style} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={styleIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <MiniSite style={style} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* style name caption under device */}
      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-center">
        <span className="rounded-full bg-cream/85 px-3 py-1 text-[0.7rem] font-medium text-sage-deep shadow-soft backdrop-blur-sm">
          {style.name}
        </span>
      </div>

      {/* notification toast (top-right) */}
      <div className="absolute right-4 top-12 z-20 w-[min(58%,15rem)]">
        {reduce ? (
          <Toast notif={notif} NotifIcon={NotifIcon} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tick}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Toast notif={notif} NotifIcon={NotifIcon} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* bookings counter (bottom-left) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 rounded-lg bg-cream/85 px-3.5 py-2.5 shadow-soft backdrop-blur-sm">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep">
          <TrendingUp className="size-4" strokeWidth={1.75} />
        </span>
        <div className="leading-tight">
          <div className="font-display text-lg font-semibold text-sage-deep">
            {bookings}
            <span className="ml-0.5 text-xs font-medium text-sage-soft">online bookings</span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-2.5 text-champagne" strokeWidth={1.5} fill="currentColor" />
            ))}
            <span className="ml-1 text-[0.6rem] text-charcoal/55">this month</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({
  notif,
  NotifIcon,
}: {
  notif: (typeof NOTIFS)[number];
  NotifIcon: (typeof NOTIFS)[number]['icon'];
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-cream/95 p-2.5 shadow-card ring-1 ring-line backdrop-blur-sm">
      <span className={cn('inline-flex size-8 items-center justify-center rounded-full text-cream', notif.tint)}>
        <NotifIcon className="size-4" strokeWidth={1.75} />
      </span>
      <div className="leading-tight">
        <div className="text-[0.72rem] font-semibold text-charcoal">{notif.title}</div>
        <div className="text-[0.66rem] text-charcoal/60">{notif.body}</div>
      </div>
    </div>
  );
}
