import Reveal from '../Reveal';
import { about } from '../../data/content';

export default function About() {
  return (
    <section id="about" data-nav-theme="light" className="relative bg-paper text-ink py-28 md:py-48">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <Reveal as="h2" className="display text-[clamp(2.3rem,6.2vw,5.6rem)] max-w-[17ch]">
          {about.statement.map((s, i) =>
            s.em ? (
              <em key={i} className="italic text-accent">
                {s.t}
              </em>
            ) : (
              <span key={i}>{s.t}</span>
            ),
          )}
        </Reveal>

        <div className="mt-16 md:mt-28 grid md:grid-cols-12 gap-x-10 gap-y-10">
          <Reveal
            delay={0.05}
            className="md:col-span-6 md:col-start-7 space-y-6"
          >
            {about.body.map((p, i) => (
              <p key={i} className="text-lg md:text-xl leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
            <p className="text-base text-muted pt-2">{about.now}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
