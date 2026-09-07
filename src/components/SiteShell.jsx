import { Outlet } from 'react-router-dom';
import Atmosphere from './Atmosphere';
import Nav from './Nav';
import Footer from './Footer';

export default function SiteShell() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Atmosphere />
      <Nav />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
