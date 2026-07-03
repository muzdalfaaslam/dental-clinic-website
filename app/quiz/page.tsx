import type { Metadata } from 'next';
import { QuizFlow } from '@/components/quiz/QuizFlow';
import { quiz } from '@/config/content';

/**
 * The fast, one-question-at-a-time path linked from the Hero's secondary CTA.
 * Not indexed — this is a funnel page, not a search-facing one.
 */
export const metadata: Metadata = {
  title: quiz.metaTitle,
  robots: { index: false, follow: false },
};

export default function QuizPage() {
  return <QuizFlow />;
}
