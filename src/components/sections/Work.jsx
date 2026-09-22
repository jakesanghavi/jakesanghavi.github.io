import Reveal from '../Reveal';
import { resumeSummary, experience, education, skills } from '../../data/content';

// Distinct fields so each role reads as its own card, not a repeated row.
const FIELDS = [
  'radial-gradient(90% 80% at 0% 0%, rgba(214,138,62,0.55), transparent 58%), linear-gradient(165deg, #243044 0%, #121820 100%)',
  'radial-gradient(80% 70% at 100% 0%, rgba(92,140,186,0.5), transparent 55%), linear-gradient(200deg, #1a2740 0%, #101820 100%)',
  'radial-gradient(70% 80% at 100% 100%, rgba(176,92,64,0.42), transparent 50%), linear-gradient(150deg, #2a221c 0%, #14110f 100%)',
  'radial-gradient(80% 60% at 0% 100%, rgba(70,110,90,0.4), transparent 55%), linear-gradient(180deg, #18241e 0%, #101614 100%)',
  'radial-gradient(90% 70% at 80% 0%, rgba(120,100,160,0.38), transparent 52%), linear-gradient(160deg, #221c2c 0%, #121018 100%)',
  'radial-gradient(80% 80% at 0% 20%, rgba(180,150,90,0.32), transparent 55%), linear-gradient(190deg, #242018 0%, #14120e 100%)',
  'radial-gradient(70% 70% at 100% 80%, rgba(70,110,150,0.4), transparent 50%), linear-gradient(170deg, #1a2430 0%, #0e141c 100%)',
];

function RoleCard({ e, i }) {
  return (
    <Reveal
      as="li"
      delay={Math.min(i, 5) * 0.04}
      className="relative flex flex-col justify-between min-h-[15.5rem] p-6 md:p-7 text-paper overflow-hidden"
      style={{ background: FIELDS[i % FIELDS.length] }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-[0.72rem] tracking-[0.16em] uppercase text-paper/55">{e.role}</span>
        <span className="display text-3xl leading-none text-paper/35 text-right">
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
        <p className="text-[0.95rem] leading-relaxed text-paper/75 mt-3">{e.summary}</p>
        {e.location && <p className="text-sm text-paper/45 mt-3">{e.location}</p>}
      </div>
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
          <Reveal className="bg-paper-cool p-6 md:p-7">
            <span className="eyebrow block mb-5">Education</span>
            <div className="space-y-5">
              {education.map((ed) => (
                <div key={ed.org}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-2xl leading-none">{ed.org}</h3>
                    <span className="text-sm text-muted whitespace-nowrap">{ed.period}</span>
                  </div>
                  <p className="text-ink-soft mt-1.5">
                    {ed.degree} <span className="text-muted">— {ed.note}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="bg-night text-paper p-6 md:p-7">
            <span className="eyebrow block mb-5">Skills</span>
            <div className="space-y-4">
              {skills.map((g) => (
                <div key={g.group}>
                  <p className="text-sm text-blue-soft/80 mb-1">{g.group}</p>
                  <p className="leading-relaxed text-paper/80">{g.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
