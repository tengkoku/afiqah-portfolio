import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // 1. Initial check (localStorage, system preference, default dark)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemDark ? 'dark' : 'light';
    }
    return 'dark'; // Default to a gorgeous dark theme
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm group hover:scale-105"
      aria-label={`Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-400 animate-in fade-in zoom-in spin-in-45 duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 animate-in fade-in zoom-in spin-in-45 duration-300" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
