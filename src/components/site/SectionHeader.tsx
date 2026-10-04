interface SectionHeaderProps {
  index: string;
  title: string;
  lede?: string;
}

export default function SectionHeader({ index, title, lede }: SectionHeaderProps) {
  return (
    <div className="mb-[clamp(56px,7vw,112px)] flex flex-wrap gap-8">
      <p className="label flex-[1_1_260px] pt-3.5 text-muted">
        ({index}) — {title}
      </p>
      <div className="flex flex-[3_1_560px] flex-col gap-7">
        <h2 className="text-[clamp(56px,8.4vw,132px)] font-semibold leading-[0.9] tracking-[-0.055em]">{title}</h2>
        {lede && <p className="max-w-[560px] text-[19px] leading-normal text-muted">{lede}</p>}
      </div>
    </div>
  );
}
