import { Container } from '@/components/ui/Container';
import { InlineTextCta } from '@/components/ui/InlineTextCta';
import { VideoFrame } from '@/components/ui/VideoFrame';
import { AnimatedDemo } from '@/components/ui/AnimatedDemo';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { video, quiz } from '@/config/content';

/**
 * Section 2 — Video. Sits right under the trust badges, under the (compact)
 * hero — no heading text above it; the video speaks for itself. The bold CTA
 * directly below is the fast path into the one-question-at-a-time /quiz
 * funnel, for people who don't want to scroll to the long form.
 * Real video when supplied (config-driven); the animated demo fills the gap
 * until then. Brief §6/Section 2.
 */
export function Video() {
  return (
    <section className="relative z-10 pb-12 lg:pb-16">
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
            <InlineTextCta href="/quiz" source="video" variant="bold">
              {quiz.entryCta}
            </InlineTextCta>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}