import { Link } from 'react-router-dom';
import { education, experience, skillGroups } from '../content';

export default function ResumeSection() {
  return (
    <section id="resume" className="section">
      <svg className="wrap" viewBox="0 0 1120 72" aria-hidden="true" style={{ display: 'block', marginBottom: '0.5rem' }}>
        <path d="M40 36 H 1080" stroke="var(--ink)" strokeOpacity="0.12" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={40 + i * 104} y1="18" x2={40 + i * 104} y2="54" stroke="var(--ink)" strokeOpacity="0.12" />
        ))}
        <circle cx="560" cy="36" r="16" fill="none" stroke="var(--copper)" strokeOpacity="0.55" />
        <path d="M40 60 C 300 10, 820 62, 1080 16" fill="none" stroke="var(--copper)" strokeOpacity="0.45" />
      </svg>
      <div className="wrap resume-top">
        <div>
          <p className="section-kicker">Trajectory</p>
          <h2 className="section-title">Resume</h2>
          <p className="lede">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A scannable record of roles,
            research, and production systems.
          </p>
        </div>
        <div className="hero__actions" style={{ marginTop: '2.4rem' }}>
          <Link className="btn btn--primary" to="/resume">
            Printable / PDF
          </Link>
        </div>
      </div>

      <div className="wrap job-list" style={{ marginTop: '2rem' }}>
        {experience.map((job) => (
          <article key={job.id} className="panel job">
            <header>
              <div>
                <p className="meta">
                  {job.company} · {job.location}
                </p>
                <h3>{job.title}</h3>
              </div>
              <p className="meta">
                {job.start}–{job.end}
              </p>
            </header>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="wrap education-grid" style={{ marginTop: '1.4rem' }}>
        {education.map((item) => (
          <article key={item.id} className="panel edu-card">
            <p className="meta">
              {item.start}–{item.end}
            </p>
            <h3>{item.school}</h3>
            <p className="prose-copy" style={{ margin: 0 }}>
              {item.degree}. {item.detail}
            </p>
          </article>
        ))}
      </div>

      <div className="wrap skill-groups" style={{ marginTop: '1.4rem' }}>
        {skillGroups.map((group) => (
          <article key={group.id} className="panel skill-card">
            <h3 style={{ marginTop: 0 }}>{group.label}</h3>
            <div className="chip-cloud">
              {group.items.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
