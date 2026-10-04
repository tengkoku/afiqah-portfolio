import { experienceHighlights, experiences } from '../../data/portfolioData';
import SectionHeader from './SectionHeader';
import HighlightsCarousel from './HighlightsCarousel';

export default function Experience() {
  return (
    <section id="experience" className="px-[var(--gut)] py-[clamp(96px,11vw,168px)]">
      <SectionHeader
        index="03"
        title="Experience"
        lede="From enterprise IT support to real-time vessel routing dashboards."
      />

      <div className="border-b border-line">
        {experiences.map((exp, i) => {
          const detail = experienceHighlights[exp.id];
          return (
            <article key={exp.id} className="flex flex-wrap gap-x-8 gap-y-6 border-t border-line pb-14 pt-12">
              <div className="flex flex-[1_1_260px] flex-col gap-1.5 pr-8">
                <span className="label">{exp.period.replace(' - ', ' — ')}</span>
                <span className="label text-muted">{exp.location}</span>
              </div>

              <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-9">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[clamp(36px,4vw,56px)] font-semibold leading-none tracking-[-0.045em]">{exp.company}</h3>
                    <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-xl font-medium tracking-[-0.015em]">{exp.role}</p>
                  <p className="max-w-[640px] text-[17px] leading-[1.6] text-muted">{detail?.summary ?? exp.scope}</p>
                </div>

                {detail && (
                  <>
                    <HighlightsCarousel items={detail.highlights} label={`${exp.company} highlights`} />
                    <ul className="label flex flex-wrap gap-2 text-muted" aria-label="Stack">
                      {detail.featuredStack.map((tech) => (
                        <li key={tech} className="rounded-full border border-line px-3 py-[7px]">{tech}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
