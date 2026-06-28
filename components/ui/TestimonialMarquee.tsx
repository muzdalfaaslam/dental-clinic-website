'use client';

import { useReducedMotion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  rating?: number;
  pending?: boolean;
}

/**
 * Infinite-loop testimonial marquee. Two concatenated copies of the list scroll
 * continuously and seamlessly (CSS keyframe translates exactly -50%); hovering
 * pauses it. Under prefers-reduced-motion it falls back to a normal horizontally
 * scrollable row with no animation. Decorative duplicate is aria-hidden so screen
 * readers hear each quote once (brief §4.4, §6, §10 a11y).
 */
export function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <ul className="flex snap-x gap-5 overflow-x-auto pb-4" aria-label="What owners say">
        {items.map((t, i) => (
          <li key={`${t.name}-${i}`} className="w-[min(85vw,22rem)] shrink-0 snap-start">
            <TestimonialCard {...t} tint={i % 2 === 1} />
          </li>
        ))}
      </ul>
    );
  }

  // Speed scales with item count so the pace stays even regardless of how many.
  const duration = Math.max(28, items.length * 9);

  return (
    <div
      className="marquee-paused relative overflow-hidden"
      aria-label="What owners say"
      // Edge fade so cards dissolve in/out rather than hard-cropping.
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      {/* One flat list, items duplicated. Each card carries a uniform right margin
          (not flex gap) so translating exactly -50% lands on the duplicate with no
          jump. The second copy is aria-hidden so quotes are announced once. */}
      <ul
        className="animate-marquee flex w-max"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((t, idx) => {
          const original = idx % items.length;
          return (
            <li
              key={idx}
              aria-hidden={idx >= items.length}
              className="mr-5 w-[22rem] shrink-0"
            >
              <TestimonialCard {...t} tint={original % 2 === 1} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
