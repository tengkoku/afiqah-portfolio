import { useState } from 'react';
import { techNotes } from '../data/portfolioData';
import { TechNote } from '../types';
import { BookOpen, Copy, Check, Filter, Cpu, Eye, Accessibility, Settings, Terminal } from 'lucide-react';

export default function TechnicalNotes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Notes', icon: BookOpen },
    { value: 'architecture', label: 'Architecture', icon: Settings },
    { value: 'performance', label: 'Performance', icon: Cpu },
    { value: 'accessibility', label: 'Accessibility', icon: Accessibility }
  ];

  const filteredNotes = selectedCategory === 'all'
    ? techNotes
    : techNotes.filter(n => n.category === selectedCategory);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedNoteId(id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  return (
    <section id="tech-notes" className="py-20 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Frontend Reference Ledger
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
            Technical Notes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Short notes on architecture, rendering performance, and web accessibility. I keep these recipes handy to solve common frontend bugs and avoid writing redundant component architectures.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.value}
                id={`cat-btn-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950/60'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Category Badge & Title */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    {note.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">Ready Snippet</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100 leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {note.description}
                  </p>
                </div>

                {/* Problem vs Solution Split */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide block">The Pitfall:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {note.problem}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block">The Correction:</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {note.solution}
                    </p>
                  </div>
                </div>

                {/* Code Block Container */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 font-mono text-[11px] leading-relaxed mt-4">
                  <div className="flex justify-between items-center bg-slate-900 px-4 py-2 border-b border-slate-800">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-emerald-400" /> React 19 / TS
                    </span>
                    <button
                      onClick={() => handleCopyCode(note.id, note.codeSnippet)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="Copy code block"
                    >
                      {copiedNoteId === note.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-slate-300 overflow-x-auto max-h-[220px] scrollbar-thin">
                    <code>{note.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-6 font-mono">
                // Resolves React warnings, memory spikes, & DOM errors
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
