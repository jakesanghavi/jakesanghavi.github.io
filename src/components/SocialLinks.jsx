import { Github, Linkedin } from 'lucide-react';
import { site } from '../content';

export default function SocialLinks() {
  return (
    <div className="social-row">
      <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Github size={18} />
      </a>
      <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Linkedin size={18} />
      </a>
    </div>
  );
}
