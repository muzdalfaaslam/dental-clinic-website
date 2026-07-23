/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE NICHE SKIN  (dental clinic = "Clinical Blue")
 * ─────────────────────────────────────────────────────────────────────────────
 * This file + config/content.ts are the ONLY two files that change per niche.
 * No component touches a raw hex — they read CSS variables that are
 * generated from the `cssVars` map below.
 *
 * Colors are stored as "R G B" space-separated channels so Tailwind's
 * `<alpha-value>` opacity modifier works (e.g. `bg-sage-deep/10`).
 */

export interface NicheTheme {
  /** Human label for the skin — appears in README / dev tooling only. */
  name: string;
  /** Space-separated RGB channels, consumed by globals.css → CSS variables. */
  cssVars: Record<string, string>;
}

export const theme: NicheTheme = {
  name: 'Premium Navy & Gold (Dental Clinic)',
  cssVars: {
    // ── Color: surfaces ──────────────────────────────────────────────────────
    '--color-cream': '246 247 250', //        #F6F7FA  page background (soft off-white, cool tint)
    '--color-cream-deep': '236 239 244', //   #ECEFF4  alternating section bg / card surface
    // ── Color: brand ─────────────────────────────────────────────────────────
    '--color-sage-deep': '18 40 61', //       #12283D  headings, primary buttons, footer (deep navy)
    '--color-sage-soft': '70 108 140', //     #466C8C  secondary accents, icons, hover, tints
    '--color-champagne': '201 162 75', //     #C9A24B  thin rules, icon strokes, underlines (warm gold)
    '--color-rose': '223 211 184', //         #DFD3B8  optional soft accent: testimonials, before/after
    // ── Color: warm accent (used sparingly: highlight badges, one CTA, icons) ─
    '--color-warm-accent': '201 162 75', //   #C9A24B  same warm gold, used sparingly for warmth
    // ── Color: text ──────────────────────────────────────────────────────────
    '--color-charcoal': '28 32 38', //        #1C2026  body text (near-navy-black)
    // ── Color: footer-only brand accent (TechxServe red, used as a small touch) ─
    '--color-accent-brand': '199 62 56', //   #C73E38  permitted ONLY in the footer

    // ── Hairlines ────────────────────────────────────────────────────────────
    '--color-line': 'rgba(18,40,61,0.14)',

    // ── Radius (rounder + friendlier — was 10/16/24) ─────────────────────────
    '--radius-sm': '12px',
    '--radius-md': '20px',
    '--radius-lg': '28px',

    // ── Shadow (soft, warm, low-opacity — never harsh black) ─────────────────
    '--shadow-soft':
      '0 2px 8px rgba(28,32,38,0.05), 0 12px 32px rgba(28,32,38,0.06)',
    '--shadow-card':
      '0 1px 2px rgba(28,32,38,0.05), 0 18px 40px rgba(18,40,61,0.10)',

    // ── Layout rhythm ────────────────────────────────────────────────────────
    '--section-py': 'clamp(2.75rem, 6vw, 5rem)',
    '--container-max': '1200px',
    '--container-gutter': 'clamp(1.25rem, 5vw, 2.5rem)',
  },
};

/** Serialize the theme to a CSS string injected once into <html>. */
export function themeToCss(t: NicheTheme = theme): string {
  const body = Object.entries(t.cssVars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `:root {\n${body}\n}`;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THEME VARIANTS  (visitor-facing "try it" showcase only — see PlatformThemeShowcase)
 * ─────────────────────────────────────────────────────────────────────────────
 * These are NOT part of the re-skin contract above (only `theme` is what ships
 * server-side). They power a client-side demo that live-swaps the `--color-*`
 * variables to prove the re-skin seam to visitors: "your site, your colors."
 * Radius/shadow/layout tokens are shared across every variant on purpose —
 * only color changes.
 */
const sharedTokens = {
  '--radius-sm': '12px',
  '--radius-md': '20px',
  '--radius-lg': '28px',
  '--color-warm-accent': '201 162 75',
  '--shadow-soft': '0 2px 8px rgba(46,42,38,0.04), 0 12px 32px rgba(46,42,38,0.06)',
  '--shadow-card': '0 1px 2px rgba(46,42,38,0.04), 0 18px 40px rgba(94,107,82,0.08)',
  '--section-py': 'clamp(2.75rem, 6vw, 5rem)',
  '--container-max': '1200px',
  '--container-gutter': 'clamp(1.25rem, 5vw, 2.5rem)',
};

export const themeVariants: NicheTheme[] = [
  theme,
  {
    name: 'Rose Quartz',
    cssVars: {
      ...sharedTokens,
      '--color-cream': '253 246 244',
      '--color-cream-deep': '247 233 229',
      '--color-sage-deep': '168 105 105',
      '--color-sage-soft': '201 148 148',
      '--color-champagne': '214 175 140',
      '--color-rose': '235 199 199',
      '--color-charcoal': '58 40 40',
      '--color-accent-brand': '199 62 56',
      '--color-line': 'rgba(168,105,105,0.18)',
    },
  },
  {
    name: 'Midnight Ocean',
    cssVars: {
      ...sharedTokens,
      '--color-cream': '16 22 32',
      '--color-cream-deep': '22 30 42',
      '--color-sage-deep': '90 160 200',
      '--color-sage-soft': '130 185 215',
      '--color-champagne': '160 200 220',
      '--color-rose': '45 65 90',
      '--color-charcoal': '235 240 245',
      '--color-accent-brand': '214 90 84',
      '--color-line': 'rgba(90,160,200,0.18)',
    },
  },
  {
    name: 'Botanical',
    cssVars: {
      ...sharedTokens,
      '--color-cream': '247 248 242',
      '--color-cream-deep': '236 240 227',
      '--color-sage-deep': '45 74 62',
      '--color-sage-soft': '92 128 108',
      '--color-champagne': '178 154 84',
      '--color-rose': '205 214 180',
      '--color-charcoal': '30 36 30',
      '--color-accent-brand': '199 62 56',
      '--color-line': 'rgba(45,74,62,0.18)',
    },
  },
  {
    name: 'Minimal Mono',
    cssVars: {
      ...sharedTokens,
      '--color-cream': '255 255 255',
      '--color-cream-deep': '244 244 244',
      '--color-sage-deep': '20 20 20',
      '--color-sage-soft': '110 110 110',
      '--color-champagne': '180 150 90',
      '--color-rose': '230 230 230',
      '--color-charcoal': '20 20 20',
      '--color-accent-brand': '199 62 56',
      '--color-line': 'rgba(20,20,20,0.14)',
    },
  },
];