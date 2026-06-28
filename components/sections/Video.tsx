import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { VideoFrame } from '@/components/ui/VideoFrame';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { video } from '@/config/content';

/**
 * Section 2 — Video. Short visual demo in an elegant frame, centered with
 * generous margins, single CTA directly below for people ready to act before
 * scrolling. Real video wired via config (video.src); ships with poster +
 * placeholder so launch isn't blocked. Brief §6/Section 2.
 */
export function Video() {
  return (
    <section className="py-section">
      <Container className="flex flex-col items-center text-center">
        <ScrollReveal>
          <SectionLabel className="justify-center">{video.eyebrow}</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl text-h2 text-sage-deep text-balance">{video.heading}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 max-w-xl text-body-lg text-charcoal/75">{video.blurb}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.12} className="mt-10 w-full">
          <VideoFrame
            poster={video.poster}
            src={video.src || undefined}
            captionsSrc={video.captionsSrc || undefined}
            title={video.heading}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="mt-8">
            <Button source="video" size="lg">
              {video.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
