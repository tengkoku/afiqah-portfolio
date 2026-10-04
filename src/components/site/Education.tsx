import { education } from '../../data/portfolioData';
import SectionHeader from './SectionHeader';

export default function Education() {
  return (
    <section id="education" className="px-[var(--gut)] py-[clamp(96px,11vw,168px)]">
      <SectionHeader index="04" title="Education" />

      <div className="border-b border-line">
        {education.map((edu, i) => (
          <article key={edu.id} className="flex flex-wrap gap-x-8 gap-y-6 border-t border-line pb-14 pt-12">
            <div className="flex flex-[1_1_260px] flex-col gap-1.5 pr-8">
              <span className="label">{edu.period}</span>
              <span className="label text-muted">{edu.location}</span>
            </div>
            <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-2.5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[clamp(36px,4vw,56px)] font-semibold leading-none tracking-[-0.045em]">{edu.institution}</h3>
                <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="text-xl font-medium tracking-[-0.015em]">{edu.qualification}</p>
              {edu.notes && <p className="max-w-[640px] text-[17px] leading-[1.6] text-muted">{edu.notes}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
