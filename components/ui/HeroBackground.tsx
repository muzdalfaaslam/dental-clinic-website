/**
 * Minimal, on-brand hero backdrop. Echoes the reference layout's clean cream field
 * with a single thin "topographic" line motif drawn across it — rendered here as
 * soft, elegant flowing curves in sage/champagne rather than a hard mountain peak,
 * plus two very faint orbs for warmth. Purely decorative (aria-hidden); ambient
 * motion is disabled under prefers-reduced-motion. (brief §5: whitespace, thin
 * sage/gold rules, calm.)
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* faint warm orbs */}
      <div className="absolute -left-32 top-10 size-80 rounded-full bg-sage-soft/12 blur-3xl animate-float-slow" />
      <div className="absolute -right-28 top-24 size-96 rounded-full bg-rose/14 blur-3xl animate-float-slower" />

      {/* thin flowing line motif spanning the hero */}
      <svg
        className="absolute inset-x-0 top-1/2 h-[120%] w-full -translate-y-1/2"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-50 360 C 320 180, 560 180, 720 300 S 1140 460, 1490 240"
          stroke="rgb(var(--color-sage-soft) / 0.35)"
          strokeWidth="1"
        />
        <path
          d="M-50 420 C 300 300, 600 300, 760 380 S 1180 500, 1490 320"
          stroke="rgb(var(--color-champagne) / 0.3)"
          strokeWidth="1"
        />
      </svg>

      {/* a couple of soft accent dots */}
      <span className="absolute left-[16%] top-[30%] size-1.5 rounded-full bg-champagne/60 animate-float-slower" />
      <span className="absolute right-[18%] top-[26%] size-1.5 rounded-full bg-sage-deep/40 animate-float-slow" />
    </div>
  );
}
