import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { DesktopMockup } from '@/components/ui/DesktopMockup';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { TestimonialMarquee } from '@/components/ui/TestimonialMarquee';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { socialProof } from '@/config/content';

/**
 * Section 6 — Social proof. Pre-testimonial credibility + scarcity copy leads;
 * a before/after site slider in a phone frame carries the proof; testimonial
 * cards (built now, real data later, optional rose tint) round it out.
 * Brief §6/Section 6.
 */
export function SocialProof() {
  return (
    <section className="py-section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Credibility + scarcity */}
          <div className="max-w-xl">
            <ScrollReveal>
              <SectionLabel>{socialProof.eyebrow}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-4 text-h2 text-sage-deep text-balance">{socialProof.headline}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-body-lg leading-relaxed text-charcoal/80">
                {socialProof.credibility}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p className="mt-6 font-display text-h3 text-sage-deep">
                {socialProof.beforeAfterHeading}
              </p>
              <p className="mt-2 text-sm text-charcoal/60">{socialProof.beforeAfterNote}</p>
            </ScrollReveal>
          </div>

          {/* Device pair: desktop showing the before/after rebuild, with a phone in
              front showing a different clinic's design. */}
          <ScrollReveal delay={0.1}>
            <div className="relative pb-8 pr-8 sm:pb-0">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-2xl"
              />
              {/* desktop — drag-to-compare before/after */}
              <DesktopMockup className="w-full max-w-xl transition-transform duration-500 hover:-translate-y-1">
                <BeforeAfterSlider
                  before={socialProof.beforeAfter.before}
                  after={socialProof.beforeAfter.after}
                />
              </DesktopMockup>
              {/* phone — a different finished design, overlapping the front-right */}
              <div className="absolute -bottom-2 right-0 w-[34%] min-w-[7.5rem] max-w-[10rem] transition-transform duration-500 hover:-translate-y-1 sm:-bottom-6 sm:right-2">
                <PhoneMockup
                  src={socialProof.showcasePhone.src}
                  alt={socialProof.showcasePhone.alt}
                  className="w-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Testimonials — infinite-loop marquee (illustrative until real ones land) */}
        <ScrollReveal delay={0.05} className="mt-20">
          <TestimonialMarquee items={socialProof.testimonials} />
        </ScrollReveal>

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
