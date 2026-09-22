import Reveal from '../Reveal';
import { resumeSummary, experience, education, skills } from '../../data/content';

function LogoField({ logo, background, children, className = '' }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden text-paper ${className}`}
      style={{ background }}
    >
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[86%] w-[58%] object-contain object-right opacity-[0.34] select-none"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,12,18,0.28) 0%, rgba(8,12,18,0.05) 46%, rgba(8,12,18,0) 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-1 flex-col justify-between">{children}</div>
    </div>
  );
}

function RoleCard({ e, i }) {
  return (
    <Reveal as="li" delay={Math.min(i, 5) * 0.04} className="h-full">
      <LogoField
        logo={e.logo}
        background={e.background}
        className="h-full min-h-[15.5rem] p-6 md:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[0.72rem] tracking-[0.16em] uppercase text-paper/70">{e.role}</span>
            {e.commitment && (
              <span className="block text-[0.62rem] tracking-[0.18em] uppercase text-accent mt-1.5">
                {e.commitment}
              </span>
            )}
          </div>
          <span className="display text-3xl leading-none text-paper/35 text-right">
            {e.year}
            {e.current && (
              <span className="block text-[0.62rem] tracking-[0.16em] uppercase text-accent mt-1.5">
                – present
              </span>
            )}
          </span>
        </div>
        <div className="mt-8 max-w-[34ch]">
          <h3 className="display text-[1.85rem] md:text-[2.1rem] leading-none">{e.org}</h3>
          <p className="text-[0.95rem] leading-relaxed text-paper/75 mt-3">{e.summary}</p>
          {e.location && <p className="text-sm text-paper/45 mt-3">{e.location}</p>}
        </div>
      </LogoField>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" data-nav-theme="light" className="relative bg-paper text-ink py-20 md:py-28">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <Reveal>
          <span className="eyebrow">Experience</span>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{resumeSummary}</p>
        </Reveal>

        <ol className="mt-10 grid md:grid-cols-2 gap-4">
          {experience.map((e, i) => (
            <RoleCard key={`${e.org}-${e.year}-${e.role}`} e={e} i={i} />
          ))}
        </ol>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {education.map((ed, i) => (
            <Reveal key={ed.org} delay={i * 0.05}>
              <LogoField logo={ed.logo} background={ed.background} className="min-h-[11rem] p-6 md:p-7">
                <div>
                  <span className="text-[0.72rem] tracking-[0.16em] uppercase text-paper/55">Education</span>
                  <h3 className="display text-2xl md:text-3xl leading-none mt-4 max-w-[16ch]">{ed.org}</h3>
                  <p className="text-paper/75 mt-3 max-w-[36ch]">
                    {ed.degree} <span className="text-paper/45">— {ed.note}</span>
                  </p>
                  <p className="text-sm text-paper/45 mt-2">{ed.period}</p>
                </div>
              </LogoField>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06} className="mt-4 bg-night text-paper p-6 md:p-7">
          <span className="eyebrow block mb-5">Skills</span>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((g) => (
              <div key={g.group}>
                <p className="text-sm text-blue-soft/80 mb-1">{g.group}</p>
                <p className="leading-relaxed text-paper/80">{g.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
