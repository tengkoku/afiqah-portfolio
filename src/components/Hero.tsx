import React from 'react';
import { ArrowUpRight, ArrowDown, Mail, Linkedin, Github, ChevronRight, MapPin, Code, Cpu, Award } from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

export default function Hero() {
  const handleScrollToWork = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative py-24 sm:py-32 bg-neutral-50 dark:bg-[#0A0A0A] transition-colors overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,42,42,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,42,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(42,42,42,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,42,0.25)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#4CAF50]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy (Span 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Status indicators */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse"></span>
                {developerProfile.role}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-neutral-100 dark:bg-[#151515] text-neutral-600 dark:text-[#A0A0A0] border border-neutral-200 dark:border-[#2A2A2A]">
                <MapPin className="w-3 h-3 text-neutral-400" />
                {developerProfile.location}
              </span>
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-white dark:to-[#A0A0A0] font-serif italic">{developerProfile.name}</span>
            </h1>

            {/* Descriptive Lane Statement */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-[#E5E5E5] leading-relaxed font-sans max-w-xl">
              {developerProfile.tagline} <span className="text-neutral-900 dark:text-white font-medium">{developerProfile.lane}</span>
            </p>

            {/* Micro-Bio / Philosophical Pitch */}
            <div className="border-l-2 border-neutral-300 dark:border-[#2A2A2A] pl-4 py-1.5 max-w-lg text-xs sm:text-sm text-neutral-500 dark:text-[#A0A0A0] leading-relaxed italic font-serif">
              "{developerProfile.bio}"
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-[#707070]">
              <a
                href={`mailto:${developerProfile.contact.email}`}
                className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#4CAF50]" /> {developerProfile.contact.email}
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

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleScrollToWork}
                className="px-6 py-3 bg-[#121212] dark:bg-[#151515] hover:bg-neutral-800 dark:hover:bg-[#1E1E1E] text-white border border-neutral-800 dark:border-[#2A2A2A] hover:border-neutral-600 dark:hover:border-white transition-all font-mono uppercase tracking-widest text-[11px] rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                Explore Selected Work 
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#diagnostic-lab"
                className="px-6 py-3 border border-neutral-200 dark:border-[#2A2A2A] hover:border-neutral-400 dark:hover:border-white text-neutral-600 dark:text-[#A0A0A0] hover:text-neutral-900 dark:hover:text-white font-mono uppercase tracking-widest text-[11px] rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Run Debugger Lab <ArrowDown className="w-3.5 h-3.5 animate-pulse" />
              </a>
            </div>

          </div>

          {/* Right Column - Strongest Work Highlight Board (Span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-[#121212] p-6 rounded-xl border border-neutral-200 dark:border-[#2A2A2A] shadow-xl space-y-6 text-[#E5E5E5]">
              
              {/* Card Label */}
              <div className="flex justify-between items-center border-b border-neutral-200 dark:border-[#2A2A2A] pb-3">
                <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-[#707070] uppercase tracking-widest flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#4CAF50]" /> Strongest Work Highlight
                </span>
                <span className="text-[9px] font-mono uppercase bg-[#4CAF50]/10 text-[#4CAF50] px-2 py-0.5 rounded font-bold border border-[#4CAF50]/20">
                  96% Audit
                </span>
              </div>

              {/* Work summary snippet */}
              <div className="space-y-1">
                <h4 className="font-serif italic text-base text-white">
                  E-Commerce Funnel State Rewrite
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Rewrote legacy cart checkout step machines. Added robust submission locks and layout guardrails to stop Accidental Double Billings.
                </p>
              </div>

              {/* Side-by-side metric badges */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3 rounded-lg bg-[#1A1A1A] border border-neutral-200 dark:border-[#2A2A2A] hover:border-neutral-300 dark:hover:border-neutral-600 transition-all space-y-1">
                  <span className="text-[9px] text-neutral-400 dark:text-[#707070] block font-mono">BILLING ERRORS</span>
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-neutral-500 text-xs line-through">1.4%</span>
                    <span className="text-[#4CAF50] font-bold text-sm">0.0%</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1A1A1A] border border-neutral-200 dark:border-[#2A2A2A] hover:border-neutral-300 dark:hover:border-neutral-600 transition-all space-y-1">
                  <span className="text-[9px] text-neutral-400 dark:text-[#707070] block font-mono">LAYOUT SHIFT (CLS)</span>
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-neutral-500 text-xs line-through">0.34</span>
                    <span className="text-[#4CAF50] font-bold text-sm">0.01</span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Code line */}
              <div className="bg-black text-[#A0A0A0] p-3 rounded-lg border border-neutral-200 dark:border-[#2A2A2A] font-mono text-[10px] leading-relaxed">
                <div className="text-neutral-600">// Preventing un-debounced duplicate state calls</div>
                <div className="text-[#4CAF50]">const <span className="text-neutral-300">lockSubmission</span> = <span className="text-indigo-400">useRef</span>(false);</div>
                <div><span className="text-indigo-400">if</span> (lockSubmission.current) <span className="text-indigo-400">return</span>;</div>
              </div>

              {/* Link button */}
              <a
                href="#case-studies"
                className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] hover:text-white flex items-center justify-end gap-1 group"
              >
                Read Full Decision Breakdown 
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
