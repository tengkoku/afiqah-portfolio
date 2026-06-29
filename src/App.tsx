import Header from './components/Header';
import Hero from './components/Hero';
import CaseStudies from './components/CaseStudies';
import CodePlayground from './components/CodePlayground';
import TechnicalNotes from './components/TechnicalNotes';
import InterestModule from './components/InterestModule';
import Experience from './components/Experience';
import ContactForm from './components/ContactForm';
import { ArrowUp, Terminal, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0A0A0A] text-neutral-800 dark:text-[#E5E5E5] selection:bg-emerald-500/30 transition-colors duration-300">
      
      {/* 1. Global Navigation Header */}
      <Header />

      {/* 2. Main Page Layout Sections */}
      <main className="relative">
        {/* Hero Landing Profile */}
        <Hero />
        
        {/* Collapsible Case Studies */}
        <CaseStudies />
        
        {/* Interactive Diagnostics Lab */}
        <CodePlayground />
        
        {/* Technical Cookbook Notes */}
        <TechnicalNotes />
        
        {/* Humanizing Botanical & Hike analogue module */}
        <InterestModule />
        
        {/* Experience Timeline */}
        <Experience />
        
        {/* Form and Contact Streams */}
        <ContactForm />
      </main>

      {/* 3. Visual Footer */}
      <footer className="bg-neutral-100 dark:bg-[#0A0A0A] border-t border-neutral-200 dark:border-[#2A2A2A] py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 dark:text-[#707070] font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>&copy; {new Date().getFullYear()} Afiqah. Mapped & Compiled with extreme rigor.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-emerald-500/80">// No metrics were faked.</span>
            <span className="text-slate-500">•</span>
            <span>A11y Compliant (WCAG 2.1 AA)</span>
          </div>
        </div>
      </footer>

      {/* 4. Smooth scroll back button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg z-40 transition-all duration-300 scale-100 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-500/20"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </button>
      )}

    </div>
  );
}

