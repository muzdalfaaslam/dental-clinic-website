import { cn } from '@/lib/utils';
import { getIcon, type IconKey } from './icon-registry';

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
    <div className={cn('group flex cursor-default items-start gap-3', className)}>
      <span
        aria-hidden
        className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-sage-deep/8 ring-1 ring-inset ring-sage-deep/15 transition-colors duration-200 group-hover:bg-sage-deep"
      >
        <Icon className="size-4 text-sage-deep transition-colors duration-200 group-hover:text-cream" strokeWidth={1.5} />
      </span>
      <div>
        <p className="text-[0.9rem] font-medium leading-snug text-charcoal transition-colors duration-200 group-hover:text-sage-deep">{label}</p>
        {desc && <p className="mt-0.5 text-xs leading-snug text-charcoal/55 transition-colors duration-200 group-hover:text-charcoal/80">{desc}</p>}
      </div>
    </div>
  );
}
