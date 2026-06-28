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
        'relative mx-auto aspect-[9/19] w-[clamp(15rem,80vw,18rem)] rounded-[2.5rem] ' +
          'bg-charcoal p-2.5 shadow-card ring-1 ring-charcoal/10',
        className,
      )}
    >
      {/* notch */}
      <div
        aria-hidden
        className="absolute left-1/2 top-2.5 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-charcoal"
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
