/**
 * Thin analytics wrapper. Pushes to GA4 + Meta Pixel when their IDs are present,
 * and no-ops otherwise (so the page runs identically with no tags configured).
 * Tags themselves are injected in app/layout.tsx via next/script (afterInteractive),
 * so nothing here blocks LCP. See brief §9.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
// `gtag` / `fbq` are untyped third-party globals — `any` is confined to this shim.
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

export type AnalyticsEvent =
  | 'cta_click'
  | 'video_play'
  | 'form_start'
  | 'lead_submit'
  | 'quiz_start'
  | 'quiz_complete';

export type EventPayload = Record<string, string | number | boolean | undefined>;

export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return;

  // GA4
  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }

  // Meta Pixel — map our conversions to the standard `Lead` event.
  if (META_PIXEL_ID && typeof window.fbq === 'function') {
    if (event === 'lead_submit' || event === 'quiz_complete') {
      window.fbq('track', 'Lead', payload);
    } else {
      window.fbq('trackCustom', event, payload);
    }
  }
}

/** Convenience: a CTA click tagged with the section it fired from. */
export function trackCta(source: string): void {
  track('cta_click', { source });
}
