import Hero from './components/Hero';
import CodePlayground from './components/CodePlayground';
import TechnicalNotes from './components/TechnicalNotes';
import InterestModule from './components/InterestModule';
import Experience from './components/Experience';
import ContactForm from './components/ContactForm';
import { ArrowUp, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

function GlobalRevealLayer({ cursorX, cursorY }: { cursorX: number; cursorY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,1)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const dataURL = canvas.toDataURL();
    reveal.style.maskImage = `url(${dataURL})`;
    (reveal.style as any).webkitMaskImage = `url(${dataURL})`;
    reveal.style.maskSize = '100% 100%';
    (reveal.style as any).webkitMaskSize = '100% 100%';
  });

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${BG_IMAGE_2})` }}
      />
    </>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [img1Opacity, setImg1Opacity] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      // smooth cursor
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
      setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y });

      // BG_IMAGE_1 fade
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollRef.current / maxScroll : 0;
      setImg1Opacity(Math.max(0, 1 - progress * 1.4));
      setShowScrollTop(scrollRef.current > 400);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen text-[#E5E5E5] selection:bg-emerald-500/30">

      {/* ── Fixed background stack ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Layer A: BG_IMAGE_2 — always visible base */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_2})` }}
        />
        {/* Layer B: BG_IMAGE_1 — fades out as user scrolls */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})`, opacity: img1Opacity }}
        />
        {/* Layer C: cursor spotlight — reveals BG_IMAGE_2 through soft mask */}
        <GlobalRevealLayer cursorX={cursorPos.x} cursorY={cursorPos.y} />
        {/* Layer D: atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, black 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* ── Scrollable content ── */}
      <main className="relative z-10">
        <Hero />
        <CodePlayground />
        <TechnicalNotes />
        <InterestModule />
        <Experience />
        {/* <ContactForm /> */}
      </main>

      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>&copy; {new Date().getFullYear()} Afiqah. Mapped & Compiled with passion.</span>
          </div>
          <span className="text-emerald-500/60">// Waiting for the new leaf to unroll... keeps me wondering.</span>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg z-50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-500/20"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </button>
      )}
    </div>
  );
}
