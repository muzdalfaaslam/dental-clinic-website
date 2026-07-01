import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FeatureTile } from '@/components/ui/FeatureTile';
import { GoldRule } from '@/components/ui/GoldRule';
import { ScrollReveal, StaggerGroup, StaggerItem } from '@/components/layout/ScrollReveal';
import { PlatformGrid } from './PlatformGrid';
import { whatWeBuild } from '@/config/content';

/**
 * Section 4 — What we build. The website as the hero deliverable (six feature
 * tiles), then the "Everything Under One Roof" platform showcase + upsell seed
 * line. CTA kept un-buried with its own breathing room. Brief §6/Section 4.
 */
export function WhatWeBuild() {
  return (
    <section className="py-section">
      <Container>
        {/* Website features */}
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{whatWeBuild.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep text-balance">{whatWeBuild.headline}</h2>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeBuild.features.map((f) => (
            <StaggerItem key={f.label}>
              <FeatureTile icon={f.icon} label={f.label} desc={f.desc} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Platform showcase */}
        <div className="mt-20 rounded-lg border border-line bg-cream-deep/50 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <SectionLabel className="justify-center">{whatWeBuild.platform.eyebrow}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h3 className="mt-4 text-h3 text-sage-deep sm:text-h2">
                {whatWeBuild.platform.heading}
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p className="mt-3 text-body-lg text-charcoal/75">{whatWeBuild.platform.blurb}</p>
            </ScrollReveal>
          </div>

          <div className="mt-10">
            <PlatformGrid />
          </div>

          <ScrollReveal delay={0.05}>
            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center">
              <GoldRule width="w-12" />
              <p className="text-body-lg italic text-charcoal/80">
                {whatWeBuild.platform.upsellSeed}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA — un-buried */}
        <ScrollReveal delay={0.05}>
          <div className="mt-12 flex justify-center">
            <Button source="what_we_build" size="lg">
              {whatWeBuild.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
