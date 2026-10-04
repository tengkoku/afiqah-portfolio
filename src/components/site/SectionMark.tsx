import amok from '../../../assets/amok-cutout.webp';

/** Mascot cut-out centred on the boundary between two sections. */
export default function SectionMark() {
  return (
    <div aria-hidden="true" className="relative z-10 h-0">
      <img
        src={amok}
        alt=""
        width={128}
        height={128}
        loading="lazy"
        decoding="async"
        className="section-mark absolute left-1/2 top-0 block size-[clamp(80px,9vw,128px)] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
