import { Link } from 'react-router-dom';
import { education, experience, site, skillGroups } from '../content';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ResumePage() {
  usePageTitle('Resume');

  return (
    <div className="page-hero">
      <div className="wrap no-print resume-top">
        <div>
          <p className="section-kicker">Printable</p>
          <h1 className="section-title">Resume</h1>
          <p className="lede">{site.summary}</p>
        </div>
        <div className="hero__actions" style={{ marginTop: '2.4rem' }}>
          <button type="button" className="btn btn--primary" onClick={() => window.print()}>
            Download PDF
          </button>
          <Link className="btn btn--ghost" to="/#resume">
            Back
          </Link>
        </div>
      </div>

      <div className="wrap print-only">
        <h1>{site.name}</h1>
        <p>{site.role} · {site.location}</p>
        <p>{site.summary}</p>
      </div>

      <div className="wrap job-list" style={{ marginTop: '1.5rem' }}>
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

      <div className="wrap education-grid" style={{ marginTop: '1.2rem' }}>
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

      <div className="wrap skill-groups" style={{ marginTop: '1.2rem', paddingBottom: '4rem' }}>
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
    </div>
  );
}
