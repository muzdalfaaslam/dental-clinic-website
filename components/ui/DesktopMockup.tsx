import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Reusable desktop / browser-window frame. Pure CSS chrome (traffic dots + a URL
 * pill) wrapping a 16:10 screen — used in social proof to show the rebuilt site on
 * a real screen beside a phone (brief §5 component spirit). Accepts an image or
 * arbitrary children (e.g. a before/after slider).
 */
export function DesktopMockup({
  src,
  alt,
  url = 'lumiere-aesthetics.com',
  priority = false,
  className,
  children,
}: {
  src?: string;
  alt?: string;
  url?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-charcoal/10 bg-cream shadow-card ring-1 ring-charcoal/5',
        className,
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-cream-deep/70 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-rose/70" />
          <span className="size-2.5 rounded-full bg-champagne/70" />
          <span className="size-2.5 rounded-full bg-sage-soft/70" />
        </span>
        <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-full bg-cream px-3 py-1 text-[0.65rem] text-charcoal/55 ring-1 ring-inset ring-line">
          <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-sage-soft" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {url}
        </span>
      </div>
      {/* screen */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream">
        {children ??
          (src && alt ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 90vw, 36rem"
              className="object-cover object-top"
            />
          ) : null)}
      </div>
    </div>
  );
}
