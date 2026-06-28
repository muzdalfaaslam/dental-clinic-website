import { getIcon } from '@/components/ui/icon-registry';
import { GoldRule } from '@/components/ui/GoldRule';
import { StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { platformCatalog } from '@/config/content';

/**
 * "Everything Under One Roof" grid. Row 1 is the website & online booking group —
 * the main offer — rendered as a centered, highlighted accent card. The remaining
 * six groups sit below it, three to a row. Only group title + tagline + icon (plus
 * a few item names on the highlight) render here; the full catalog stays in config
 * for the sales team (brief §6 note, §9).
 */
export function PlatformGrid() {
  const [primary, ...rest] = platformCatalog;
  if (!primary) return null;
  const PrimaryIcon = getIcon(primary.icon);

  return (
    <div className="space-y-3">
      {/* Row 1 — the main offer, centered + highlighted accent card */}
      <StaggerGroup>
        <StaggerItem>
          <div className="group relative mx-auto max-w-2xl overflow-hidden rounded-lg border-2 border-champagne/60 bg-gradient-to-br from-cream to-cream-deep p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(94,107,82,0.16)] sm:p-9">
            {/* corner glow */}
            <div
              aria-hidden
              className="absolute -right-10 -top-10 size-32 rounded-full bg-champagne/15 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
            />
            <span className="inline-flex items-center gap-2 rounded-full bg-sage-deep px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-cream">
              Start here · our main offer
            </span>
            <div className="mt-5 flex flex-col items-center">
              <span
                aria-hidden
                className="inline-flex size-16 items-center justify-center rounded-full bg-cream ring-1 ring-inset ring-champagne/50 shadow-soft transition-transform duration-300 group-hover:scale-105"
              >
                <PrimaryIcon className="size-8 text-sage-deep" strokeWidth={1.5} />
              </span>
              <h4 className="mt-4 font-display text-2xl font-semibold text-sage-deep">
                {primary.title}
              </h4>
              <p className="mt-1 text-sm uppercase tracking-wider text-sage-soft">{primary.tagline}</p>
              <GoldRule className="mt-4" width="w-12" />
              <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-charcoal/75">
                {primary.items[0]?.desc}
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {primary.items.slice(1, 5).map((item) => (
                  <li
                    key={item.name}
                    className="rounded-full border border-line bg-cream/80 px-3 py-1 text-xs text-charcoal/70"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>

      {/* connector */}
      <div aria-hidden className="mx-auto h-6 w-px bg-line" />

      {/* Rows below — the rest, three to a row */}
      <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((group) => {
          const Icon = getIcon(group.icon);
          return (
            <StaggerItem key={group.title}>
              <div className="group flex h-full items-center gap-4 rounded-md border border-line bg-cream p-5 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-card">
                <span
                  aria-hidden
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-cream-deep ring-1 ring-inset ring-champagne/40 transition-colors duration-300 group-hover:bg-sage-deep"
                >
                  <Icon
                    className="size-5 text-sage-deep transition-colors duration-300 group-hover:text-cream"
                    strokeWidth={1.5}
                  />
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
    </div>
  );
}
