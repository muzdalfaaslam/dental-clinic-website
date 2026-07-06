/** Thin top-of-flow progress bar, shared by the quiz funnel and the qualify flow. */
export function StepProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-1 w-full bg-cream-deep">
      <div
        className="h-full bg-sage-deep transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
