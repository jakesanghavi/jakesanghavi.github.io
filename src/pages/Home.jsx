import Masthead from '../components/Masthead';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Interlude from '../components/sections/Interlude';
import Work from '../components/sections/Work';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Masthead />
      <main>
        <Hero />
        <About />
        <Interlude />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
