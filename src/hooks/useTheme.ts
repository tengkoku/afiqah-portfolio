import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'portfolio-theme';

const getIsDark = () => document.documentElement.classList.contains('dark');

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

/** Reads the `dark` class on <html> (set before paint by the inline script in index.html). */
export function useIsDark() {
  return useSyncExternalStore(subscribe, getIsDark, () => true);
}

export function toggleTheme() {
  const dark = !getIsDark();
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  } catch {
    // storage unavailable (private mode) — theme still applies for this visit
  }
}
