import Reveal from '../Reveal';
import { resumeSummary, experience, education, skills } from '../../data/content';

function LogoField({ logo, background, children, className = '' }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden text-ink ${className}`}
      style={{ background }}
    >
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-[30%] h-14 w-[24%] object-contain object-right select-none md:top-1/2 md:h-[58%] md:w-[26%] md:-translate-y-1/2"
      />
      <div className="relative z-10 flex w-[62%] flex-1 flex-col justify-between md:w-[44%]">{children}</div>
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
            <span className="text-[0.72rem] tracking-[0.16em] uppercase text-muted">{e.role}</span>
            {e.commitment && (
              <span className="block text-[0.62rem] tracking-[0.18em] uppercase text-accent mt-1.5">
                {e.commitment}
              </span>
            )}
          </div>
          <span className="display text-3xl leading-none text-ink/55 text-right">
            {e.year}
            {e.current && (
              <span className="block text-[0.62rem] tracking-[0.16em] uppercase text-accent mt-1.5">
                – present
              </span>
            )}
          </span>
        </div>
        <div className="mt-8">
          <h3 className="display text-[1.85rem] md:text-[2.1rem] leading-none">{e.org}</h3>
          <p className="text-[0.95rem] leading-relaxed text-ink-soft mt-3">{e.summary}</p>
          {e.location && <p className="text-sm text-muted mt-3">{e.location}</p>}
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

        <div className="mt-16 md:mt-20 border-t border-line pt-10">
          <Reveal>
            <span className="eyebrow">Education</span>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {education.map((ed, i) => (
              <Reveal key={ed.org} delay={i * 0.05}>
                <LogoField logo={ed.logo} background={ed.background} className="min-h-[11rem] p-6 md:p-7">
                  <div>
                    <span className="text-[0.72rem] tracking-[0.16em] uppercase text-muted">{ed.period}</span>
                    <h3 className="display text-2xl md:text-3xl leading-none mt-4">{ed.org}</h3>
                    <p className="text-ink-soft mt-3">{ed.degree}</p>
                    <p className="text-sm text-muted mt-2">{ed.note}</p>
                  </div>
                </LogoField>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 border-t border-line pt-10">
          <Reveal>
            <span className="eyebrow">Skills</span>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {skills.map((g) => (
              <Reveal key={g.group}>
                <p className="text-[0.72rem] tracking-[0.16em] uppercase text-muted mb-2">{g.group}</p>
                <p className="leading-relaxed text-ink-soft">{g.items.join(', ')}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
