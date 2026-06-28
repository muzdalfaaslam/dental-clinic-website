import { getIcon } from '@/components/ui/icon-registry';
import { StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { platformCatalog } from '@/config/content';

/**
 * "Everything Under One Roof" — a calm, high-level icon grid of the seven platform
 * module groups. Only group title + tagline + icon render here; the full catalog
 * stays in config for the sales team (brief §6 note, §9). Visual, not a price list.
 */
export function PlatformGrid() {
  return (
    <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {platformCatalog.map((group) => {
        const Icon = getIcon(group.icon);
        return (
          <StaggerItem key={group.title}>
            <div className="flex h-full items-center gap-4 rounded-md border border-line bg-cream p-5 transition-shadow duration-300 hover:shadow-soft">
              <span
                aria-hidden
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-cream-deep ring-1 ring-inset ring-champagne/40"
              >
                <Icon className="size-5 text-sage-deep" strokeWidth={1.5} />
              </span>
              <div>
                <h4 className="font-display text-base font-medium text-charcoal">{group.title}</h4>
                <p className="text-sm text-charcoal/60">{group.tagline}</p>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
