import ThemeToggle from './ThemeToggle';
import { Menu, X, Terminal, Compass, Target, BookOpen, Briefcase, Mail } from 'lucide-react';
import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Case Studies', href: '#case-studies', icon: Target },
    { label: 'Diagnostic Lab', href: '#diagnostic-lab', icon: Terminal },
    { label: 'Technical Notes', href: '#tech-notes', icon: BookOpen },
    { label: 'Hikes & Botany', href: '#hobbies', icon: Compass },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Contact', href: '#contact', icon: Mail }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-neutral-200 dark:border-[#2A2A2A] transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Console Prompt */}
        <a 
          href="#" 
          className="flex flex-col group py-1"
        >
          <span className="text-lg font-serif italic text-neutral-900 dark:text-white tracking-tight transition-colors group-hover:text-emerald-500 dark:group-hover:text-[#4CAF50]">Afiqah</span>
          <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 dark:text-[#A0A0A0] font-semibold">// Systems Thinker</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-[#A0A0A0] hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </a>
            );
          })}
          <div className="w-px h-4 bg-neutral-200 dark:bg-[#2A2A2A]"></div>
          <ThemeToggle />
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav className="md:hidden glass border-b border-neutral-200 dark:border-[#2A2A2A] p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-250">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-[#A0A0A0] hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <Icon className="w-4 h-4 text-emerald-500" />
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
