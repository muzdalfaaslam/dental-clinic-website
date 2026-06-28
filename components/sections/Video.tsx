import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { VideoFrame } from '@/components/ui/VideoFrame';
import { AnimatedDemo } from '@/components/ui/AnimatedDemo';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { video } from '@/config/content';

/**
 * Section 2 — Video. Pulled up so most of it sits within the first screen, right
 * under the (compact) hero — no heading text above it; the video speaks for itself.
 * A single CTA sits directly below for people ready to act before scrolling.
 * Real video when supplied (config-driven); the animated demo fills the gap until
 * then. Brief §6/Section 2.
 */
export function Video() {
  return (
    <section className="relative z-10 -mt-6 pb-12 sm:-mt-8 lg:-mt-10 lg:pb-16">
      <Container className="flex flex-col items-center text-center">
        <ScrollReveal className="w-full">
          {video.src ? (
            <VideoFrame
              poster={video.poster}
              src={video.src}
              captionsSrc={video.captionsSrc || undefined}
              title={video.heading}
            />
          ) : (
            <AnimatedDemo />
          )}
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-5">
            <Button source="video" size="lg">
              {video.cta}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
