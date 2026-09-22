import Masthead from '../components/Masthead';
import Hero from '../components/sections/Hero';
import Work from '../components/sections/Work';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Masthead />
      <main>
        <Hero />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
