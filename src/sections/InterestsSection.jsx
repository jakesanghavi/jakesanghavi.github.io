import { interests } from '../content';
import PlaceholderPhoto from '../components/PlaceholderPhoto';

export default function InterestsSection() {
  return (
    <section id="interests" className="section">
      <div className="wrap">
        <p className="section-kicker">{interests.kicker}</p>
        <h2 className="section-title">{interests.headline}</h2>
        <p className="lede">{interests.intro}</p>
      </div>
      <div className="wrap gallery-grid" style={{ marginTop: '2rem' }}>
        {interests.gallery.map((item) => (
          <figure key={item.id} className="panel gallery-card" style={{ margin: 0 }}>
            <PlaceholderPhoto variant={item.variant} title={item.title} />
            <figcaption>
              <h3>{item.title}</h3>
              <p className="meta">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="wrap" style={{ marginTop: '1.4rem' }}>
        <article className="panel" style={{ padding: '1.4rem 1.5rem' }}>
          <p className="meta">Independent sports moment</p>
          <h3 className="section-title" style={{ fontSize: '1.8rem' }}>
            {interests.sports.title}
          </h3>
          <p className="prose-copy" style={{ marginBottom: 0 }}>
            {interests.sports.body}
          </p>
          <svg viewBox="0 0 640 90" className="mt-4" aria-hidden="true">
            <path d="M20 70 C 140 70, 140 20, 320 20 S 500 70, 620 18" fill="none" stroke="var(--copper)" strokeWidth="1.6" />
            <circle cx="20" cy="70" r="4" fill="var(--copper)" />
            <circle cx="620" cy="18" r="4" fill="var(--gold)" />
          </svg>
        </article>
      </div>
    </section>
  );
}
