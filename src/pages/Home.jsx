import Masthead from '../components/Masthead';
import Observation from '../components/sections/Observation';
import FieldNotes from '../components/sections/FieldNotes';
import Trajectory from '../components/sections/Trajectory';
import Experiments from '../components/sections/Experiments';
import OtherSystems from '../components/sections/OtherSystems';
import Transmission from '../components/sections/Transmission';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <a
        href="#field-notes"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Masthead />
      <main>
        <Observation />
        <FieldNotes />
        <Trajectory />
        <Experiments />
        <OtherSystems />
        <Transmission />
      </main>
      <Footer />
    </>
  );
}
