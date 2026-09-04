import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { projects } from '../../data/content';

function Corners() {
  const base = 'absolute w-3 h-3 border-amber';
  return (
    <>
      <span className={`${base} border-t border-l top-0 left-0`} aria-hidden="true" />
      <span className={`${base} border-t border-r top-0 right-0`} aria-hidden="true" />
      <span className={`${base} border-b border-l bottom-0 left-0`} aria-hidden="true" />
      <span className={`${base} border-b border-r bottom-0 right-0`} aria-hidden="true" />
    </>
  );
}

function Featured({ p, flip }) {
  const reduce = useReducedMotion();
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] },
      };

  return (
    <motion.article
      {...anim}
      className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        flip ? '' : ''
      }`}
    >
      {/* plate */}
      <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <div className="relative bg-paper-dim border border-line p-6 md:p-10">
          <Corners />
          <div className="coord-grid--paper absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative flex items-center justify-center aspect-[16/10]">
            <img
              src={p.image_url}
              alt={`${p.title} — project artwork`}
              loading="lazy"
              className="max-h-full max-w-[72%] object-contain drop-shadow-sm"
            />
          </div>
          <div className="relative flex items-center justify-between mt-4 pt-3 border-t border-line">
            <span className="label">{p.designation} · plate</span>
            <span className="label label--faint">{p.kind}</span>
          </div>
        </div>
      </div>

      {/* text */}
      <div className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:pr-6' : 'lg:pl-6'}`}>
        <div className="flex items-baseline gap-3">
          <span className="index-num text-amber text-sm">{p.designation}</span>
          <span className="tickline w-14" aria-hidden="true" />
        </div>
        <h3 className="font-display text-4xl md:text-5xl font-medium mt-3 tracking-[-0.01em]">
          {p.title}
        </h3>

        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-5">
          {p.metrics?.map((m) => (
            <div key={m.k}>
              <div className="font-display text-2xl leading-none">{m.v}</div>
              <div className="label mt-1">{m.k}</div>
            </div>
          ))}
        </div>

        <p className="font-serif text-lg leading-relaxed text-ink-soft mt-6 prose-measure">
          {p.description}
        </p>

        <p className="u-mono text-[0.72rem] tracking-[0.08em] text-graphite mt-5">
          {p.technologies.join('  ·  ')}
        </p>

        <div className="flex flex-wrap gap-6 mt-7">
          {p.live_url && (
            <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="link-mark u-mono text-sm tracking-[0.1em] uppercase">
              Visit ↗
            </a>
          )}
          {p.github_url && (
            <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="link-mark u-mono text-sm tracking-[0.1em] uppercase">
              Source ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CatalogRow({ p, i }) {
  const reduce = useReducedMotion();
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.6 },
        transition: { duration: 0.6, delay: i * 0.08 },
      };
  const href = p.github_url || p.live_url || '#';
  return (
    <motion.a
      {...anim}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 py-6 border-t border-line hover:bg-paper-dim/60 transition-colors px-2 -mx-2"
    >
      <span className="index-num text-graphite text-xs md:text-sm w-16 md:w-20">{p.designation}</span>
      <div>
        <h4 className="font-display text-xl md:text-2xl group-hover:text-amber transition-colors">
          {p.title}
        </h4>
        <p className="font-serif text-ink-soft mt-1 max-w-xl">{p.description}</p>
        <p className="u-mono text-[0.7rem] tracking-[0.08em] text-graphite mt-2">
          {p.technologies.join('  ·  ')}
        </p>
      </div>
      <span className="u-mono text-graphite group-hover:text-amber transition-transform group-hover:translate-x-1">
        ↗
      </span>
    </motion.a>
  );
}

export default function Experiments() {
  const featured = projects.filter((p) => p.featured);
  const catalog = projects.filter((p) => !p.featured);

  return (
    <section id="experiments" className="relative bg-paper text-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading num="04" title="Experiments" kicker="Selected work" />

        <div className="mt-16 space-y-24 md:space-y-32">
          {featured.map((p, i) => (
            <Featured key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-24">
          <div className="flex items-center gap-4 mb-2">
            <span className="label label--amber">Catalog</span>
            <span className="rule flex-1" />
            <span className="label label--faint">Open-source research</span>
          </div>
          {catalog.map((p, i) => (
            <CatalogRow key={p.id} p={p} i={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
