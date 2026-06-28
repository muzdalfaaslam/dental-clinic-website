'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { cn } from '@/lib/utils';

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  rating?: number;
  pending?: boolean;
}

/**
 * Touch-friendly, keyboard-accessible testimonial carousel (Embla). Arrow buttons
 * and the native focus order keep it operable without a mouse; dots announce
 * position. Optional dusty-rose tint on alternating cards (brief §5, §6, §10 a11y).
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative" aria-roledescription="carousel" aria-label="What owners say">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-5">
          {items.map((t, i) => (
            <div
              key={`${t.name}-${t.city}-${i}`}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
            >
              <TestimonialCard {...t} tint={i % 2 === 1} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-cream text-sage-deep transition-colors hover:bg-cream-deep"
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === selected}
              className={cn(
                'size-2 rounded-full transition-colors',
                i === selected ? 'bg-sage-deep' : 'bg-line',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-cream text-sage-deep transition-colors hover:bg-cream-deep"
        >
          <ChevronRight className="size-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
