import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FeaturePointerMockup } from '@/components/ui/FeaturePointerMockup';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { whatWeBuild } from '@/config/content';

/**
 * Section 4 — What we build. The website as the hero deliverable, shown as an
 * interactive screen mockup with animated feature pointers. The platform
 * showcase + theme switcher live in their own combined section right after
 * (see PlatformThemeShowcase). Brief §6/Section 4.
 */
export function WhatWeBuild() {
  return (
    <section className="py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center" lines={['YOUR NEW WEBSITE,', 'DONE FOR YOU']} />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep text-balance">{whatWeBuild.headline}</h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.08}>
          <div className="mt-10">
            <FeaturePointerMockup features={whatWeBuild.features} />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
