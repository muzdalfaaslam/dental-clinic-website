import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Soft testimonial card — quote, star rating, name + city. Optional dusty-rose
 * tint variant for warmer sections (brief §6). `pending` marks illustrative
 * placeholder content until real, consented testimonials arrive.
 */
export function TestimonialCard({
  quote,
  name,
  city,
  rating = 5,
  tint = false,
  pending = false,
  className,
}: {
  quote: string;
  name: string;
  city: string;
  rating?: number;
  tint?: boolean;
  pending?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col gap-5 rounded-lg border border-line p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-card',
        tint ? 'bg-rose/15' : 'bg-cream',
        className,
      )}
    >
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden
            className={cn('size-4', i < rating ? 'text-champagne' : 'text-line')}
            strokeWidth={1.5}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <blockquote className="flex-1 font-display text-lg leading-relaxed text-charcoal">
        “{quote}”
      </blockquote>
      <figcaption className="text-sm">
        <span className="font-medium text-charcoal">{name}</span>
        <span className="text-charcoal/60"> · {city}</span>
        {pending && (
          // CLIENT: replace with a real, consented testimonial. Visible in dev only-ish.
          <span className="ml-2 rounded-full bg-cream-deep px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-charcoal/50">
            Illustrative
          </span>
        )}
      </figcaption>
    </figure>
  );
}
