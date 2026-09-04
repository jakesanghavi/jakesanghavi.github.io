import { useEffect, useState } from 'react';
import { sections, profile } from '../data/content';
import useActiveSection from '../lib/useActiveSection';

const ids = sections.map((s) => s.id);

export default function Masthead() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 flex items-center justify-between">
          <a href="#observation" onClick={go('observation')} className="group flex items-baseline gap-3">
            <span className="font-display text-lg md:text-xl font-medium tracking-[-0.01em] text-ink">
              Jake Sanghavi
            </span>
            <span className="label label--faint hidden sm:inline">{profile.role}</span>
          </a>

          {/* desktop index */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Sections">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className="group flex items-center gap-2 py-1"
                >
                  <span
                    className={`u-mono text-[0.7rem] tracking-[0.1em] transition-colors ${
                      on ? 'text-amber' : 'text-graphite-dim'
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`text-[0.82rem] transition-colors ${
                      on ? 'text-ink' : 'text-graphite group-hover:text-ink'
                    }`}
                  >
                    {s.title}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* mobile toggle */}
          <button
            className="md:hidden flex items-center gap-2 label"
            aria-expanded={open}
            aria-label="Toggle section index"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Close' : 'Index'}</span>
            <span className="u-mono text-amber">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </header>

      {/* mobile overlay index */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-night/95 backdrop-blur-sm on-night" />
        <nav className="relative h-full flex flex-col justify-center px-8 gap-1 on-night" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={go(s.id)}
              className="flex items-baseline gap-4 py-3 border-b border-night-line"
            >
              <span className="u-mono text-sm text-amber-bright">{s.num}</span>
              <span className="font-display text-3xl text-paper">{s.title}</span>
            </a>
          ))}
          <p className="label mt-8">{profile.coordinates}</p>
        </nav>
      </div>
    </>
  );
}
