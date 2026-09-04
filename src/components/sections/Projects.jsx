import Reveal from '../Reveal';
import { projects } from '../../data/content';

const panelTone = {
  warm: {
    background:
      'radial-gradient(120% 120% at 30% 25%, rgba(224,150,86,0.22) 0%, rgba(0,0,0,0) 55%), linear-gradient(145deg, #1c1a20 0%, #0d1119 100%)',
  },
  cool: {
    background:
      'radial-gradient(120% 120% at 30% 25%, rgba(80,130,180,0.24) 0%, rgba(0,0,0,0) 55%), linear-gradient(145deg, #141e29 0%, #0c1017 100%)',
  },
};

function Featured({ p, flip }) {
  return (
    <Reveal className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className={`${flip ? 'lg:order-2' : ''}`}>
        <div
          className="relative flex items-center justify-center aspect-[5/4] border border-line-night overflow-hidden"
          style={panelTone[p.tone]}
        >
          <img
            src={p.image_url}
            alt={`${p.title}`}
            loading="lazy"
            className="max-h-[62%] max-w-[64%] object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

      <div className={`${flip ? 'lg:order-1' : ''}`}>
        <div className="flex items-baseline gap-5">
          <span className="display text-5xl md:text-6xl text-paper/25 leading-none">{p.index}</span>
          <span className="eyebrow">
            {p.tag}
            {p.year ? ` · ${p.year}` : ''}
          </span>
        </div>
        <h3 className="display text-[clamp(2.4rem,5vw,4.2rem)] mt-4">{p.title}</h3>
        <p className="text-lg leading-relaxed text-paper/70 mt-5 max-w-[46ch]">{p.description}</p>
        <p className="text-sm text-blue-soft/80 mt-5">{p.technologies.join('  ·  ')}</p>
        <div className="flex flex-wrap gap-8 mt-8">
          {p.live_url && (
            <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="link-underline text-paper">
              Visit&nbsp;↗
            </a>
          )}
          {p.github_url && (
            <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="link-underline text-paper/70">
              Source&nbsp;↗
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" data-nav-theme="dark" className="on-dark relative bg-night text-paper py-24 md:py-40">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <Reveal as="h2" className="display text-[clamp(2.2rem,6vw,5rem)] mb-16 md:mb-24 max-w-[14ch]">
          A few things I’ve built.
        </Reveal>

        <div className="space-y-24 md:space-y-36">
          {featured.map((p, i) => (
            <Featured key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>

        {/* compact list */}
        <div className="mt-24 md:mt-36">
          <span className="eyebrow block mb-2">Also</span>
          {rest.map((p) => (
            <Reveal
              as="a"
              key={p.id}
              href={p.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-5 md:gap-10 py-7 border-t border-line-night"
            >
              <span className="display text-3xl md:text-4xl text-paper/25 leading-none">{p.index}</span>
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="display text-2xl md:text-4xl group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <span className="eyebrow">{p.tag}</span>
                </span>
                <span className="block text-paper/60 mt-2 max-w-[52ch]">{p.description}</span>
                <span className="block text-sm text-blue-soft/70 mt-2">{p.technologies.join('  ·  ')}</span>
              </span>
              <span className="text-paper/40 group-hover:text-accent group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </Reveal>
          ))}
          <div className="border-t border-line-night" />
        </div>
      </div>
    </section>
  );
}
