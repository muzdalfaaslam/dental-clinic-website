/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE NICHE SKIN  (med spa = "Clinical Luxe")
 * ─────────────────────────────────────────────────────────────────────────────
 * This file + config/content.ts are the ONLY two files that change per niche.
 * To ship the next vertical (roofing, dental, …) copy this file to e.g.
 * `theme.roofing.ts`, swap the values, and point app/globals.css's variable
 * injection at it. No component touches a raw hex — they read CSS variables that
 * are generated from the `cssVars` map below. See brief §3 (color) and §11 (re-skin).
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
  name: 'Clinical Luxe (Med Spa)',
  cssVars: {
    // ── Color: surfaces ──────────────────────────────────────────────────────
    '--color-cream': '250 246 240', //        #FAF6F0  page background (never pure white)
    '--color-cream-deep': '242 235 224', //   #F2EBE0  alternating section bg / card surface
    // ── Color: brand ─────────────────────────────────────────────────────────
    '--color-sage-deep': '94 107 82', //      #5E6B52  headings, primary buttons, footer
    '--color-sage-soft': '140 154 126', //    #8C9A7E  secondary accents, icons, hover, tints
    '--color-champagne': '197 165 114', //    #C5A572  GOLD — thin rules, icon strokes, underlines ONLY
    '--color-rose': '217 184 176', //         #D9B8B0  optional warm accent: testimonials, before/after
    // ── Color: text ──────────────────────────────────────────────────────────
    '--color-charcoal': '46 42 38', //        #2E2A26  body text
    // ── Color: footer-only brand accent (TechxServe red, used as a small touch) ─
    '--color-accent-brand': '199 62 56', //   #C73E38  permitted ONLY in the footer

    // ── Hairlines ────────────────────────────────────────────────────────────
    '--color-line': 'rgba(94,107,82,0.18)',

    // ── Radius ───────────────────────────────────────────────────────────────
    '--radius-sm': '10px',
    '--radius-md': '16px',
    '--radius-lg': '24px',

    // ── Shadow (soft, warm, low-opacity — never harsh black) ─────────────────
    '--shadow-soft':
      '0 2px 8px rgba(46,42,38,0.04), 0 12px 32px rgba(46,42,38,0.06)',
    '--shadow-card':
      '0 1px 2px rgba(46,42,38,0.04), 0 18px 40px rgba(94,107,82,0.08)',

    // ── Layout rhythm ────────────────────────────────────────────────────────
    '--section-py': 'clamp(4rem, 10vw, 8rem)',
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
