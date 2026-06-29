import { CaseStudy, TechNote, Experience, TrailPoint, VirtualPlant } from '../types';

export const developerProfile = {
  name: "Afiqah",
  pronouns: "she/her",
  role: "Junior Frontend Developer",
  location: "Johor Bahru, Malaysia",
  tagline: "Building resilient, high-fidelity interfaces that don't crack under the pressure of messy data, state cycles, or screen readers.",
  lane: "Specialized in React Architecture, Runtime Performance, and Screen-Reader Accessibility. P.S. Laravel backend too.. ",
  contact: {
    email: "kuafiqah79@gmail.com",
    linkedin: "linkedin.com/in/kuafiqah79",
    github: "github.com/tengkoku",
    resumeUrl: "#"
  },
  bio: "I treat the web as a science of constraints. While many focus on visual overlays, I focus on what sits beneath: predictable state machines, smooth rendering pipelines, semantic DOM trees, and error tolerance. I love solving the unglamorous but vital stuff—like stopping a fast-clicking user from triggering duplicate database transactions, or making sure a keyboard-only user can easily fill out complex, nested forms. In my spare time, I recharge by hiking foggy ridge trails, doing landscape film photography, and tending to a mini-greenhouse of humidity-loving ferns."
};

export const caseStudies: CaseStudy[] = [
  {
    id: "checkout-rewrite",
    title: "Checkout Flow State & UX Overhaul",
    subtitle: "A complete rewrite of an e-commerce multi-step checkout funnel to eliminate double-submits, layout shifts, and field drop-offs.",
    role: "Front-end Owner (Checkout Page)",
    period: "3 months (Q3 2025)",
    summary: "The legacy checkout was a massive source of transaction errors. Slow API calls tempted users to click 'Place Order' multiple times, triggering double billing. Layout shifts from dynamically rendered shipping error lines caused users to misclick, and keyboard navigation was completely broken.",
    ownership: [
      "Owned the redesign and front-end engineering of the 3-step checkout container.",
      "Engineered an immutable finite state machine (FSM) to strictly control step transitions (Cart -> Shipping -> Payment -> Submitting -> Receipt).",
      "Created a robust React hook `useBlockDoubleSubmit` that intercepted button submissions and locked user interactions during server-side network resolution."
    ],
    decisions: [
      {
        situation: "The product team wanted standard Redux for storing checkout steps, but checkout states are highly volatile and do not need to persist globally once the purchase completes.",
        tradeoff: "Redux would add 120KB of bundle weight and boilerplates. A simple `useState` would get messy due to prop-drilling across steps.",
        choice: "Implemented a local React Context with `useReducer` mimicking a finite state machine.",
        why: "This encapsulated checkout state, enforced strict action-only changes, prevented illegal step skips, and avoided bloating the global web bundle."
      },
      {
        situation: "Validation messages were popping up dynamically, pushing content downward and causing layout shifts (CLS).",
        tradeoff: "Keeping static placeholders for all potential error lines creates empty blank spaces on the screen, hurting visual density.",
        choice: "Reserved specific height bounds for form error lanes using fixed-height slots, combined with smooth opacity transitions.",
        why: "This eliminated layout shifts completely. The user's screen never jumps, and form fields stay exactly under their finger, reducing misclicks."
      }
    ],
    metrics: [
      { label: "Accidental Double Billing Errors", before: "1.4% of orders", after: "0.0% (Zero)", improved: true },
      { label: "Checkout Layout Shift (CLS)", before: "0.34 (Poor)", after: "0.01 (Excellent)", improved: true },
      { label: "Funnel Completion Rate", before: "78.2%", after: "86.5%", improved: true },
      { label: "Page Weight / Checkout JS Bundle", before: "310 KB", after: "142 KB (-54%)", improved: true }
    ],
    qualityChecks: [
      {
        method: "Screen Reader (VoiceOver / NVDA) Navigation Audit",
        tools: ["VoiceOver", "Chrome DevTools Accessibility Panel"],
        outcome: "Identified that screen readers skipped payment form fields when dynamically rendered. Added `aria-live='polite'` and semantic `<fieldset>` labels to read out context-specific validation alerts immediately."
      },
      {
        method: "Simulated Network Throttling & Fast-Click Testing",
        tools: ["Chrome Network Link Conditioner (3G Slow)", "Cypress Test Runner"],
        outcome: "Wrote automated tests that simulated 10 rapid clicks on the 'Pay Now' button under a 5-second simulated latency. Verified the order was only dispatched exactly once and the submission spinner remained locked."
      }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zod Validation", "Cypress"],
    impactSummary: "By stabilizing the state container and introducing layout guardrails, my rewrite salvaged roughly $14,000 in monthly sales formerly lost to checkout drop-offs and cut customer service billing tickets down to near zero."
  },
  {
    id: "dashboard-perf",
    title: "Live Telemetry Dashboard Optimization",
    subtitle: "Refactoring a heavy real-time data visualizer dashboard that choked CPUs with 500ms websocket state updates.",
    role: "Junior UI Developer",
    period: "2 months (Q4 2025)",
    summary: "The Live Dispatch Dashboard displays hundreds of routing trucks on an SVG grid. Because coordinate updates ticked every 500ms, React was triggering global re-renders for the entire card grid. Users' browsers suffered from 400ms 'Long Tasks', freezing animations and rendering the dashboard unresponsive.",
    ownership: [
      "Diagnosed and mapped the main thread bottlenecks using Chrome performance profiles.",
      "Decoupled telemetry coordinate updates from the React rendering loop using mutable Refs.",
      "Optimized custom SVG rendering components to run on hardware-accelerated CSS properties."
    ],
    decisions: [
      {
        situation: "The chart container needed to redraw 200+ telemetry SVG paths on every tick. React re-rendered every single item container on the list.",
        tradeoff: "Using a virtualized list prevents rendering of off-screen items, but dispatchers need to see the complete fleet layout to coordinate routes.",
        choice: "Decoupled coordinates from React state. Stored raw live coordinates in `useRef`, and used an event-driven subscriber model to mutate DOM nodes directly.",
        why: "React no longer runs diffing algorithms on 200 components every 500ms. Render cycles went from continuous, high-latency loops to near-instant static cards, bypassing the React virtual DOM for ultra-fast leaf-node mutations."
      },
      {
        situation: "The maps would stutter during zoom and pan because of rendering high-frequency grid markers.",
        tradeoff: "We could lower the refresh rate to 3 seconds, but dispatchers lose the 'live precision' required to guide drivers around blocked intersections.",
        choice: "Debounced marker position transitions using a requestAnimationFrame wrapper.",
        why: "It batches position updates and schedules them exactly when the browser is preparing a frame draw, resulting in buttery smooth transitions even during high-velocity updates."
      }
    ],
    metrics: [
      { label: "Dashboard Main Thread Idle Time", before: "18% (Laggy)", after: "88% (Responsive)", improved: true },
      { label: "Chrome 'Long Tasks' (>50ms)", before: "48 tasks / min", after: "0 tasks / min", improved: true },
      { label: "Memory Footprint (Heap)", before: "140 MB", after: "45 MB", improved: true },
      { label: "Browser Frame Rate (FPS)", before: "18-24 FPS", after: "58-60 FPS", improved: true }
    ],
    qualityChecks: [
      {
        method: "Chrome DevTools CPU Profiler & Allocation Timeline",
        tools: ["Chrome Performance tab", "Memory allocation sampler"],
        outcome: "Traced a major garbage-collection leak to object creations inside the render cycle. Memoized key coordinates transformers and restructured raw arrays to flat buffers, flattening memory saw-tooth graphs."
      },
      {
        method: "Low-End Device Emulation (Moto G4)",
        tools: ["Lighthouse Engine", "6x CPU slowdown emulator"],
        outcome: "Verified that under severe hardware constraints, the dispatch layout remained interactive (Time to Interactive dropped from 11.2s to 2.4s)."
      }
    ],
    techStack: ["React Hooks", "HTML5 Canvas/SVG", "WebSockets", "Chrome DevTools Profiler", "Performance API"],
    impactSummary: "Freed dispatchers from browser freezes. The system can now comfortably display and scale to 1,000+ live assets without lagging, enabling our shipping partners to expand their fleet size by 2x without experiencing interface failures."
  }
];

export const techNotes: TechNote[] = [
  {
    id: "note-batching",
    category: "performance",
    title: "Throttling Typing Handlers to Prevent Render Thrashing",
    description: "How to safely separate input field keystroke visual feedback from expensive parent re-renders in heavy filter pages.",
    problem: "When a user types into a filter bar, updating the parent search query on every keystroke causes heavy charts and sub-lists to re-render in real-time. This causes extreme typing lag (keystrokes appear with 200ms delay).",
    solution: "Isolate the input state in a self-contained local component. Only dispatch the filtered search query up to the parent using a debounced helper. This keeps the typing field buttery smooth while running the heavy search logic only after the user pauses typing.",
    codeSnippet: `// 💡 The pattern to keep input responsive while searching heavy data
import React, { useState, useEffect } from 'react';

export function SearchFilter({ onSearchChange, delay = 250 }) {
  // 1. Keep input state local. Fast typing only re-renders this tiny input node!
  const [value, setValue] = useState("");

  useEffect(() => {
    // 2. Schedule debounced callback to trigger parent query
    const handler = setTimeout(() => {
      onSearchChange(value);
    }, delay);

    // 3. Cleanup timer on next keystroke
    return () => clearTimeout(handler);
  }, [value, delay, onSearchChange]);

  return (
    <input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type fast... charts won't lag!"
      className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
    />
  );
}`
  },
  {
    id: "note-a11y-dropdown",
    category: "accessibility",
    title: "Semantic Keyboard-Only Accessible Dropdown",
    description: "Designing dynamic dropdown select overlays that don't rely strictly on pointer-clicks and correctly announce options to screen-readers.",
    problem: "Many sleek UI frameworks use generic <div> structures for custom dropdowns. These look pretty but are completely invisible to keyboard-only 'Tab' navigation and read out as empty containers on VoiceOver.",
    solution: "Utilize semantic button toggles with expanded accessibility tags (`aria-haspopup='listbox'`, `aria-expanded`), map arrow keys to move highlights in focus arrays, and manage keyboard focus trapping with React refs.",
    codeSnippet: `// 💡 Semantic custom dropdown template with full keyboard accessibility
import React, { useState, useRef, useEffect } from 'react';

export function AccessibleSelect({ options, label, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(prev => Math.min(prev + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      onChange(options[activeIndex]);
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <label id="select-label" className="block text-sm font-medium mb-1">{label}</label>
      <button
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-3 rounded-md bg-white border dark:bg-slate-800"
      >
        {activeIndex >= 0 ? options[activeIndex] : 'Select an option...'}
      </button>
      
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby="select-label"
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg dark:bg-slate-800"
        >
          {options.map((opt, idx) => (
            <li
              key={opt}
              role="option"
              aria-selected={idx === activeIndex}
              className={\`p-3 cursor-pointer \${idx === activeIndex ? 'bg-emerald-500 text-white' : 'hover:bg-slate-100'}\`}
              onClick={() => { onChange(opt); setIsOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`
  },
  {
    id: "note-error-boundaries",
    category: "architecture",
    title: "Fault-Tolerant UI via Granular Error Boundaries",
    description: "Preventing a single corrupted API response widget from crashing the entire application viewport.",
    problem: "When a complex sidebar or secondary chart attempts to map an undefined key from a flaky server payload, the entire React tree unmounts. The user is greeted by a blank white screen of death, losing all uncompleted work.",
    solution: "Wrap independent widgets inside isolated Error Boundary containers. When a widget fails, catch the error, log the context-specific crash telemetry, and show a clean local recovery UI without disrupting other viewport processes.",
    codeSnippet: `// 💡 Wrap complex sub-components in boundaries to prevent global crashes
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; title: string; }
interface State { hasError: boolean; errorLog: string; }

export class ResilientWidget extends Component<Props, State> {
  public state: State = { hasError: false, errorLog: "" };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorLog: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Widget Failure Captured:", error, errorInfo);
    // Real-world: dispatch error metrics to logging service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-rose-200 bg-rose-50 rounded-lg dark:bg-rose-950/20">
          <h3 className="font-semibold text-rose-800 dark:text-rose-400 font-display">
            {this.props.title} Failed to Load
          </h3>
          <p className="text-xs text-rose-600 mt-1 font-mono">Error: {this.state.errorLog}</p>
          <button 
            onClick={() => this.setState({ hasError: false })} 
            className="mt-3 text-xs bg-rose-600 text-white px-3 py-1.5 rounded hover:bg-rose-700"
          >
            Attempt Recover
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}`
  }
];

export const experiences: Experience[] = [
  {
    id: "veloce-logistics",
    role: "Junior Frontend Developer",
    company: "Veloce Logistics",
    period: "Feb 2025 - Present",
    productArea: "Live Fleet Dispatch Routing Dashboard & Operational Portals.",
    scope: "Own development of modular React maps widgets, interactive routing sidebars, and real-time state synchronizations.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Mapbox GL", "Vitest", "Docker"],
    bulletPoints: [
      "Optimized real-time dispatch updates by batching websocket ticks, bringing main-thread CPU idle time from 18% to 88% under heavy loads.",
      "Redesigned dispatcher claim forms to use rigid local schema validation via React-Hook-Form and Zod, decreasing invalid driver submissions by 24%.",
      "Constructed a high-density bento grid view that lets dispatchers manage, sort, and search 400+ driver records without UI latency.",
      "Introduced end-to-end user regression workflows via Cypress, catching 14 critical booking flow errors prior to production releases."
    ]
  },
  {
    id: "sylvan-saas",
    role: "Frontend Engineering Intern",
    company: "Sylvan SaaS",
    period: "May 2024 - Dec 2024",
    productArea: "User Invitation Flow, Billing Portals, and Core UI Component Library.",
    scope: "Identified usability roadblocks, optimized bundle sizes, and audited legacy interfaces for web accessibility standard compliance.",
    stack: ["Next.js", "React", "Jest", "Axe Accessibility Core", "CSS Modules", "Git"],
    bulletPoints: [
      "Audited 40+ modular components for WCAG 2.1 AA accessibility compliance; restored screen-reader focus traps and added proper semantic landmarks.",
      "Re-engineered next/image implementations and dynamically imported heavy billing libraries, improving cumulative layout shift scores across marketing lines by 40%.",
      "Created a unified multi-step client invitation drawer with graceful error state handling, which reduced form abandonment by 18% during onboarding.",
      "Refactored legacy utility components, trimming cumulative application vendor JS bundle sizing by 45 KB."
    ]
  }
];

