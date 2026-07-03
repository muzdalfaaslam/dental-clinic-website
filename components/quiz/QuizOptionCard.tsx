'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * One selectable option, shared by single- and multi-select quiz steps.
 * Visually matches ProblemBlock's sage/champagne toggle-card language.
 */
export function QuizOptionCard({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group flex w-full items-center gap-3 rounded-md border p-4 text-left transition-all duration-200',
        active
          ? 'border-sage-deep/50 bg-sage-deep/6 shadow-soft'
          : 'border-line bg-cream shadow-soft hover:border-champagne/50 hover:shadow-card',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'inline-flex size-6 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition-colors duration-200',
          active ? 'bg-sage-deep text-cream ring-sage-deep' : 'text-cream ring-champagne/40',
        )}
      >
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
      <span className={cn('text-[0.95rem]', active ? 'font-medium text-sage-deep' : 'text-charcoal/85')}>
        {label}
      </span>
    </button>
  );
}
