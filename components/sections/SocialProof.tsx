import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
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

          {/* 3D phone pair: a finished design behind, the before/after slider in front */}
          <ScrollReveal delay={0.1}>
            <div className="perspective-1000 relative">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-2xl"
              />
              <div className="relative flex items-center justify-center">
                {/* back phone — a second finished design (hidden on the smallest screens) */}
                <div className="phone-3d phone-3d-left relative z-0 hidden -mr-12 opacity-95 sm:block">
                  <PhoneMockup
                    src={socialProof.showcasePhone.src}
                    alt={socialProof.showcasePhone.alt}
                    className="w-[clamp(12rem,40vw,15rem)]"
                  />
                </div>
                {/* front phone — interactive before/after */}
                <div className="phone-3d phone-3d-right relative z-10">
                  <PhoneMockup>
                    <BeforeAfterSlider
                      before={socialProof.beforeAfter.before}
                      after={socialProof.beforeAfter.after}
                    />
                  </PhoneMockup>
                </div>
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
