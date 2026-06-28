'use client';

import { forwardRef, useId } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { form, footer } from '@/config/content';

/**
 * ⚠ Required TCPA consent (brief §7). Unchecked by default; the form cannot
 * submit until it's checked (enforced by the Zod `z.literal(true)`). Exact mandated
 * text comes from config and must not be altered. Privacy + terms are linked here.
 */
export const ConsentCheckbox = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
>(function ConsentCheckbox({ error, id: idProp, ...rest }, ref) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [privacy, terms] = footer.legal;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 rounded-sm border border-line bg-cream-deep/60 p-4 text-sm leading-relaxed text-charcoal/85"
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn('mt-0.5 size-4 shrink-0 accent-[rgb(94_107_82)]')}
          {...rest}
        />
        <span>
          {form.consent.text}{' '}
          <span className="text-charcoal/60">
            See our{' '}
            <Link href={privacy?.href ?? '/privacy'} className="underline decoration-champagne underline-offset-2 hover:text-charcoal">
              {privacy?.label ?? 'Privacy Policy'}
            </Link>{' '}
            and{' '}
            <Link href={terms?.href ?? '/terms'} className="underline decoration-champagne underline-offset-2 hover:text-charcoal">
              {terms?.label ?? 'Terms'}
            </Link>
            .
          </span>
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-accent-brand">
          {error}
        </p>
      )}
    </div>
  );
});
