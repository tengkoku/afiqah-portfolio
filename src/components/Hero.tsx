import React, { useState } from 'react';
import { Briefcase, Mail, Menu, X, Terminal, BookOpen, Compass, Linkedin, Github } from 'lucide-react';
import { useMemo } from 'react';
import { developerProfile as developerProfileData } from '../data/portfolioData';

const navItems = [
  { label: 'Diagnostic Lab', href: '#diagnostic-lab', icon: Terminal },
  { label: 'Technical Notes', href: '#tech-notes', icon: BookOpen },
  { label: 'Interest & Hobby', href: '#hobbies', icon: Compass },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  // { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const developerProfile = useMemo(() => developerProfileData, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <span className="text-white text-2xl font-playfair italic select-none">{developerProfile.name}</span>

        {/* Center pill — desktop */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-2 items-center gap-1">
          {/* <button className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-white/20 transition-colors">
            {developerProfile.name}
          </button> */}
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium text-white/70 hover:bg-white/20 hover:text-white'}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-md flex flex-col gap-4 p-8 pt-20 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-white/80 hover:text-white text-base font-medium flex items-center gap-3 py-2 border-b border-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero section — fully transparent, bg comes from global fixed layer */}
      <section
        id="home"
        className="relative w-full"
        style={{ height: '100dvh' }}
      >
        {/* Heading */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 z-20">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              {developerProfile.role}
            </span>
          </h1>

          <p className="text-white text-lg md:text-xl font-light max-w-[720px] mt-6 leading-relaxed hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
            {developerProfile.tagline}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-2 mt-10 items-center"
            style={{ animationDelay: '0.7s' }}
          >
            <a
              href={`mailto:${developerProfile.contact.email}`}
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400" /> {developerProfile.contact.email}
            </a>
            <span className="hidden sm:inline text-neutral-300 dark:text-[#2A2A2A]">|</span>
            <a
              href={`https://${developerProfile.contact.linkedin}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-400" /> LinkedIn
            </a>
            <span className="hidden sm:inline text-neutral-300 dark:text-[#2A2A2A]">|</span>
            <a
              href={`https://${developerProfile.contact.github}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-neutral-400" /> GitHub
            </a>
          </div>
        </div>

        {/* Bottom-left paragraph */}
        {/* <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-20 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/70 leading-relaxed">
            Building resilient, high-fidelity interfaces that don't crack under the pressure of messy data, state cycles, or screen readers.
          </p>
        </div> */}

        {/* Bottom-right block */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-20 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            This portfolio lets you focus on what sits beneath
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none hero-anim hero-fade"
          style={{ animationDelay: '1.1s' }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">scroll</span>
          <div className="relative w-px h-12 bg-white/10 overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full scroll-trace" />
          </div>
        </div>
      </section>
    </>
  );
}
