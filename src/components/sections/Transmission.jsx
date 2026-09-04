import { motion, useReducedMotion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import SectionHeading from '../ui/SectionHeading';
import { profile, ENCODED_EMAIL, FORMSPREE_ID } from '../../data/content';

function openGmail(e) {
  e.preventDefault();
  const decoded = atob(ENCODED_EMAIL);
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    decoded,
  )}&su=${encodeURIComponent('Hello, Jake')}&body=${encodeURIComponent('Hi Jake,')}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

const fieldClass =
  'w-full bg-transparent border-0 border-b border-line py-3 font-serif text-lg text-ink placeholder:text-graphite-dim focus:border-amber focus:outline-none transition-colors';

export default function Transmission() {
  const reduce = useReducedMotion();
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const reveal = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section id="transmission" className="relative bg-paper text-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading num="06" title="Contact" kicker="A quiet conclusion" />

        <div className="mt-14 grid lg:grid-cols-12 gap-x-12 gap-y-16">
          {/* left — invitation + coordinates */}
          <motion.div {...reveal(0)} className="lg:col-span-5">
            <p className="font-display text-2xl md:text-3xl leading-snug tracking-[-0.01em]">
              If any of this resonates — a role, a collaboration, or simply a good conversation —
              I’d be glad to hear from you.
            </p>

            <dl className="mt-10">
              <div className="flex items-baseline justify-between gap-4 py-3 border-t border-line">
                <dt className="label">Email</dt>
                <dd>
                  <a href="#" onClick={openGmail} className="link-mark font-serif text-lg">
                    Open a message ↗
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3 border-t border-line">
                <dt className="label">Location</dt>
                <dd className="font-serif text-lg">{profile.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3 border-t border-b border-line">
                <dt className="label">Coordinates</dt>
                <dd className="u-mono text-sm text-graphite">{profile.coordinates}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-6 mt-8">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span className="label group-hover:text-amber transition-colors">{s.label}</span>
                  <span className="block font-serif text-ink-soft group-hover:text-ink transition-colors">
                    {s.handle} ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* right — transmission form */}
          <motion.div {...reveal(1)} className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="label label--amber">Transmission</span>
              <span className="rule flex-1" />
            </div>

            {state.succeeded ? (
              <div className="border border-line p-8">
                <p className="u-mono text-sm text-amber mb-2">SIGNAL RECEIVED</p>
                <p className="font-display text-2xl">Thanks for reaching out.</p>
                <p className="font-serif text-ink-soft mt-2">
                  Your message is on its way — I’ll respond soon, usually within a day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="label block mb-1">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Your name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className="label block mb-1">
                    Email
                  </label>
                  <input id="email" type="email" name="email" required placeholder="you@example.com" className={fieldClass} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="u-mono text-xs text-amber mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="label block mb-1">
                    Message
                  </label>
                  <textarea id="message" name="message" required rows={5} placeholder="Say hello…" className={`${fieldClass} resize-none`} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="u-mono text-xs text-amber mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="group inline-flex items-center gap-3 border border-ink px-7 py-3 hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
                >
                  <span className="u-mono text-sm tracking-[0.18em] uppercase">
                    {state.submitting ? 'Sending' : 'Send'}
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
