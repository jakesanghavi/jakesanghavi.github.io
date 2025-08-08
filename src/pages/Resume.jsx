import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';

export default function Resume() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}