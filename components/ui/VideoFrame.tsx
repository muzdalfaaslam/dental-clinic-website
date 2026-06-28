'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';

/**
 * Video frame with a soft sage/gold border and a custom elegant play button.
 * Poster loads as an optimized image; the <video> is only mounted on first play
 * (lazy — keeps it off the critical path). Fires `video_play` analytics. When no
 * real source is wired yet (config), it shows the poster + play affordance and a
 * gentle "demo coming" state instead of erroring (brief §2, §9).
 */
export function VideoFrame({
  poster,
  src,
  captionsSrc,
  title,
  className,
}: {
  poster: string;
  src?: string;
  captionsSrc?: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    track('video_play', { title });
    if (src) {
      setPlaying(true);
      // play after mount
      requestAnimationFrame(() => videoRef.current?.play());
    }
  };

  return (
    <div
      className={cn(
        'relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-lg ' +
          'border border-champagne/40 bg-charcoal shadow-card ring-1 ring-inset ring-sage-soft/20',
        className,
      )}
    >
      {playing && src ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          controls
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
        </video>
      ) : (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 92vw, 48rem"
            className="object-cover opacity-90"
          />
          <button
            type="button"
            onClick={handlePlay}
            className="group absolute inset-0 flex items-center justify-center bg-charcoal/15 transition-colors hover:bg-charcoal/25"
            aria-label={src ? `Play video: ${title}` : `${title}: demo preview`}
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-cream/90 text-sage-deep shadow-card ring-1 ring-champagne/50 transition-transform duration-200 motion-safe:group-hover:scale-105">
              <Play className="ml-1 size-8" strokeWidth={1.5} fill="currentColor" />
            </span>
          </button>
          {!src && (
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/70 px-3 py-1 text-xs text-cream">
              Visual demo coming soon
            </span>
          )}
        </>
      )}
    </div>
  );
}