export const hikingTrailData: TrailPoint[] = [
  {
    id: "trail-cathedral",
    name: "Redwood Creek Descent",
    elevation: 450, // drop
    distance: 3.2,
    landmark: "The Cathedral Grove Redwoods",
    lesson: "Root Connectivity. Redwood trees don't have deep taproots. Instead, their roots spread horizontally and lock onto adjacent trees, creating a unified network that can withstand major winter storms.",
    techAnalogy: "Shared Context & Composition. In frontend, instead of building giant, heavy monolithic components that try to carry everything alone (and fall when single API keys break), we write small, inter-locking components that compose together. Roots interlock via React Context/props, distributing state weight evenly."
  },
  {
    id: "trail-pine",
    name: "Sentinel Dome Ridge Trail",
    elevation: 1200, // gain
    distance: 5.6,
    landmark: "Windswept Jeffery Pine",
    lesson: "Adaptive Growth. This tree grows on a solid granite dome. Swept by continuous high-speed winds, it grows short, thick, and crooked, hugging the stone rather than trying to stand perfectly straight.",
    techAnalogy: "Graceful Degradation. A robust UI is like the windswept pine: it adapts to hostile environments. Instead of assuming high-speed Wi-Fi or fully hydrated payloads, we build layouts that adapt when data is missing or network speeds drop, adjusting density to guarantee usability."
  },
  {
    id: "trail-canyon",
    name: "Fern Canyon Trail Loop",
    elevation: 180,
    distance: 2.1,
    landmark: "Dripping Canyon Fern Walls",
    lesson: "Microclimate Shield. High, moist walls lock in humidity, allowing prehistoric ferns to thrive in a cold environment that would normally freeze or dry them out.",
    techAnalogy: "Encapsulation & Scope Isolation. Just as the high canyon walls shield the delicate ferns from harsh winds, we encapsulate visual components within rigid scope boundaries (e.g., scoped Tailwind blocks, separate files, pure render functions). This protects elements from global side-effects, keeping them safe."
  }
];

export const initialVirtualPlants: VirtualPlant[] = [
  { id: "plant-monstera", name: "Monstera Adansonii", type: "Swiss cheese plant", moisture: 45, sunlight: "medium", status: "healthy", lastWatered: "2 days ago" },
  { id: "plant-snake", name: "Snake Plant", type: "Sansevieria", moisture: 15, sunlight: "low", status: "thirsty", lastWatered: "14 days ago" },
  { id: "plant-pothos", name: "Golden Pothos", type: "Trailing vine", moisture: 90, sunlight: "high", status: "overwatered", lastWatered: "1 hour ago" }
];
