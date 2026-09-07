import { useForm, ValidationError } from '@formspree/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { contact, site } from '../content';
import SocialLinks from '../components/SocialLinks';
import { openGmail } from '../lib/email';

export default function ContactSection() {
  const [state, handleSubmit] = useForm(site.formspreeId);

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <p className="section-kicker">{contact.kicker}</p>
        <h2 className="section-title">{contact.headline}</h2>
        <p className="lede">{contact.intro}</p>
      </div>
      <div className="wrap contact-layout" style={{ marginTop: '2rem' }}>
        <article className="panel contact-card">
          <h3>Send a message</h3>
          {state.succeeded ? (
            <p className="prose-copy">{contact.formSuccess}</p>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit}>
              <label className="field">
                <span>Name</span>
                <input id="name" name="name" required autoComplete="name" />
              </label>
              <label className="field">
                <span>Email</span>
                <input id="email" type="email" name="email" required autoComplete="email" />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea id="message" name="message" required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </label>
              <button className="btn btn--primary" type="submit" disabled={state.submitting}>
                <Send size={16} />
                {state.submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </article>
        <div className="job-list">
          <article className="panel contact-card">
            <p className="meta">Email</p>
            <h3>
              <button type="button" className="nav-link" onClick={() => openGmail()} style={{ padding: 0 }}>
                <Mail size={16} className="mr-2 inline" /> Open Gmail
              </button>
            </h3>
          </article>
          <article className="panel contact-card">
            <p className="meta">Location</p>
            <h3>
              <MapPin size={16} className="mr-2 inline" />
              {site.location}
            </h3>
          </article>
          <article className="panel contact-card">
            <p className="meta">Phone</p>
            <h3>
              <Phone size={16} className="mr-2 inline" />
              {contact.phoneNote}
            </h3>
          </article>
          <article className="panel contact-card">
            <p className="meta">Elsewhere</p>
            <SocialLinks />
          </article>
        </div>
      </div>
    </section>
  );
}
