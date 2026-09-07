import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../content';
import ProjectMotif from '../components/ProjectMotif';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <p className="section-kicker">Live orbits</p>
        <h2 className="section-title">Projects</h2>
        <p className="lede">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Featured work first — Cue Tavern
          and Roamio are live.
        </p>
      </div>
      <div className="wrap project-grid" style={{ marginTop: '2rem' }}>
        {projects.map((project) => (
          <article key={project.id} className="panel project-card project-card--featured">
            <div>
              {project.period ? <p className="meta">{project.period}</p> : <p className="meta">Live</p>}
              <h3>{project.title}</h3>
              <p className="prose-copy">{project.summary}</p>
              <p className="prose-copy">{project.description}</p>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="hero__actions">
                {project.liveUrl ? (
                  <a className="btn btn--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Live site
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a className="btn btn--ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    Code
                  </a>
                ) : null}
              </div>
            </div>
            <div className="project-visual">
              <ProjectMotif motif={project.motif} />
              {project.logo ? <img src={project.logo} alt="" /> : <span className="meta">LifeOS</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
