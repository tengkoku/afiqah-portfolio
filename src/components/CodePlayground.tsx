import { useState, useEffect, useRef } from 'react';
import { Play, Sparkles, RefreshCw, Eye, EyeOff, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';

export default function CodePlayground() {
  const [activeTab, setActiveTab] = useState<'debounce' | 'accessibility' | 'errors' | 'renders'>('debounce');

  // Debounce Simulator State
  const [rawInput, setRawInput] = useState('');
  const [rawCount, setRawCount] = useState(0);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [debouncedCount, setDebouncedCount] = useState(0);
  const [debounceLogs, setDebounceLogs] = useState<{ id: number; type: 'raw' | 'debounced'; char: string; time: string }[]>([]);
  const logIdRef = useRef(0);

  // Debounce logic
  useEffect(() => {
    if (rawInput === '') {
      return;
    }
    // Increment raw key count
    setRawCount(prev => prev + 1);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const lastChar = rawInput.slice(-1);
    
    setDebounceLogs(prev => [
      { id: logIdRef.current++, type: 'raw', char: lastChar, time },
      ...prev.slice(0, 7)
    ]);

    const handler = setTimeout(() => {
      setDebouncedValue(rawInput);
      setDebouncedCount(prev => prev + 1);
      setDebounceLogs(prev => [
        { id: logIdRef.current++, type: 'debounced', char: rawInput, time },
        ...prev.slice(0, 7)
      ]);
    }, 400);

    return () => clearTimeout(handler);
  }, [rawInput]);

  const clearDebounce = () => {
    setRawInput('');
    setRawCount(0);
    setDebouncedValue('');
    setDebouncedCount(0);
    setDebounceLogs([]);
  };

  // Accessibility (a11y) State
  const [a11yRemediated, setA11yRemediated] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Error Boundary State
  const [widgetCorrupted, setWidgetCorrupted] = useState(false);
  const [errorBoundaryCount, setErrorBoundaryCount] = useState(0);

  // Render State
  const [unoptimizedRenders, setUnoptimizedRenders] = useState(0);
  const [optimizedRenders, setOptimizedRenders] = useState(0);
  const [renderLogs, setRenderLogs] = useState<string[]>([]);

  const runUnoptimizedRenderLoop = () => {
    let count = 0;
    setRenderLogs(prev => ["Running legacy update queue (5 separate updates):", ...prev]);
    // Simulate updating 5 separate states or separate unbatched items rapidly
    const interval = setInterval(() => {
      setUnoptimizedRenders(r => r + 1);
      setRenderLogs(prev => [`↳ Frame trigger: Dispatching State Update #${++count}`, ...prev]);
      if (count >= 5) {
        clearInterval(interval);
        setRenderLogs(prev => ["❌ Triggered 5 discrete browser draw evaluations and diff checks.", ...prev]);
      }
    }, 80);
  };

  const runOptimizedRenderLoop = () => {
    // React 18+ automatic batching combines updates
    setRenderLogs(prev => ["Running automatic batched transaction:", ...prev]);
    setOptimizedRenders(r => r + 1);
    setRenderLogs(prev => [
      "✓ Batched 5 state properties within a single React 19 microtask loop.",
      "✓ Triggered exactly 1 layout draw evaluation.",
      ...prev
    ]);
  };

  return (
    <section id="diagnostic-lab" className="py-20 border-t border-neutral-200 dark:border-[#2A2A2A] bg-neutral-50 dark:bg-[#0A0A0A] transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        {/* Module Header */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20 mb-4">
            <Sparkles className="w-3 h-3" />
            Interactive Diagnostics Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-neutral-900 dark:text-white tracking-tight">
            Frontend Diagnostic Lab
          </h2>
          <p className="text-neutral-500 dark:text-[#A0A0A0] mt-3 text-xs sm:text-sm leading-relaxed">
            I don't just write code; I audit it. Toggle the tabs below to play with real simulations demonstrating how I tackle high-frequency events, layout rendering overhead, keyboard accessibility, and state safety.
          </p>
        </div>

        {/* Lab Panel Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              id="tab-debounce"
              onClick={() => setActiveTab('debounce')}
              className={`flex-shrink-0 text-left p-4 rounded-xl transition-all border ${
                activeTab === 'debounce'
                  ? 'bg-[#121212] border-neutral-200 dark:border-[#2A2A2A] shadow-md text-white scale-[1.02]'
                  : 'border-transparent text-neutral-400 dark:text-[#707070] hover:text-[#A0A0A0] hover:bg-[#121212]/30'
              } cursor-pointer`}
            >
              <div className={`font-mono text-[11px] uppercase tracking-widest ${activeTab === 'debounce' ? 'text-[#4CAF50] font-bold' : 'text-neutral-400 dark:text-[#A0A0A0]'}`}>1. High-Frequency Events</div>
              <div className="text-xs text-neutral-450 dark:text-[#707070] mt-1 font-serif italic">Debounce input rendering loops</div>
            </button>

            <button
              id="tab-renders"
              onClick={() => setActiveTab('renders')}
              className={`flex-shrink-0 text-left p-4 rounded-xl transition-all border ${
                activeTab === 'renders'
                  ? 'bg-[#121212] border-neutral-200 dark:border-[#2A2A2A] shadow-md text-white scale-[1.02]'
                  : 'border-transparent text-neutral-400 dark:text-[#707070] hover:text-[#A0A0A0] hover:bg-[#121212]/30'
              } cursor-pointer`}
            >
              <div className={`font-mono text-[11px] uppercase tracking-widest ${activeTab === 'renders' ? 'text-[#4CAF50] font-bold' : 'text-neutral-400 dark:text-[#A0A0A0]'}`}>2. Render Thrashing Lab</div>
              <div className="text-xs text-neutral-450 dark:text-[#707070] mt-1 font-serif italic">Simulate UI render batching</div>
            </button>

            <button
              id="tab-accessibility"
              onClick={() => setActiveTab('accessibility')}
              className={`flex-shrink-0 text-left p-4 rounded-xl transition-all border ${
                activeTab === 'accessibility'
                  ? 'bg-[#121212] border-neutral-200 dark:border-[#2A2A2A] shadow-md text-white scale-[1.02]'
                  : 'border-transparent text-neutral-400 dark:text-[#707070] hover:text-[#A0A0A0] hover:bg-[#121212]/30'
              } cursor-pointer`}
            >
              <div className={`font-mono text-[11px] uppercase tracking-widest ${activeTab === 'accessibility' ? 'text-[#4CAF50] font-bold' : 'text-neutral-400 dark:text-[#A0A0A0]'}`}>3. Accessibility Auditor</div>
              <div className="text-xs text-neutral-450 dark:text-[#707070] mt-1 font-serif italic">Real-time WCAG standard remediation</div>
            </button>

            <button
              id="tab-errors"
              onClick={() => setActiveTab('errors')}
              className={`flex-shrink-0 text-left p-4 rounded-xl transition-all border ${
                activeTab === 'errors'
                  ? 'bg-[#121212] border-neutral-200 dark:border-[#2A2A2A] shadow-md text-white scale-[1.02]'
                  : 'border-transparent text-neutral-400 dark:text-[#707070] hover:text-[#A0A0A0] hover:bg-[#121212]/30'
              } cursor-pointer`}
            >
              <div className={`font-mono text-[11px] uppercase tracking-widest ${activeTab === 'errors' ? 'text-[#4CAF50] font-bold' : 'text-neutral-400 dark:text-[#A0A0A0]'}`}>4. Isolated Error Boundaries</div>
              <div className="text-xs text-neutral-450 dark:text-[#707070] mt-1 font-serif italic">Graceful crash mitigation logic</div>
            </button>
          </div>

          {/* Main Workspace */}
          <div className="lg:col-span-8 bg-[#121212] rounded-xl border border-neutral-200 dark:border-[#2A2A2A] p-6 sm:p-8 shadow-xl min-h-[460px] flex flex-col justify-between text-[#E5E5E5]">
            {/* 1. DEBOUNCE SIMULATOR */}
            {activeTab === 'debounce' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif italic text-white">
                    High-Frequency Input Optimization
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-450 dark:text-[#A0A0A0] mt-1">
                    Type rapidly in the box below. See how local inputs process instant feedback while parent database filter requests are debounced by 400ms to save API quotas and avoid render sluggishness.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Controls */}
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label htmlFor="debounce-input" className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-[#707070] mb-1.5 font-bold">
                        Live Filter Field
                      </label>
                      <input
                        id="debounce-input"
                        type="text"
                        value={rawInput}
                        onChange={(e) => setRawInput(e.target.value)}
                        placeholder="Type rapidly here..."
                        className="p-3 border rounded-lg bg-black border-neutral-250 dark:border-[#2A2A2A] focus:outline-none focus:ring-1 focus:ring-[#4CAF50]/30 focus:border-[#4CAF50] text-sm font-sans text-white placeholder-neutral-600"
                      />
                    </div>

                    {/* Stats display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                        <div className="text-[9px] text-rose-450 dark:text-rose-400 font-mono uppercase tracking-wider font-bold">Unoptimized API requests</div>
                        <div className="text-2xl font-bold font-mono text-rose-500 dark:text-rose-400 mt-1">{rawCount}</div>
                        <p className="text-[9px] text-neutral-450 dark:text-[#707070] mt-1">Fires every single keystroke</p>
                      </div>

                      <div className="p-3 bg-[#4CAF50]/5 border border-[#4CAF50]/10 rounded-xl">
                        <div className="text-[9px] text-[#4CAF50] font-mono uppercase tracking-wider font-bold">Debounced API calls</div>
                        <div className="text-2xl font-bold font-mono text-[#4CAF50] mt-1">{debouncedCount}</div>
                        <p className="text-[9px] text-neutral-450 dark:text-[#707070] mt-1">Waits for 400ms pause</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={clearDebounce}
                        className="px-4 py-2 text-[9px] font-mono uppercase tracking-widest border border-neutral-250 dark:border-[#2A2A2A] rounded-lg hover:bg-neutral-900 text-neutral-400 dark:text-[#A0A0A0] transition-colors flex items-center gap-1.5 cursor-pointer bg-black"
                      >
                        <RefreshCw className="w-3 h-3" /> Clear Lab Data
                      </button>
                    </div>
                  </div>

                  {/* Right Event Log Stream */}
                  <div className="bg-black border border-neutral-250 dark:border-[#2A2A2A] rounded-xl p-4 font-mono text-[11px] text-neutral-300 flex flex-col h-[220px] justify-between">
                    <div>
                      <div className="flex justify-between items-center text-neutral-450 dark:text-[#707070] border-b border-neutral-200 dark:border-[#2A2A2A] pb-2 mb-2 font-mono text-[10px] uppercase tracking-widest font-semibold">
                        <span>Event Log Timeline</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4CAF50]"></span>
                        </span>
                      </div>
                      <div className="overflow-y-auto h-[150px] space-y-1.5 scrollbar-thin">
                        {debounceLogs.length === 0 ? (
                          <div className="text-neutral-500 text-center mt-10 font-sans text-xs">
                            Waiting for keystrokes to register...
                          </div>
                        ) : (
                          debounceLogs.map((log) => (
                            <div key={log.id} className="flex justify-between">
                              <span className={log.type === 'raw' ? 'text-rose-400' : 'text-[#4CAF50] font-semibold'}>
                                {log.type === 'raw' 
                                  ? `⚡ Keyboard Keystroke [char: "${log.char}"]` 
                                  : `✓ API Query Fired [query: "${log.char}"]`}
                              </span>
                              <span className="text-neutral-500 dark:text-[#707070] text-[9px]">{log.time}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="text-[9px] text-neutral-500 border-t border-neutral-200 dark:border-[#2A2A2A] pt-1.5 mt-2 font-mono">
                      Efficiency Factor: <span className="text-[#4CAF50] font-semibold font-mono">{rawCount > 0 ? `${Math.round(((rawCount - debouncedCount) / rawCount) * 100)}%` : '0%'}</span> payload reduction.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. RENDER THRASHING LAB */}
            {activeTab === 'renders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif italic text-white">
                    React Render Thrashing & Automatic Batching
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-450 dark:text-[#A0A0A0] mt-1">
                    Many developers trigger unnecessary browser layout computations by queuing state updates in rapid succession rather than letting React batch them inside single microtasks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Action Box */}
                  <div className="space-y-4">
                    <div className="p-4 bg-black border border-neutral-250 dark:border-[#2A2A2A] rounded-xl space-y-3">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-450 dark:text-[#707070] font-bold">Unoptimized Separate Queues</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-450 dark:text-[#A0A0A0]">Unbatched Visual Draws:</span>
                        <span className="text-sm font-mono font-bold text-rose-450 dark:text-rose-400">{unoptimizedRenders}</span>
                      </div>
                      <button
                        onClick={runUnoptimizedRenderLoop}
                        className="w-full py-2 bg-rose-700/80 border border-rose-500/30 text-white rounded-lg text-[10px] font-mono uppercase tracking-widest hover:bg-rose-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" /> Trigger Unbatched Loops
                      </button>
                    </div>

                    <div className="p-4 bg-black border border-neutral-250 dark:border-[#2A2A2A] rounded-xl space-y-3">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-450 dark:text-[#707070] font-bold">Optimized React 19 Batched Cycles</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-450 dark:text-[#A0A0A0]">Batched Visual Draws:</span>
                        <span className="text-sm font-mono font-bold text-[#4CAF50]">{optimizedRenders}</span>
                      </div>
                      <button
                        onClick={runOptimizedRenderLoop}
                        className="w-full py-2 bg-[#4CAF50]/80 border border-[#4CAF50]/30 text-white rounded-lg text-[10px] font-mono uppercase tracking-widest hover:bg-[#4CAF50] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" /> Run Batched Microtask
                      </button>
                    </div>
                  </div>

                  {/* Right Diagnostics log */}
                  <div className="bg-black border border-neutral-250 dark:border-[#2A2A2A] rounded-xl p-4 font-mono text-[11px] text-neutral-300 flex flex-col h-[220px] justify-between">
                    <div>
                      <div className="text-neutral-450 dark:text-[#707070] border-b border-neutral-200 dark:border-[#2A2A2A] pb-2 mb-2 font-mono text-[10px] uppercase tracking-widest font-semibold flex justify-between">
                        <span>Virtual DOM Thread Audits</span>
                        <span className="text-[9px] text-[#4CAF50] uppercase tracking-widest font-mono">React 19 Engine</span>
                      </div>
                      <div className="overflow-y-auto h-[150px] space-y-1.5 scrollbar-thin">
                        {renderLogs.length === 0 ? (
                          <div className="text-neutral-500 text-center mt-10 font-sans text-xs">
                            Run a loop to see browser draw evaluations.
                          </div>
                        ) : (
                          renderLogs.map((log, index) => (
                            <div key={index} className="text-[10px] leading-relaxed">
                              <span className={log.startsWith('✓') ? 'text-[#4CAF50] font-semibold' : log.startsWith('❌') ? 'text-rose-450 dark:text-rose-400' : 'text-neutral-300'}>
                                {log}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => { setUnoptimizedRenders(0); setOptimizedRenders(0); setRenderLogs([]); }}
                      className="text-neutral-500 hover:text-white text-[9px] text-right font-mono uppercase tracking-widest hover:underline cursor-pointer"
                    >
                      Reset Thread
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ACCESSIBILITY AUDITOR */}
            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-serif italic text-white">
                      WCAG 2.1 AA Accessibility Remediator
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-450 dark:text-[#A0A0A0] mt-1">
                      See how slight design alterations (contrast ratio, semantic tags, and focus indicators) change a component from completely broken to a 100% compliant, keyboard-friendly widget.
                    </p>
                  </div>
                  <button
                    id="a11y-toggle"
                    onClick={() => setA11yRemediated(!a11yRemediated)}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer ${
                      a11yRemediated
                        ? 'bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/30'
                        : 'bg-rose-950/40 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {a11yRemediated ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {a11yRemediated ? 'Remediation Active' : 'Legacy Defective'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left - The Visual Demo */}
                  <div className="p-5 border border-neutral-250 dark:border-[#2A2A2A] rounded-xl bg-black flex flex-col justify-between h-[230px]">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3 font-semibold">
                        {a11yRemediated ? 'Accessible Tablist Layout' : 'Div-Based Un-focusable Buttons'}
                      </div>
                      
                      {/* Interactive Buttons */}
                      <div className={a11yRemediated ? "flex gap-2" : "flex gap-2"}>
                        {[1, 2, 3].map((val, idx) => {
                          const isFocused = focusedIndex === idx;
                          if (a11yRemediated) {
                            return (
                              <button
                                key={val}
                                id={`tab-opt-${val}`}
                                onFocus={() => setFocusedIndex(idx)}
                                onBlur={() => setFocusedIndex(null)}
                                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-lg border transition-all cursor-pointer ${
                                  isFocused 
                                    ? 'ring-2 ring-[#4CAF50] outline-none scale-105 border-[#4CAF50]' 
                                    : 'border-neutral-200 dark:border-[#2A2A2A]'
                                } bg-[#121212] text-white`}
                                aria-label={`Operational Option number ${val}`}
                              >
                                Option {val}
                              </button>
                            );
                          } else {
                            return (
                              <div
                                key={val}
                                id={`tab-opt-div-${val}`}
                                tabIndex={-1} // Not focusable!
                                className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#404040] bg-[#0C0C0C] border border-neutral-200 dark:border-[#2A2A2A] rounded-lg cursor-not-allowed select-none"
                              >
                                Option {val}
                              </div>
                            );
                          }
                        })}
                      </div>

                      {/* Descriptive contrast box */}
                      <div className="mt-4">
                        <span className={`text-xs font-semibold ${
                          a11yRemediated ? 'text-white' : 'text-neutral-700 dark:text-[#404040]'
                        }`}>
                          This text has {a11yRemediated ? '4.5:1 High Contrast Ratio' : '1.8:1 Invisible Low Contrast'}
                        </span>
                        <p className="text-[11px] text-neutral-450 dark:text-[#A0A0A0] mt-1 leading-normal">
                          {a11yRemediated 
                            ? '✓ Standard screen reader VoiceOver picks this component up instantly and supports full Tab index keyboard focus overlays.' 
                            : '❌ Completely skipped by tab buttons. Visual contrast fails the European Accessibility Act pre-requisite compliance.'}
                        </p>
                      </div>
                    </div>

                    <div className="text-[9px] text-neutral-500 dark:text-[#707070] font-mono uppercase tracking-wider border-t border-neutral-200 dark:border-[#2A2A2A] pt-2 flex justify-between">
                      <span>Keyboard Navigation:</span>
                      <span className={a11yRemediated ? "text-[#4CAF50] font-bold" : "text-rose-400 font-bold"}>
                        {a11yRemediated ? 'ACTIVE [Press Tab to Test]' : 'DISABLED [No keyboard focus]'}
                      </span>
                    </div>
                  </div>

                  {/* Right - Scoreboard & Tech differences */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-neutral-250 dark:border-[#2A2A2A] flex items-center justify-between bg-black">
                      <div>
                        <div className="text-xs text-neutral-450 dark:text-[#A0A0A0] font-sans">Lighthouse Accessibility Audit</div>
                        <div className="text-3xl font-extrabold font-serif italic mt-1 flex items-baseline gap-1">
                          <span className={a11yRemediated ? "text-[#4CAF50]" : "text-rose-450 dark:text-rose-400"}>
                            {a11yRemediated ? '100' : '42'}
                          </span>
                          <span className="text-neutral-550 dark:text-neutral-500 text-xs font-normal">/ 100</span>
                        </div>
                      </div>
                      <div className={`p-2.5 rounded-full ${a11yRemediated ? 'bg-[#4CAF50]/10 text-[#4CAF50]' : 'bg-rose-500/10 text-rose-400'}`}>
                        {a11yRemediated ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                      </div>
                    </div>

                    <div className="bg-black p-4 rounded-xl border border-neutral-250 dark:border-[#2A2A2A] text-xs space-y-2">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#4CAF50] font-bold">Technical Remediation Specs:</div>
                      <ul className="space-y-1.5 text-[11px] text-neutral-450 dark:text-[#A0A0A0] list-disc list-inside">
                        <li>
                          {a11yRemediated 
                            ? 'Replaced un-focusable <div> with semantic html <button> elements.' 
                            : 'Standard tags are plain <div> wrapper elements with no button triggers.'}
                        </li>
                        <li>
                          {a11yRemediated 
                            ? 'Supplied full focus-outline ring boundaries for visible keyboard cues.' 
                            : 'Disabled default user-agent focus outline lines completely.'}
                        </li>
                        <li>
                          {a11yRemediated 
                            ? 'Elevated font colors from soft white-on-gray to deep, compliant high contrast (4.5:1).' 
                            : 'Kept tiny slate gray contrast headers which blend into the card backing.'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. ISOLATED ERROR BOUNDARIES */}
            {activeTab === 'errors' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif italic text-white">
                    Granular Component Error Mitigation
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-450 dark:text-[#A0A0A0] mt-1">
                    Flaky server APIs can return corrupted array data. Run this simulator to see how an isolated error boundary captures a widget crash locally and prevents a global white screen of death.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Controls */}
                  <div className="space-y-4">
                    <div className="p-4 bg-black border border-neutral-250 dark:border-[#2A2A2A] rounded-xl space-y-3">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-450 dark:text-[#707070] font-bold">Flaky Data Node Controls</div>
                      <p className="text-[11px] text-neutral-450 dark:text-[#A0A0A0] leading-relaxed">
                        Triggering a crash simulates attempting to map properties of an undefined object returned from a database payload.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setWidgetCorrupted(true); setErrorBoundaryCount(p => p + 1); }}
                          className="flex-1 py-2 bg-rose-700/80 hover:bg-rose-800 text-white text-[10px] font-mono uppercase tracking-widest rounded-lg transition-colors cursor-pointer border border-rose-500/20"
                        >
                          Inject Corrupted Data
                        </button>
                        <button
                          onClick={() => setWidgetCorrupted(false)}
                          className="px-3 py-2 border border-neutral-250 dark:border-[#2A2A2A] bg-black text-[#A0A0A0] hover:bg-neutral-900 rounded-lg text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                        >
                          Reset Stream
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-250 dark:border-[#2A2A2A] bg-black flex items-center justify-between">
                      <div>
                        <div className="text-xs text-neutral-450 dark:text-[#A0A0A0]">Crashes Intercepted Safely</div>
                        <div className="text-2xl font-bold font-mono text-[#4CAF50] mt-0.5">{errorBoundaryCount}</div>
                      </div>
                      <div className="text-[10px] text-[#4CAF50] bg-[#4CAF50]/10 border border-[#4CAF50]/20 px-2 py-1 rounded font-mono uppercase tracking-widest font-semibold">
                        Page Alive
                      </div>
                    </div>
                  </div>

                  {/* Visual UI Sandbox */}
                  <div className="border border-neutral-250 dark:border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between min-h-[220px] bg-black">
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                        Telemetry Display Widget
                      </div>
                      
                      {widgetCorrupted ? (
                        /* The simulated local Error Boundary UI */
                        <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-lg space-y-2 animate-in fade-in zoom-in-95 duration-200 text-[#E5E5E5]">
                          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs font-serif italic">
                            <AlertCircle className="w-4 h-4" /> Widget Connection Failed
                          </div>
                          <p className="text-[9px] text-rose-400 font-mono leading-relaxed bg-black/40 p-2 rounded border border-rose-900/40">
                            TypeError: Cannot read properties of undefined (reading 'map_coordinates')
                          </p>
                          <button
                            onClick={() => setWidgetCorrupted(false)}
                            className="mt-1 text-[9px] bg-rose-700 hover:bg-rose-800 text-white px-2.5 py-1 rounded font-mono uppercase tracking-widest cursor-pointer transition-colors border border-rose-500/20"
                          >
                            Restart Local Thread
                          </button>
                        </div>
                      ) : (
                        /* Normal Widget State */
                        <div className="p-4 bg-[#121212] border border-neutral-250 dark:border-[#2A2A2A] rounded-lg space-y-2 text-[#E5E5E5]">
                          <div className="flex justify-between items-center text-xs font-semibold text-white">
                            <span>Live Map Tracker</span>
                            <span className="text-[8px] text-[#4CAF50] bg-[#4CAF50]/10 border border-[#4CAF50]/20 px-1.5 py-0.5 rounded uppercase font-mono tracking-widest font-bold">Connected</span>
                          </div>
                          <div className="h-2 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-[#4CAF50] rounded-full animate-pulse"></div>
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            Lat: 37.7749° N, Lon: 122.4194° W (Route Active)
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[9px] text-neutral-500 dark:text-[#707070] font-mono uppercase tracking-wider border-t border-neutral-250 dark:border-[#2A2A2A] pt-2 flex justify-between mt-4">
                      <span>Global App State:</span>
                      <span className="text-[#4CAF50] font-bold uppercase font-mono">Resilient & Unharmed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Insight Footer */}
            <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-[#2A2A2A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-xs text-neutral-450 dark:text-[#A0A0A0] leading-normal font-sans">
                {activeTab === 'debounce' && (
                  <span><strong>Trade-off:</strong> Throttling increases typing response fidelity but introduces a sub-second wait before database query filters activate.</span>
                )}
                {activeTab === 'renders' && (
                  <span><strong>Trade-off:</strong> Grouping updates decreases screen-draw updates from 5 ticks to 1, eliminating long-task sluggishness.</span>
                )}
                {activeTab === 'accessibility' && (
                  <span><strong>Trade-off:</strong> Adding explicit keyboard focus controls slightly expands class declarations but guarantees compliance with legal European/US mandates.</span>
                )}
                {activeTab === 'errors' && (
                  <span><strong>Trade-off:</strong> Writing class boundaries isolates failures to individual cards, keeping the broader page usable for checkout.</span>
                )}
              </div>
              <a
                href="#case-studies"
                className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#4CAF50] hover:text-[#4CAF50]/80 flex-shrink-0 flex items-center gap-1 group"
              >
                See Case Studies <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
