import { developerProfile } from '../../data/portfolioData';

export default function Footer() {
  const { name, contact } = developerProfile;

  return (
    <footer className="flex flex-col gap-[clamp(64px,8vw,120px)] px-[var(--gut)] pb-8 pt-[clamp(80px,9vw,140px)]">
      <div className="flex flex-col gap-5">
        <p className="label text-muted">Get in touch</p>
        <a
          href={`mailto:${contact.email}`}
          className="link-underline self-start break-all pb-1.5 text-[clamp(32px,5.6vw,88px)] font-semibold leading-none tracking-[-0.05em]"
        >
          {contact.email}
        </a>
      </div>
      <div className="label flex flex-wrap justify-between gap-4 text-muted">
        <span>© {new Date().getFullYear()} {name}</span>
        <div className="flex flex-wrap gap-6">
          <a className="link-underline" href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a className="link-underline" href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="link-underline" href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
