import { techStack } from '../../data/portfolioData';
import SectionHeader from './SectionHeader';

export default function TechStack() {
  return (
    <section id="stack" className="px-[var(--gut)] py-[clamp(96px,11vw,168px)]">
      <SectionHeader
        index="02"
        title="Tech Stack"
        lede="The tools I reach for to ship typed, accessible frontends — and the Laravel backends behind them."
      />

      <ul className="border-b border-line">
        {techStack.map((group) => (
          <li key={group.label} className="stack-row flex flex-wrap gap-x-8 gap-y-4 border-t border-line py-9">
            <p className="label flex flex-[1_1_260px] justify-between pr-8 pt-3">
              <span>{group.label}</span>
              <span className="text-muted">{String(group.items.length).padStart(2, '0')}</span>
            </p>
            <ul className="flex flex-[3_1_560px] flex-wrap gap-x-8 gap-y-1.5 text-[clamp(26px,2.8vw,40px)] font-medium leading-[1.15] tracking-[-0.035em]">
              {group.items.map((item) => (
                <li key={item} className="stack-item">{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
