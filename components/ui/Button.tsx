'use client';

import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackCta } from '@/lib/analytics';
import { FORM_ANCHOR } from '@/config/content';

type Variant = 'primary' | 'ghost' | 'invert';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition-[transform,box-shadow,background-color,color] duration-200 ease-out ' +
  'will-change-transform select-none disabled:cursor-not-allowed disabled:opacity-60 ' +
  'motion-safe:hover:-translate-y-0.5 active:translate-y-0';

const variants: Record<Variant, string> = {
  // Sage fill, cream text, subtle gold ring edge (brief §5).
  primary:
    'bg-sage-deep text-cream shadow-soft ring-1 ring-inset ring-champagne/40 ' +
    'hover:bg-[rgb(82_94_72)] hover:shadow-card',
  ghost:
    'bg-transparent text-sage-deep ring-1 ring-inset ring-line hover:bg-cream-deep',
  // For placement on dark/sage backgrounds (footer): cream fill, sage text.
  invert:
    'bg-cream text-sage-deep shadow-soft ring-1 ring-inset ring-champagne/50 hover:bg-cream/90 hover:shadow-card',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Analytics source label for the cta_click event. */
  source?: string;
  /** Show the arrow (default true for primary). */
  withArrow?: boolean;
  /** Which side the arrow sits on (default right). */
  arrowSide?: 'left' | 'right';
}

interface LinkButtonProps extends CommonProps {
  /** Scroll target. Defaults to the single conversion anchor (#qualify). */
  href?: string;
  type?: never;
  onClick?: never;
  disabled?: never;
}

interface SubmitButtonProps extends CommonProps {
  /** Used by the form's own submit — renders a real <button>, never scrolls. */
  type: 'submit' | 'button';
  href?: never;
  disabled?: boolean;
  onClick?: () => void;
}

export type ButtonProps = LinkButtonProps | SubmitButtonProps;

/**
 * Every CTA points at the single conversion target (#qualify) and smooth-scrolls
 * to it, firing a `cta_click` analytics event tagged with its section source.
 * The one exception is the form's own submit (`type="submit"`). The word "Submit"
 * is never rendered — labels come from the approved CTA list in content.ts.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    source,
    withArrow,
    arrowSide = 'right',
  } = props;

  const showArrow = withArrow ?? variant === 'primary';
  const classes = cn(base, variants[variant], sizes[size], className);

  const arrow = showArrow ? (
    <ArrowRight
      aria-hidden
      className={cn(
        'size-4 transition-transform duration-200',
        arrowSide === 'right'
          ? 'motion-safe:group-hover:translate-x-0.5'
          : 'motion-safe:group-hover:-translate-x-0.5',
      )}
      strokeWidth={1.75}
    />
  ) : null;

  const content = (
    <>
      {arrowSide === 'left' && arrow}
      {children}
      {arrowSide === 'right' && arrow}
    </>
  );

  // Submit / action button — real <button>, no scroll.
  if ('type' in props && props.type) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        className={classes}
      >
        {content}
      </button>
    );
  }

  // Default: anchor that scrolls to the conversion target.
  const targetId = (props.href ?? `#${FORM_ANCHOR}`).replace(/^#/, '');
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (source) trackCta(source);
    const el = typeof document !== 'undefined' ? document.getElementById(targetId) : null;
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Move focus to the target for keyboard + screen-reader users.
      el.setAttribute('tabindex', '-1');
      (el as HTMLElement).focus({ preventScroll: true });
    }
  };

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={`#${targetId}`}
      onClick={handleClick}
      className={classes}
    >
      {content}
    </a>
  );
});
