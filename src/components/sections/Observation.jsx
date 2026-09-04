import { motion, useReducedMotion } from 'framer-motion';
import Orrery from '../viz/Orrery';
import { profile } from '../../data/content';

export default function Observation() {
  const reduce = useReducedMotion();
  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section
      id="observation"
      className="on-night relative min-h-[100svh] bg-night text-paper overflow-hidden flex items-start lg:items-center"
    >
      <div className="coord-grid absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Orrery (desktop) — offset to the right, bleeding past the edge */}
      <div
        className="hidden lg:block absolute right-[-6%] top-1/2 -translate-y-1/2
                   w-[62vw] max-w-[900px] aspect-square pointer-events-none"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Orrery className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-5 md:px-10 pt-24 pb-16">
        <motion.div {...rise(0)} className="flex items-center gap-4 mb-8">
          <span className="label label--amber">Observation Log № 01</span>
          <span className="tickline w-16 hidden sm:block" aria-hidden="true" />
          <span className="label hidden sm:inline">{profile.coordinates}</span>
        </motion.div>

        <h1 className="font-display font-medium leading-[0.92] tracking-[-0.02em]">
          <motion.span {...rise(0.05)} className="block text-[clamp(3.2rem,13vw,10rem)]">
            Jake
          </motion.span>
          <motion.span
            {...rise(0.14)}
            className="block text-[clamp(3.2rem,13vw,10rem)] text-paper/90"
          >
            Sanghavi
          </motion.span>
        </h1>

        <motion.div {...rise(0.28)} className="mt-8 flex flex-col gap-5 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <span className="u-mono text-sm tracking-[0.24em] uppercase text-amber-bright">
              {profile.role}
            </span>
          </div>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-paper/80">
            {profile.intro}
          </p>
        </motion.div>

        <motion.a
          {...rise(0.42)}
          href="#field-notes"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('field-notes')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-3 mt-14 label"
        >
          <span className="text-blue-soft group-hover:text-amber-bright transition-colors">
            Begin observation
          </span>
          <span
            className={`u-mono text-amber-bright ${reduce ? '' : 'motion-safe:animate-bounce'}`}
            aria-hidden="true"
          >
            ↓
          </span>
        </motion.a>

        {/* Orrery (mobile) — a discrete, fully-visible figure below the intro */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="lg:hidden mt-14 -mb-4 mx-auto w-[84vw] max-w-[420px] aspect-square"
        >
          <Orrery className="w-full h-full" decorative />
        </motion.div>
      </div>

      {/* corner registration marks */}
      <div className="absolute bottom-6 right-6 hidden md:block label label--faint text-right leading-tight">
        <div>EPOCH J2000.0</div>
        <div>FIG. 01 — ORRERY</div>
      </div>
    </section>
  );
}
