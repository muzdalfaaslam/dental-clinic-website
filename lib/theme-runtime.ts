/**
 * Client-side theme switching. Sets/clears CSS custom properties as inline
 * styles on <html> — inline styles win over the server-injected <style> block
 * from theme.ts, so this repaints the entire page instantly with zero
 * component changes (every component already reads colors via
 * `rgb(var(--color-x))`). Session-only: nothing persists across a reload.
 */
export function applyThemeVars(vars: Record<string, string>): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

export function resetThemeVars(vars: Record<string, string>): void {
  const root = document.documentElement;
  for (const key of Object.keys(vars)) {
    root.style.removeProperty(key);
  }
}
