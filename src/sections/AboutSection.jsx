import { about } from '../content';
import portrait from '../assets/denver_me.jpeg';

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="wrap about-layout">
        <div>
          <p className="section-kicker">{about.kicker}</p>
          <h2 className="section-title">{about.headline}</h2>
          <p className="lede">{about.summary}</p>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="prose-copy">
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <img className="portrait" src={portrait} alt="Jake Sanghavi" />
        </div>
      </div>
      <div className="wrap thread-grid" style={{ marginTop: '2rem' }}>
        {about.threads.map((thread) => (
          <article key={thread.id} className="panel thread-card">
            <p className="meta">{thread.label}</p>
            <h3>{thread.title}</h3>
            <p className="prose-copy" style={{ margin: 0 }}>
              {thread.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
