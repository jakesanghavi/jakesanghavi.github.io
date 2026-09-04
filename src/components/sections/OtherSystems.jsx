import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import LightCurve from '../viz/LightCurve';
import ScatterPlot from '../viz/ScatterPlot';
import { systems, capabilities } from '../../data/content';

function Readout({ caption, sub, children }) {
  return (
    <div className="bg-paper text-ink p-5 md:p-6 border border-night-line">
      <div className="flex items-center justify-between mb-3">
        <span className="label label--amber">{caption}</span>
        <span className="label label--faint">{sub}</span>
      </div>
      {children}
    </div>
  );
}

export default function OtherSystems() {
  const reduce = useReducedMotion();
  const reveal = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section
      id="systems"
      className="on-night relative bg-night text-paper py-24 md:py-36 overflow-hidden"
    >
      <div className="coord-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading num="05" title="Other Systems" kicker="Analytics & interests" />

        <motion.p
          {...reveal(1)}
          className="mt-6 font-serif text-lg md:text-xl leading-relaxed text-paper/80 max-w-3xl"
        >
          {systems.lead}
        </motion.p>

        <motion.div {...reveal(2)} className="mt-12 grid md:grid-cols-2 gap-5">
          <Readout caption="Transit — synthetic" sub="astronomy">
            <LightCurve className="w-full h-auto" />
          </Readout>
          <Readout caption="Season — model vs. outcome" sub="sport">
            <ScatterPlot className="w-full h-auto" />
          </Readout>
        </motion.div>

        <motion.p {...reveal(3)} className="mt-4 label label--faint max-w-2xl">
          {systems.note}
        </motion.p>

        {/* Capabilities as a catalog index, not a logo wall */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="label label--amber">Instrumentation</span>
            <span className="rule flex-1" />
            <span className="label label--faint">Technical capabilities</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {capabilities.map((c, i) => (
              <motion.div key={c.group} {...reveal(i)}>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="u-mono text-amber-bright text-xs">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="u-mono text-xs tracking-[0.18em] uppercase text-paper">{c.group}</h3>
                </div>
                <ul className="space-y-1.5">
                  {c.items.map((it) => (
                    <li key={it} className="font-serif text-paper/75 leading-snug">
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
