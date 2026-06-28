import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Reusable phone frame that wraps a screenshot — used in the hero and social
 * proof (brief §5 component checklist). The frame is pure CSS (no image asset),
 * so it stays crisp at any size and adds zero network weight.
 */
export function PhoneMockup({
  src,
  alt,
  priority = false,
  className,
  children,
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  /** Optional custom inner content (e.g. a before/after slider) instead of an image. */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto aspect-[9/19] w-full max-w-[18rem] rounded-[2.5rem] ' +
          'bg-charcoal p-2.5 shadow-card ring-1 ring-charcoal/10',
        className,
      )}
    >
      {/* subtle pill notch (dynamic-island style) — small so it doesn't cover content */}
      <div
        aria-hidden
        className="absolute left-1/2 top-3 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-charcoal/90"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-cream">
        {children ??
          (src && alt ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 80vw, 18rem"
              className="object-cover object-top"
            />
          ) : null)}
      </div>
    </div>
  );
}
