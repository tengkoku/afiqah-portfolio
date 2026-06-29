import { useState } from 'react';
import { caseStudies } from '../data/portfolioData';
import { CaseStudy } from '../types';
import { ArrowUpRight, CheckCircle, Flame, ShieldAlert, Target, Award, Terminal, Code } from 'lucide-react';

export default function CaseStudies() {
  const [activeCaseId, setActiveCaseId] = useState<string>(caseStudies[0].id);
  const activeCase = caseStudies.find(c => c.id === activeCaseId) || caseStudies[0];

  return (
    <section id="case-studies" className="py-20 bg-neutral-50 dark:bg-[#0A0A0A] border-t border-neutral-200 dark:border-[#2A2A2A] transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20 mb-4">
            <Target className="w-3 h-3" />
            Selected Work & Real-World Ownership
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-neutral-900 dark:text-white tracking-tight">
            Ownership & Trade-offs
          </h2>
          <p className="text-neutral-500 dark:text-[#A0A0A0] mt-3 text-xs sm:text-sm leading-relaxed">
            I don’t just execute Jira tickets. I own full layouts, weigh product trade-offs, and run high-latency stress audits to ensure my code stays unbroken. Here is a breakdown of what I built, why I built it that way, and how I audited its quality.
          </p>
        </div>

        {/* Project Selector Toggles */}
        <div className="flex border-b border-neutral-200 dark:border-[#2A2A2A] mb-10 overflow-x-auto scrollbar-none">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              id={`tab-cs-${study.id}`}
              onClick={() => setActiveCaseId(study.id)}
              className={`pb-4 px-6 text-xs font-mono uppercase tracking-widest border-b-2 transition-all relative whitespace-nowrap cursor-pointer ${
                activeCaseId === study.id
                  ? 'border-[#4CAF50] text-[#4CAF50]'
                  : 'border-transparent text-neutral-400 dark:text-[#707070] hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {study.title}
              {activeCaseId === study.id && (
                <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#4CAF50] animate-in fade-in duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* Active Case Study Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Main Details (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Title & Metadata */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-[#707070]">
                <span>{activeCase.role}</span>
                <span>•</span>
                <span>{activeCase.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif italic text-neutral-900 dark:text-white">
                {activeCase.title}
              </h3>
              <p className="text-neutral-500 dark:text-[#A0A0A0] text-xs sm:text-sm leading-relaxed">
                {activeCase.subtitle}
              </p>
            </div>

            {/* Core Summary */}
            <div className="p-5 rounded-xl bg-neutral-100 dark:bg-[#121212] border border-neutral-200 dark:border-[#2A2A2A] text-xs sm:text-sm leading-relaxed text-neutral-650 dark:text-[#E5E5E5]">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-900 dark:text-white block mb-2 font-semibold">The Problem Context:</span>
              {activeCase.summary}
            </div>

            {/* Ownership Checklist */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-900 dark:text-white">
                What I Owned & Implemented:
              </h4>
              <ul className="space-y-3">
                {activeCase.ownership.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-xs sm:text-sm text-neutral-600 dark:text-[#A0A0A0] items-start leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decision & Trade-offs Matrix */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#4CAF50]" /> Key Architectural Choices:
              </h4>
              <div className="space-y-4">
                {activeCase.decisions.map((dec, idx) => (
                  <div
                    key={idx}
                    className="border border-neutral-200 dark:border-[#2A2A2A] rounded-xl p-5 space-y-3 bg-[#121212] shadow-sm text-[#E5E5E5]"
                  >
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-rose-450 dark:text-rose-400 font-bold">The Situation:</span>
                      <p className="text-xs text-neutral-300 mt-1">{dec.situation}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-450 dark:text-amber-400 font-bold">The Trade-off considered:</span>
                      <p className="text-xs text-neutral-450 dark:text-neutral-400 mt-1">{dec.tradeoff}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-[#2A2A2A] mt-2">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#4CAF50] font-bold">My Decision:</span>
                        <p className="text-xs text-white mt-0.5 font-semibold">{dec.choice}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Product & Tech Rationale:</span>
                        <p className="text-xs text-neutral-450 dark:text-[#A0A0A0] mt-0.5">{dec.why}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Metrics & Quality Assurance (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Real Impact Metrics Card */}
            <div className="bg-[#121212] text-[#E5E5E5] rounded-xl p-6 border border-neutral-200 dark:border-[#2A2A2A] space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-neutral-200 dark:border-[#2A2A2A] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4CAF50] font-semibold">Performance Audits</span>
                <Award className="w-4 h-4 text-[#4CAF50] animate-pulse" />
              </div>
              
              <div className="space-y-4">
                {activeCase.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs text-neutral-450 dark:text-[#A0A0A0] font-sans block leading-snug">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-right">
                      <span className="text-neutral-500 dark:text-[#707070] line-through">{metric.before}</span>
                      <span className="text-[#4CAF50] font-bold bg-[#4CAF50]/10 px-2 py-0.5 rounded border border-[#4CAF50]/20">
                        {metric.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-[#2A2A2A]">
                <div className="text-[10px] text-neutral-400 dark:text-[#A0A0A0] leading-relaxed">
                  <strong>Outcome Statement:</strong> {activeCase.impactSummary}
                </div>
              </div>
            </div>

            {/* Quality Check / Testing Logs */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-[#4CAF50]" /> How I Checked Quality:
              </h4>
              
              <div className="space-y-4">
                {activeCase.qualityChecks.map((check, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#121212] border border-neutral-200 dark:border-[#2A2A2A] space-y-2.5 text-[#E5E5E5]"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-xs font-serif italic text-white">
                        {check.method}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {check.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono bg-[#1A1A1A] text-neutral-450 dark:text-[#A0A0A0] px-2 py-0.5 rounded border border-neutral-200 dark:border-[#2A2A2A]">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-neutral-400 dark:text-[#A0A0A0] leading-relaxed">
                      <strong>Result:</strong> {check.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-[#707070] font-semibold">Engineered With:</div>
              <div className="flex flex-wrap gap-1.5">
                {activeCase.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#4CAF50]/5 dark:bg-[#4CAF50]/10 text-neutral-700 dark:text-[#4CAF50] rounded-lg border border-[#4CAF50]/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
