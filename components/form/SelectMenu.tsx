'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Custom, on-brand dropdown (a combobox + listbox). The native <select> popup is
 * OS-rendered and can't be themed, so this replaces it with a cream panel, sage
 * hover, and a gold check on the selected option — matching the site. Fully
 * keyboard accessible (open/close, arrow/Home/End navigation, Enter/Escape) via
 * the aria-activedescendant pattern, and integrates with React Hook Form through
 * a Controller (value / onChange / onBlur). Brief §7, §10 a11y.
 */
export function SelectMenu({
  label,
  placeholder = 'Select one',
  options,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  placeholder?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((o) => o === value);

  // Open the panel and highlight the selected option (or the first).
  const openMenu = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };
  const closeMenu = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  const choose = (i: number) => {
    const opt = options[i];
    if (opt !== undefined) onChange(opt);
    closeMenu();
    onBlur?.();
  };

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onBlur]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`);
    el?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) openMenu();
        else setActive((a) => Math.min(a + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openMenu();
        else setActive((a) => Math.max(a - 1, 0));
        break;
      case 'Home':
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case 'End':
        if (open) {
          e.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) openMenu();
        else choose(active);
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          closeMenu();
        }
        break;
      case 'Tab':
        if (open) setOpen(false);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-1.5" ref={rootRef}>
      <span id={labelId} className="text-sm font-medium text-charcoal">
        {label}
      </span>

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${id}-value`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-activedescendant={open ? optionId(active) : undefined}
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={onKeyDown}
          onBlur={(e) => {
            // Fire RHF blur only when focus leaves the whole control.
            if (!rootRef.current?.contains(e.relatedTarget as Node)) onBlur?.();
          }}
          className={cn(
            'flex w-full items-center justify-between rounded-sm border bg-cream px-4 py-3 text-left text-base shadow-[inset_0_1px_2px_rgba(46,42,38,0.03)] transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-sage-deep/30',
            error ? 'border-accent-brand' : 'border-line focus:border-sage-soft',
          )}
        >
          <span id={`${id}-value`} className={cn(value ? 'text-charcoal' : 'text-charcoal/40')}>
            {value || placeholder}
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              'size-5 shrink-0 text-sage-soft transition-transform duration-200',
              open && 'rotate-180',
            )}
            strokeWidth={1.5}
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            className="absolute z-30 mt-1.5 max-h-60 w-full overflow-auto rounded-md border border-line bg-cream p-1 shadow-card focus:outline-none"
          >
            {options.map((opt, i) => {
              const selected = opt === value;
              const isActive = i === active;
              return (
                <li
                  key={opt}
                  id={optionId(i)}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-2 rounded-sm px-3.5 py-2.5 text-[0.95rem] transition-colors',
                    isActive ? 'bg-cream-deep text-sage-deep' : 'text-charcoal',
                    selected && 'font-medium text-sage-deep',
                  )}
                >
                  {opt}
                  {selected && <Check className="size-4 text-champagne" strokeWidth={2} />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-accent-brand">
          {error}
        </p>
      )}
    </div>
  );
}
