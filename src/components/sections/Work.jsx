import Reveal from '../Reveal';
import { experience, education, tools } from '../../data/content';

export default function Work() {
  return (
    <section id="work" data-nav-theme="light" className="relative bg-paper-cool text-ink py-24 md:py-40">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <Reveal className="flex items-end justify-between gap-6 mb-14 md:mb-20">
          <span className="eyebrow">Experience</span>
          <span className="eyebrow">2022 — present</span>
        </Reveal>

        <ol>
          {experience.map((e, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 0.04}
              className="grid md:grid-cols-[7.5rem_1fr] gap-3 md:gap-14 py-9 md:py-12 border-t border-line"
            >
              <div className="display text-[clamp(1.9rem,4vw,3.4rem)] text-ink/45 leading-none">
                {e.year}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-3xl md:text-[2.6rem] leading-none">{e.org}</h3>
                  {e.current && (
                    <span className="text-accent text-sm font-medium tracking-wide">Now</span>
                  )}
                </div>
                <p className="text-base text-muted mt-2">
                  {e.role} · {e.period}
                </p>
                <p className="text-lg leading-relaxed text-ink-soft mt-4 max-w-[54ch]">
                  {e.summary}
                </p>
              </div>
            </Reveal>
          ))}
          <li className="border-t border-line" aria-hidden="true" />
        </ol>

        {/* Education + tools — a quiet coda */}
        <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-x-10 gap-y-12">
          <Reveal className="md:col-span-6">
            <span className="eyebrow block mb-6">Education</span>
            <div className="space-y-6">
              {education.map((ed, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="display text-xl md:text-2xl">{ed.org}</h4>
                    <span className="text-sm text-muted whitespace-nowrap">{ed.period}</span>
                  </div>
                  <p className="text-ink-soft mt-1">
                    {ed.degree} <span className="text-muted">— {ed.note}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-5 md:col-start-8">
            <span className="eyebrow block mb-6">Tools</span>
            <p className="text-lg leading-relaxed text-ink-soft">
              {tools.join(', ')}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
