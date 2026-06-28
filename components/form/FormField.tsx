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

/* ── Select ────────────────────────────────────────────────────────────────── */
export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  placeholder?: string;
  options: readonly string[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, placeholder, options, className, id: idProp, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlBase, 'appearance-none pr-10')}
          defaultValue=""
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-sage-soft"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
});

/* ── Multi-select (checkbox group) ─────────────────────────────────────────── */
export interface CheckboxGroupProps {
  label: string;
  helper?: string;
  error?: string;
  options: readonly string[];
  /** props spread onto each checkbox (e.g. register('frustration')). */
  register: React.InputHTMLAttributes<HTMLInputElement>;
}

export function CheckboxGroup({ label, helper, error, options, register }: CheckboxGroupProps) {
  const id = useId();
  return (
    <fieldset
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
    >
      <legend className="text-sm font-medium text-charcoal">{label}</legend>
      {helper && (
        <p id={`${id}-helper`} className="mt-1 text-xs text-charcoal/55">
          {helper}
        </p>
      )}
      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-3 rounded-sm border border-line bg-cream px-3.5 py-2.5 text-sm text-charcoal transition-colors hover:border-sage-soft has-[:checked]:border-sage-soft has-[:checked]:bg-cream-deep"
          >
            <input
              type="checkbox"
              value={opt}
              className="size-4 shrink-0 accent-[rgb(94_107_82)]"
              {...register}
            />
            {opt}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-accent-brand">
          {error}
        </p>
      )}
    </fieldset>
  );
}
