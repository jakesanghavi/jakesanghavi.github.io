import { useForm, ValidationError } from '@formspree/react';
import Reveal from '../Reveal';
import { profile, ENCODED_EMAIL, FORMSPREE_ID } from '../../data/content';

function openGmail(e) {
  e.preventDefault();
  const decoded = atob(ENCODED_EMAIL);
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    decoded,
  )}&su=${encodeURIComponent('Hello, Jake')}&body=${encodeURIComponent('Hi Jake,')}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

const field =
  'w-full bg-transparent border-0 border-b border-line py-3 text-lg text-ink placeholder:text-muted-cool focus:border-accent focus:outline-none transition-colors';

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  return (
    <section id="contact" data-nav-theme="light" className="relative bg-paper text-ink py-28 md:py-44">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <Reveal as="h2" className="display text-[clamp(3rem,11vw,9rem)]">
          Let’s talk.
        </Reveal>

        <div className="mt-14 md:mt-24 grid md:grid-cols-12 gap-x-12 gap-y-16">
          {/* invitation + details */}
          <Reveal className="md:col-span-5">
            <p className="text-xl leading-relaxed text-ink-soft max-w-[40ch]">
              Open to roles, collaborations, or a good conversation — about data, software, or
              the universe.
            </p>

            <div className="mt-10 space-y-4">
              <div>
                <a href="#" onClick={openGmail} className="link-accent text-lg">
                  Send an email
                </a>
              </div>
              <p className="text-muted">{profile.location}, GA</p>
              <div className="flex gap-6 pt-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink-soft"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* form */}
          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            {state.succeeded ? (
              <div className="border-t border-line pt-8">
                <p className="display text-3xl">Thank you.</p>
                <p className="text-ink-soft mt-2">
                  Your message is on its way — I’ll reply soon, usually within a day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="eyebrow block mb-1">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Your name" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow block mb-1">
                    Email
                  </label>
                  <input id="email" type="email" name="email" required placeholder="you@example.com" className={field} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-accent mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow block mb-1">
                    Message
                  </label>
                  <textarea id="message" name="message" required rows={4} placeholder="Say hello…" className={`${field} resize-none`} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-accent mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="border border-ink px-8 py-3 text-base hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
                >
                  {state.submitting ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
