import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { DesktopMockup } from '@/components/ui/DesktopMockup';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { socialProof } from '@/config/content';

/**
 * Section 6 — Social proof. Credibility + scarcity copy leads; the proof itself
 * is one rebuild shown big on both a desktop screen and a phone, each a
 * drag-to-compare before/after slider. Brief §6/Section 6.
 */
export function SocialProof() {
  return (
    <section className="py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel className="justify-center">{socialProof.eyebrow}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-4 text-h2 text-sage-deep text-balance">{socialProof.headline}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-body-lg leading-relaxed text-charcoal/80">{socialProof.credibility}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mt-6 font-display text-h3 text-sage-deep">{socialProof.beforeAfterHeading}</p>
            <p className="mt-2 text-sm text-charcoal/60">{socialProof.beforeAfterNote}</p>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          {/* desktop — big, drag-to-compare */}
          <ScrollReveal delay={0.1}>
            <DesktopMockup className="w-full transition-transform duration-500 hover:-translate-y-1">
              <BeforeAfterSlider
                before={socialProof.beforeAfter.desktop.before}
                after={socialProof.beforeAfter.desktop.after}
              />
            </DesktopMockup>
          </ScrollReveal>

          {/* mobile — big, drag-to-compare */}
          <ScrollReveal delay={0.15}>
            <PhoneMockup className="mx-auto w-full max-w-[15rem] transition-transform duration-500 hover:-translate-y-1">
              <BeforeAfterSlider
                before={socialProof.beforeAfter.mobile.before}
                after={socialProof.beforeAfter.mobile.after}
              />
            </PhoneMockup>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.05}>
          <div className="mt-14 flex justify-center">
            <Button source="social_proof" size="lg">
              {socialProof.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
