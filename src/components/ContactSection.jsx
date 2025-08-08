import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import Button from './Button'
import Input from './Input'
import Textarea from './TextArea';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const SendEmail = async ({ to, subject, body }) => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, body }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email.');
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await SendEmail({
        to: 'john.doe@example.com',
        subject: `Portfolio Contact: ${formData.name}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          
          Message:
          ${formData.message}
        `
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/jakesanghavi', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/jake-sanghavi', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/jakesanghavi', label: 'Twitter' }
  ];

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

            {submitted ? (
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
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 resize-none focus:border-blue-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
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
                {/* PH */}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'john.doe@example.com', href: 'mailto:john.doe@example.com' },
                { icon: Phone, label: 'Phone', value: 'Please email ahead to request a phone interview.' },
                { icon: MapPin, label: 'Location', value: 'Atlanta, GA' }
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
                    {item.href ? (
                      <a href={item.href} className="text-white hover:text-blue-400 transition-colors duration-300">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white">{item.value}</p>
                    )}
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