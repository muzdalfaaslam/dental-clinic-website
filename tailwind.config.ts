import type { Config } from 'tailwindcss';

/**
 * Tailwind maps every brand-specific value to a CSS variable (defined in
 * app/globals.css, sourced from config/theme.ts). Components only ever reference
 * these semantic tokens — NEVER a raw hex. Swapping config/theme.ts therefore
 * re-skins the entire page without touching a single component. See §11 of the brief.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        'cream-deep': 'rgb(var(--color-cream-deep) / <alpha-value>)',
        // Brand
        'sage-deep': 'rgb(var(--color-sage-deep) / <alpha-value>)',
        'sage-soft': 'rgb(var(--color-sage-soft) / <alpha-value>)',
        champagne: 'rgb(var(--color-champagne) / <alpha-value>)',
        rose: 'rgb(var(--color-rose) / <alpha-value>)',
        // Text
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
        // The footer's single permitted accent (kept out of the page body).
        'accent-brand': 'rgb(var(--color-accent-brand) / <alpha-value>)',
      },
      textColor: {
        'charcoal-60': 'rgba(var(--color-charcoal) / 0.6)',
      },
      borderColor: {
        line: 'var(--color-line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      spacing: {
        section: 'var(--section-py)',
        gutter: 'var(--container-gutter)',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
