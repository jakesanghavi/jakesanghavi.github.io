import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { experience, education } from '../../data/content';

export default function Trajectory() {
  const reduce = useReducedMotion();
  const reveal = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section
      id="trajectory"
      className="on-night relative bg-night text-paper py-24 md:py-36 overflow-hidden"
    >
      <div className="coord-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-3xl">
          <SectionHeading num="03" title="Trajectory" kicker="Professional record" />
          <p className="mt-6 font-serif text-lg text-paper/70 prose-measure">
            A path plotted through four positions in data science and analytics — most
            recent first.
          </p>
        </div>

        <ol className="mt-16">
          {experience.map((e, i) => (
            <motion.li
              key={e.designation}
              {...reveal(i)}
              className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[7rem_1fr] gap-4 md:gap-10"
            >
              <div className="text-right pt-1">
                <div className="u-mono text-amber-bright text-sm">{e.year}</div>
                <div className="label label--faint mt-1 hidden md:block">{e.designation}</div>
              </div>

              <div className="relative border-l border-night-line pl-6 md:pl-10 pb-12">
                {/* node marker */}
                <span
                  className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-night border border-amber"
                  aria-hidden="true"
                >
                  <span className="absolute inset-[3px] rounded-full bg-amber" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-paper leading-none">
                    {e.org}
                  </h3>
                  {e.current && (
                    <span className="u-mono text-[0.62rem] tracking-[0.2em] uppercase text-night bg-amber-bright px-2 py-0.5">
                      Current
                    </span>
                  )}
                </div>

                <p className="font-serif text-blue-soft mt-1.5">
                  {e.role} <span className="text-graphite-dim">· {e.period}</span>
                </p>

                <p className="font-serif text-paper/75 leading-relaxed mt-3 prose-measure">
                  {e.summary}
                </p>

                <p className="u-mono text-[0.72rem] tracking-[0.08em] text-blue-soft/80 mt-4">
                  {e.tags.join('  ·  ')}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Education */}
        <motion.div {...reveal(0)} className="mt-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="label label--amber">Instruction</span>
            <span className="rule flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-night-line border border-night-line">
            {education.map((ed) => (
              <div key={ed.designation} className="bg-night p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl md:text-2xl text-paper">{ed.org}</h3>
                  <span className="u-mono text-xs text-amber-bright whitespace-nowrap">{ed.period}</span>
                </div>
                <p className="font-serif text-blue-soft mt-1">{ed.degree}</p>
                <p className="font-serif text-paper/70 leading-relaxed mt-3">{ed.summary}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
