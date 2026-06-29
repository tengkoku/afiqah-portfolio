import { Briefcase, MapPin, Calendar, Terminal } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Engineering Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
            Professional Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            I believe junior status is defined by years of experience, not by depth of rigor. Here are the product teams where I have shipped responsive interfaces, owned compliance, and squashed runtime memory leaks.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-10 group">
              {/* Timeline dot */}
              <span className="absolute left-[-9px] top-1 w-4 h-4 rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-900 transition-colors group-hover:scale-125 duration-300"></span>
              
              {/* Card Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Left meta (4 columns) */}
                <div className="lg:col-span-4 space-y-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Role & Position</span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100 leading-snug">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      San Francisco Bay Area (Hybrid)
                    </span>
                  </div>

                  {/* Core Stack */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Environment Stack</span>
                    <div className="flex flex-wrap gap-1">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right content (8 columns) */}
                <div className="lg:col-span-8 space-y-4">
                  {/* Scope description */}
                  <div className="border-b border-slate-200 dark:border-slate-800/80 pb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Ownership Scope</span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed mt-0.5">
                      <span className="text-slate-400 font-normal">Area: {exp.productArea}</span> — {exp.scope}
                    </p>
                  </div>

                  {/* Quantified Bullet Points */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Key Deliverables & Quantitative Outcomes</span>
                    <ul className="space-y-2.5">
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 items-start leading-relaxed">
                          <span className="text-emerald-500 font-bold font-mono mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
