import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ResumeSection from '../sections/ResumeSection';
import ProjectsSection from '../sections/ProjectsSection';
import InterestsSection from '../sections/InterestsSection';
import ContactSection from '../sections/ContactSection';
import SectionDivider from '../components/SectionDivider';

export default function HomePage() {
  const location = useLocation();
  usePageTitle('');

  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.replace('#', '');
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ResumeSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <InterestsSection />
      <SectionDivider />
      <ContactSection />
    </>
  );
}
