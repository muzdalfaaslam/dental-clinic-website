'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

/* ── Shared field shell: label, control, accessible error ──────────────────── */
function FieldShell({
  id,
  label,
  error,
  optional,
  helper,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  helper?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
        {optional && <span className="ml-1 font-normal text-charcoal/45">(optional)</span>}
      </label>
      {helper && (
        <p id={helperId} className="text-xs text-charcoal/55">
          {helper}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-accent-brand">
          {error}
        </p>
      )}
    </div>
  );
}

const controlBase =
  'w-full rounded-sm border border-line bg-cream px-4 py-3 text-base text-charcoal ' +
  'placeholder:text-charcoal/40 shadow-[inset_0_1px_2px_rgba(46,42,38,0.03)] ' +
  'transition-colors focus:border-sage-soft focus:outline-none focus:ring-2 focus:ring-sage-deep/30 ' +
  'aria-[invalid=true]:border-accent-brand';

/* ── Text input ────────────────────────────────────────────────────────────── */
export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, optional, className, id: idProp, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell id={id} label={label} error={error} optional={optional} className={className}>
      <input
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlBase}
        {...rest}
      />
    </FieldShell>
  );
});

