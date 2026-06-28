/**
 * Decorative, on-brand hero backdrop — soft sage/rose gradient orbs, a thin gold
 * ring, a faint dotted grid, and floating accent dots. Purely decorative
 * (aria-hidden); ambient motion is disabled under prefers-reduced-motion via the
 * global media query. Replaces the hero phone mockup with atmosphere (brief §5:
 * negative space, soft shapes, thin gold/sage rules).
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* faint dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(rgb(var(--color-sage-soft) / 0.16) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(75% 60% at 50% 35%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(75% 60% at 50% 35%, #000 0%, transparent 75%)',
        }}
      />

      {/* gradient orbs */}
      <div className="absolute -left-24 top-8 size-80 rounded-full bg-sage-soft/20 blur-3xl animate-float-slow" />
      <div className="absolute -right-20 top-24 size-96 rounded-full bg-rose/25 blur-3xl animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-cream-deep blur-3xl" />

      {/* thin gold ring, slowly drifting */}
      <div className="absolute right-[12%] top-[18%] size-40 rounded-full border border-champagne/40 animate-drift-spin" />
      <div className="absolute left-[10%] bottom-[16%] size-24 rounded-full border border-sage-soft/40 animate-float-slow" />

      {/* small accent dots */}
      <span className="absolute left-[18%] top-[28%] size-2 rounded-full bg-champagne/70 animate-float-slower" />
      <span className="absolute right-[22%] bottom-[26%] size-1.5 rounded-full bg-sage-deep/50 animate-float-slow" />
      <span className="absolute right-[30%] top-[20%] size-1.5 rounded-full bg-rose/70 animate-float-slower" />
    </div>
  );
}
