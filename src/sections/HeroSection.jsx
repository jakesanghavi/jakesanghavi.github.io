import { site } from '../content';
import HeroStage from '../components/HeroStage';
import SocialLinks from '../components/SocialLinks';

export default function HeroSection() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div>
          <p className="hero__role">{site.role}</p>
          <h1>{site.name}</h1>
          <p className="lede">{site.summary}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              View work
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
          </div>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
        <HeroStage />
      </div>
    </section>
  );
}
