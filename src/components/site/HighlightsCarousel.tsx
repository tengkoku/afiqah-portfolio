import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';
import type { ExperienceHighlights } from '../../data/portfolioData';
import { useMediaQuery } from '../../hooks/useMediaQuery';

type Highlight = ExperienceHighlights['highlights'][number];

const SPEED = 36; // px per second

/**
 * Infinite autoplay marquee. The list is repeated until one group is at least as
 * wide as the viewport, then the group is duplicated and the track slides -50%
 * so the loop is seamless. Pauses on hover or via the button; with reduced
 * motion it becomes a static, horizontally scrollable row.
 */
export default function HighlightsCarousel({ items, label }: { items: Highlight[]; label: string }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [reps, setReps] = useState(1);
  const [groupWidth, setGroupWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    if (reduced) return;
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    const measure = () => {
      const listWidth = group.scrollWidth / reps;
      if (!listWidth) return;
      const next = Math.max(1, Math.ceil(viewport.clientWidth / listWidth));
      if (next !== reps) setReps(next);
      else setGroupWidth(group.scrollWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [reps, reduced, items]);

  const cards = (copy: number) =>
    Array.from({ length: reps }, (_, r) =>
      items.map((h, i) => (
        <li
          key={`${copy}-${r}-${h.title}`}
          aria-hidden={copy > 0 || r > 0 ? true : undefined}
          className="flex w-[min(300px,78vw)] shrink-0 flex-col gap-2 border-t border-line pt-[18px] text-[15px] leading-[1.55]"
        >
          <span className="label text-muted">
            {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="font-medium">{h.title}</span>
          <span className="text-muted">{h.description}</span>
        </li>
      )),
    );

  if (reduced) {
    return (
      <ul aria-label={label} className="flex snap-x gap-10 overflow-x-auto pb-2">
        {items.map((h, i) => (
          <li key={h.title} className="flex w-[min(300px,78vw)] shrink-0 snap-start flex-col gap-2 border-t border-line pt-[18px] text-[15px] leading-[1.55]">
            <span className="label text-muted">
              {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <span className="font-medium">{h.title}</span>
            <span className="text-muted">{h.description}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="marquee flex flex-col gap-5" data-paused={paused}>
      <div ref={viewportRef} className="marquee-viewport overflow-hidden">
        <div
          className="marquee-track flex w-max"
          style={{ '--marquee-duration': `${Math.max(12, groupWidth / SPEED)}s` } as CSSProperties}
        >
          <ul ref={groupRef} aria-label={label} className="flex shrink-0 gap-10 pr-10">
            {cards(0)}
          </ul>
          <ul aria-hidden="true" className="flex shrink-0 gap-10 pr-10">
            {cards(1)}
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="label inline-flex h-11 items-center gap-2 self-start text-muted transition-colors hover:text-fg"
      >
        {paused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
        {paused ? 'Play' : 'Pause'} highlights
      </button>
    </div>
  );
}
