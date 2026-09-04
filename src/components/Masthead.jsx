import { useEffect, useState } from 'react';
import { profile, nav } from '../data/content';
import useActiveSection from '../lib/useActiveSection';

const ids = nav.map((n) => n.id);

export default function Masthead() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const probe = 34; // just below the nav baseline
      const secs = document.querySelectorAll('[data-nav-theme]');
      for (const sec of secs) {
        const r = sec.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTheme(sec.getAttribute('data-nav-theme') || 'dark');
          break;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const dark = theme === 'dark';
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id === 'top' ? 'top' : id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          dark ? 'text-paper' : 'text-ink'
        } ${
          scrolled
            ? dark
              ? 'bg-night/70 backdrop-blur-md border-b border-line-night-soft'
              : 'bg-paper/75 backdrop-blur-md border-b border-line-soft'
            : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-14 h-16 flex items-center justify-between">
          <a href="#top" onClick={go('top')} className="display text-lg tracking-tight">
            {profile.name}
          </a>

          <nav className="hidden md:flex items-center gap-9" aria-label="Sections">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                className={`text-sm transition-colors ${
                  active === n.id
                    ? 'text-accent'
                    : dark
                      ? 'text-paper/70 hover:text-paper'
                      : 'text-ink-soft hover:text-ink'
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden text-sm"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-night/96 backdrop-blur-sm" />
        <nav className="relative h-full flex flex-col justify-center px-8 gap-2" aria-label="Sections">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={go(n.id)}
              className="display text-4xl text-paper py-2"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
