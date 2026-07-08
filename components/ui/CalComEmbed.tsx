'use client';

import { useEffect, useRef } from 'react';
import { CalendarClock } from 'lucide-react';

/* eslint-disable @typescript-eslint/no-explicit-any */
// Cal.com's embed API is an untyped third-party global — `any` confined to this shim.
declare global {
  interface Window {
    Cal?: any;
  }
}

const EMBED_SRC = 'https://app.cal.com/embed/embed.js';

/**
 * Injects the official Cal.com embed loader once per page (idempotent — a
 * near-verbatim port of Cal.com's documented snippet, since this queuing
 * shim is easy to subtly break by "cleaning up"). Real API calls only start
 * flowing once the actual embed.js script (appended here) finishes loading.
 */
function loadCalScript() {
  if (window.Cal) return;
  const push = (api: any, args: unknown) => api.q.push(args);
  const Cal: any = function (...args: unknown[]) {
    const api = window.Cal;
    if (!api.loaded) {
      api.ns = {};
      api.q = api.q || [];
      const script = document.createElement('script');
      script.src = EMBED_SRC;
      document.head.appendChild(script);
      api.loaded = true;
    }
    if (args[0] === 'init') {
      const namespaceApi: any = (...nsArgs: unknown[]) => push(namespaceApi, nsArgs);
      const namespace = args[1];
      namespaceApi.q = namespaceApi.q || [];
      if (typeof namespace === 'string') {
        api.ns[namespace] = api.ns[namespace] || namespaceApi;
        push(api.ns[namespace], args);
        push(api, ['initNamespace', namespace]);
      } else {
        push(api, args);
      }
      return;
    }
    push(api, args);
  };
  Cal.q = [];
  window.Cal = Cal;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Inline Cal.com booking widget. Lazy-loads the embed script only when
 * mounted (i.e. once a visitor picks "self-schedule" in the qualify flow —
 * no cost when unused). Fires `onBooked` via Cal.com's own
 * `bookingSuccessful` event so the caller can advance to the next step only
 * once a real booking completes. `calLink` empty (not yet configured by the
 * client) renders a graceful placeholder instead of a broken embed.
 */
/** Values pushed into the Cal.com booking form so the visitor doesn't re-type
 *  what they already told us. `name`/`email`/`notes` map to the default booking
 *  fields; anything else is treated as a custom-field prefill keyed by slug. */
export interface CalPrefill {
  name?: string;
  email?: string;
  notes?: string;
  [customFieldSlug: string]: string | undefined;
}

export function CalComEmbed({
  calLink,
  fallbackText,
  prefill,
  onBooked,
}: {
  calLink: string;
  fallbackText: string;
  prefill?: CalPrefill;
  onBooked?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calLink) return;
    loadCalScript();
    const Cal = window.Cal;
    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', {
      elementOrSelector: containerRef.current,
      calLink,
      layout: 'month_view',
      // Drops the collected answers straight into the booking form fields.
      ...(prefill ? { config: prefill } : {}),
    });
    Cal('ui', {
      styles: { branding: { brandColor: '#5E6B52' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
    if (onBooked) {
      Cal('on', { action: 'bookingSuccessful', callback: onBooked });
    }
  }, [calLink, prefill, onBooked]);

  if (!calLink) {
    return (
      <div className="flex min-h-[16rem] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-cream-deep/50 p-8 text-center">
        <CalendarClock className="size-8 text-sage-soft" strokeWidth={1.5} />
        <p className="max-w-xs text-sm text-charcoal/60">{fallbackText}</p>
      </div>
    );
  }

  return <div ref={containerRef} className="min-h-[38rem] w-full overflow-hidden rounded-lg" />;
}
