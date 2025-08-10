import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import Button from '../overrides/Button';
import Input from '../overrides/Input';
import Textarea from '../overrides/TextArea';

export default function ContactSection() {
  const [state, handleSubmit] = useForm('xwpqabby'); // Replace with your own Formspree form ID

  // Icons are apparently deprecated so need an alternate to lucide soon
  const socialLinks = [
    { icon: Github, href: 'https://github.com/jakesanghavi', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/jake-sanghavi', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/jakesanghavi', label: 'Twitter' }
  ];

  const encodedEmail = "amFrZS5zYW5naGF2aUBnbWFpbC5jb20=";

  // Open Gmail tab w filled in send to, subject, and starter heading
  const handleEmailClick = (e) => {
    e.preventDefault();
    const decoded = atob(encodedEmail);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      decoded
    )}&su=${encodeURIComponent("Portfolio Contact")}&body=${encodeURIComponent(
      "Hi Jake,"
    )}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            I'm always excited to discuss opportunities, collaborate on interesting projects, and meet new people.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-slate-300">Thanks for reaching out. I'll get back to you soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 resize-none focus:border-blue-400"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {state.submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                The best way to reach me is via email. I typically respond within 24 hours.
              </p>
            </div>

            {/* Call the contact function over the link to circumvent the form if people prefer that
            May eventually change this to just my own backend if I end up wanting to pay for it. */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: (
                    <>
                      Use the contact form to email me, or {' '}
                      <a
                        href="#"
                        onClick={handleEmailClick}
                        className="text-blue-400 hover:underline"
                      >
                        click here to open Gmail
                      </a>
                      .
                    </>
                  ),
                },
                { icon: Phone, label: 'Phone', value: 'Please email ahead to request a phone interview.' },
                { icon: MapPin, label: 'Current Location', value: 'Atlanta, GA' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{item.label}</p>
                    <p className="text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me!</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-slate-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="text-slate-400 hover:text-white transition-colors duration-300" size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
