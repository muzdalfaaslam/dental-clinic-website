'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImgSpec {
  src: string;
  alt: string;
}

/**
 * Draggable before/after reveal. Built on a native range input so it's keyboard
 * operable (arrow keys move the handle) and screen-reader announced out of the box;
 * pointer drag updates the same value. Fills its container — pass it into a
 * PhoneMockup as children (brief §5 component checklist, §10 a11y).
 */
export function BeforeAfterSlider({
  before,
  after,
  className,
}: {
  before: ImgSpec;
  after: ImgSpec;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const labelId = useId();

  return (
    <div className={cn('relative h-full w-full select-none overflow-hidden', className)}>
      {/* AFTER — full width underneath */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(max-width: 768px) 80vw, 18rem"
        className="object-cover object-top"
      />
      {/* BEFORE — clipped to the handle position, on top */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
        aria-hidden
      >
        {/* fixed-width inner so the image doesn't squish as the clip shrinks */}
        <div className="relative h-full" style={{ width: `${100 / (pos / 100 || 1)}%`, maxWidth: 'none' }}>
          <Image
            src={before.src}
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, 18rem"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* corner labels */}
      <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-charcoal/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-cream">
        Before
      </span>
      <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-sage-deep/85 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-cream">
        After
      </span>

      {/* divider line + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-cream shadow-[0_0_0_1px_rgba(46,42,38,0.12)]"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-sage-deep shadow-card ring-1 ring-champagne/50">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.75}>
            <path d="m9 6-4 6 4 6M15 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* the actual control — invisible range spanning the whole area */}
      <label id={labelId} className="sr-only">
        Reveal the rebuilt website. Drag, or use the arrow keys.
      </label>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-labelledby={labelId}
        aria-valuetext={`${pos}% before, ${100 - pos}% after`}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
