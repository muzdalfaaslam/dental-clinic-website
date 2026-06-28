import { cn } from '@/lib/utils';
import { getIcon, type IconKey } from './icon-registry';

/**
 * Soft feature tile — thin sage line icon in a gold-ringed chip, label, optional
 * one-line description. Rounded card, soft shadow (brief §5 component checklist).
 */
export function FeatureTile({
  icon,
  label,
  desc,
  className,
}: {
  icon: IconKey;
  label: string;
  desc?: string;
  className?: string;
}) {
  const Icon = getIcon(icon);
  return (
    <div
      className={cn(
        'group flex h-full flex-col gap-4 rounded-md border border-line bg-cream p-6 shadow-soft ' +
          'transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-card',
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-flex size-12 items-center justify-center rounded-full bg-cream-deep ring-1 ring-inset ring-champagne/40 transition-colors duration-300 group-hover:bg-sage-deep"
      >
        <Icon
          className="size-6 text-sage-deep transition-colors duration-300 group-hover:text-cream"
          strokeWidth={1.5}
        />
      </span>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-medium text-charcoal">{label}</h3>
        {desc && <p className="text-sm leading-relaxed text-charcoal/70">{desc}</p>}
      </div>
    </div>
  );
}
