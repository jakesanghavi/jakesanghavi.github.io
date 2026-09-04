import Reveal from '../Reveal';
import CelestialField from '../visuals/CelestialField';
import { resumeSummary, experience, education, skills } from '../../data/content';

export default function Work() {
  return (
    <section
      id="work"
      data-nav-theme="dark"
      className="on-dark relative bg-night text-paper overflow-hidden py-24 md:py-32"
    >
      <CelestialField variant="dusk" />
      {/* readability scrim */}
      <div className="absolute inset-0 bg-night/45" aria-hidden="true" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-14">
        {/* professional summary */}
        <Reveal as="h2" className="display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.12] max-w-[26ch]">
          {resumeSummary}
        </Reveal>

        {/* experience */}
        <div className="mt-14 md:mt-20">
          <Reveal>
            <span className="eyebrow block mb-6">Experience</span>
          </Reveal>

          <ol>
            {experience.map((e, i) => (
              <Reveal
                as="li"
                key={i}
                delay={Math.min(i, 4) * 0.03}
                className="grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-4 md:gap-10 py-6 md:py-7 border-t border-line-night"
              >
                <div className="display text-2xl md:text-4xl text-paper/25 leading-none">{e.year}</div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="display text-xl md:text-[1.9rem] leading-none text-paper">{e.org}</h3>
                    {e.current && (
                      <span className="text-accent text-sm font-medium tracking-wide">Now</span>
                    )}
                  </div>
                  <p className="text-sm text-blue-soft/80 mt-1.5">
                    {e.role} · {e.period}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                  <p className="text-[0.98rem] leading-relaxed text-paper/70 mt-2 max-w-[62ch]">
                    {e.summary}
                  </p>
                </div>
              </Reveal>
            ))}
            <li className="border-t border-line-night" aria-hidden="true" />
          </ol>

          {/* education + skills */}
          <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-x-10 gap-y-12">
            <Reveal className="md:col-span-6">
              <span className="eyebrow block mb-6">Education</span>
              <div className="space-y-6">
                {education.map((ed, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="display text-xl md:text-2xl text-paper">{ed.org}</h4>
                      <span className="text-sm text-blue-soft/70 whitespace-nowrap">{ed.period}</span>
                    </div>
                    <p className="text-paper/70 mt-1">
                      {ed.degree} <span className="text-blue-soft/70">— {ed.note}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
              <span className="eyebrow block mb-6">Skills</span>
              <div className="space-y-5">
                {skills.map((g) => (
                  <div key={g.group}>
                    <p className="text-sm text-blue-soft/70 mb-1">{g.group}</p>
                    <p className="text-paper/80 leading-relaxed">{g.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
