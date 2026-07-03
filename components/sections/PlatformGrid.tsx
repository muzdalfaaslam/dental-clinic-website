import { StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { platformCatalog } from '@/config/content';

/**
 * "Everything Under One Roof" — stripped to just the service names, no icons,
 * no featured card, no descriptions. A quiet list of what's possible, not a
 * sales pitch in itself (the platform.blurb above carries that).
 */
export function PlatformGrid() {
  return (
    <StaggerGroup className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5" stagger={0.04}>
      {platformCatalog.map((group) => (
        <StaggerItem key={group.title}>
          <span className="inline-flex rounded-full border border-line bg-cream px-4 py-2 text-[0.85rem] text-charcoal/80 transition-colors duration-200 hover:border-champagne/60 hover:text-sage-deep">
            {group.title}
          </span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
