import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { developerProfile } from '../../data/portfolioData';
import { Fur } from 'feral-fur';
import { useIsDark } from '../../hooks/useTheme';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// Short monogram on phones, where the full name is too small for the coat to stay legible
const MOBILE_FUR_TEXT = 'TNA';

const NAV = [
  { index: '02', label: 'Stack', href: '#stack' },
  { index: '03', label: 'Experience', href: '#experience' },
  { index: '04', label: 'Education', href: '#education' },
];

export default function Hero() {
  const dark = useIsDark();
  const isPhone = useMediaQuery('(max-width: 640px)');
  const { name, role, tagline, contact } = developerProfile;

  return (
    <header id="top" className="relative flex min-h-[max(100svh,760px)] flex-col overflow-hidden px-[var(--gut)] pb-[calc(clamp(80px,9vw,128px)/2+40px)] pt-7">
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-6">
        <a href="#top" className="label link-underline font-medium tracking-[0.06em]">
          {name} ©{new Date().getFullYear()}
        </a>
        <nav aria-label="Sections" className="nav label flex flex-wrap gap-8">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              <span className="text-muted">{item.index}</span>&nbsp;&nbsp;{item.label}
            </a>
          ))}
        </nav>
        <div className="hidden w-[200px] md:block" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-7 pb-12 pt-[72px]">
        <p className="label reveal text-muted">(01) — Portfolio</p>

        <h1 className="sr-only">{name}</h1>
        <div className="reveal" style={{ '--d': '120ms' } as CSSProperties}>
          <Fur
            key={isPhone ? 'phone' : 'wide'}
            text={isPhone ? MOBILE_FUR_TEXT : name}
            color={dark ? '#e9e9e6' : '#161616'}
            density={1.5}
            mess={0.35}
            style={{ width: '100%', aspectRatio: isPhone ? '2 / 1' : '10 / 3' }}
          />
        </div>

        <div className="reveal flex flex-wrap items-end justify-between gap-10 pt-2" style={{ '--d': '260ms' } as CSSProperties}>
          <div className="flex max-w-[620px] flex-[1_1_420px] flex-col gap-3.5">
            <h2 className="text-[clamp(30px,3.2vw,44px)] font-medium leading-[1.04] tracking-[-0.035em]">{role}</h2>
            <p className="max-w-[520px] text-[17px] leading-[1.55] text-muted">{tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="pill bg-fg text-bg" href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight className="arrow h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a className="pill border border-line-strong" href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight className="arrow h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="label flex flex-wrap justify-between gap-4 text-muted">
        <span>Scroll ↓</span>
        <span>Johor Bahru, MY · GMT+8</span>
      </div>
    </header>
  );
}
