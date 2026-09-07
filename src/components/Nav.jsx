import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../content';
import OrbitalMark from './OrbitalMark';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`nav ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="wordmark" aria-label="Jake Sanghavi home">
          <OrbitalMark />
          <span>{site.name}</span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {site.nav.map((item) => (
            <NavItem key={item.href} item={item} pathname={location.pathname} />
          ))}
        </nav>
        <div className="nav__actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav__drawer" aria-label="Mobile">
          {site.nav.map((item) => (
            <NavItem key={item.href} item={item} pathname={location.pathname} />
          ))}
        </nav>
      )}
    </header>
  );
}

function NavItem({ item, pathname }) {
  const isHash = item.href.startsWith('/#') || item.href.startsWith('#');
  const current = item.href === '/blog' && pathname.startsWith('/blog');

  if (isHash) {
    const hash = item.href.replace('/#', '#');
    if (pathname === '/') {
      return (
        <a href={hash} className="nav-link">
          {item.label}
        </a>
      );
    }
    return (
      <Link to={item.href} className="nav-link">
        {item.label}
      </Link>
    );
  }

  return (
    <Link to={item.href} className="nav-link" aria-current={current ? 'page' : undefined}>
      {item.label}
    </Link>
  );
}
