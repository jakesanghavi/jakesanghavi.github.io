import Reveal from '../Reveal';
import { projects } from '../../data/content';

const TONES = {
  warm:
    'radial-gradient(90% 70% at 15% 0%, rgba(214,138,62,0.5), transparent 55%), linear-gradient(165deg, #2a2118 0%, #120e0c 100%)',
  cool:
    'radial-gradient(90% 70% at 85% 0%, rgba(86,140,190,0.48), transparent 55%), linear-gradient(165deg, #152433 0%, #0c1218 100%)',
  field:
    'radial-gradient(80% 70% at 0% 100%, rgba(46,110,72,0.45), transparent 55%), linear-gradient(160deg, #14241c 0%, #0c1410 100%)',
  ink:
    'radial-gradient(80% 60% at 100% 100%, rgba(180,70,48,0.4), transparent 52%), linear-gradient(170deg, #241416 0%, #120c0e 100%)',
};

function ProjectCard({ p, i }) {
  const href = p.live_url || p.github_url;
  return (
    <Reveal
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      delay={Math.min(i, 3) * 0.05}
      className="group flex flex-col min-h-[22rem] text-paper overflow-hidden"
      style={{ background: TONES[p.tone] || TONES.ink }}
    >
      <div className="relative h-40 md:h-44 flex items-center justify-center">
        {p.image_url && (
          <img
            src={p.image_url}
            alt=""
            loading="lazy"
            className="max-h-24 max-w-[46%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 md:px-7 md:pb-7">
        <span className="text-[0.72rem] tracking-[0.16em] uppercase text-paper/50">
          {p.tag}
          {p.year ? ` · ${p.year}` : ''}
        </span>
        <h3 className="display text-3xl md:text-4xl mt-2 leading-none group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-paper/70 mt-3">{p.description}</p>
        <div className="mt-auto pt-5 flex items-end justify-between gap-4">
          <p className="text-xs text-paper/45">{p.technologies.slice(0, 4).join(' · ')}</p>
          <span className="text-sm text-paper/70 group-hover:text-accent transition-colors">↗</span>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-nav-theme="dark" className="on-dark relative bg-night text-paper py-20 md:py-28">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <Reveal className="mb-10">
          <h2 className="display text-4xl md:text-6xl">Selected work</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
