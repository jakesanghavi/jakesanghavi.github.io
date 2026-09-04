import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import StarChart from '../viz/StarChart';
import { fieldNotes } from '../../data/content';

export default function FieldNotes() {
  const reduce = useReducedMotion();
  const reveal = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section id="field-notes" className="relative bg-paper text-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading num="02" title="Field Notes" kicker="On curiosity" />

        <div className="mt-14 grid lg:grid-cols-12 gap-x-12 gap-y-14">
          {/* marginal figure + observed log */}
          <motion.aside {...reveal(0)} className="lg:col-span-4 lg:pt-2">
            <div className="border border-line p-4">
              <StarChart className="w-full h-auto" />
              <div className="rule my-3" />
              <p className="label">Fig. 02 — self-portrait, invented constellation</p>
            </div>

            <dl className="mt-8">
              {fieldNotes.observed.map((o, i) => (
                <div
                  key={o.k}
                  className={`flex items-baseline justify-between gap-4 py-2.5 ${
                    i === 0 ? '' : 'border-t border-line'
                  }`}
                >
                  <dt className="label">{o.k}</dt>
                  <dd className="font-serif text-right text-ink-soft">{o.v}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>

          {/* the account */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.p
              {...reveal(1)}
              className="font-display text-2xl md:text-3xl leading-snug text-ink mb-8 tracking-[-0.01em]"
            >
              {fieldNotes.lead}
            </motion.p>
            <div className="prose-measure space-y-6">
              {fieldNotes.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  {...reveal(i + 2)}
                  className="font-serif text-lg leading-relaxed text-ink-soft"
                >
                  <span className="u-mono text-amber text-sm mr-2 align-top">§{i + 1}</span>
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
