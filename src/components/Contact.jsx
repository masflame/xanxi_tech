import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Send, Mail, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

const CONTACT_TABLE = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || 'Project_Enquiries';
const MIN_FILL_MS = 2500;
const RATE_LIMIT_MS = 15000;

function sanitizeText(value, max = 2500) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasSuspiciousPattern(value) {
  return /(https?:\/\/|<script|<\/|onerror=|javascript:|union\s+select|drop\s+table)/i.test(value);
}

export default function Contact() {
  const [ref, inView] = useInView(0.15);
  const [form, setForm] = useState({ name: '', email: '', message: '', _xhp: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadedAtRef = useRef(Date.now());
  const lastSubmitAtRef = useRef(0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    const fullName = sanitizeText(form.name, 140);
    const email = sanitizeText(form.email, 160).toLowerCase();
    const projectDetails = sanitizeText(form.message, 3000);

    if (form._xhp && form._xhp.trim() !== '') return;

    if (now - loadedAtRef.current < MIN_FILL_MS) {
      setStatus({ type: 'error', message: 'Please take a little more time before submitting.' });
      return;
    }

    if (now - lastSubmitAtRef.current < RATE_LIMIT_MS) {
      setStatus({ type: 'error', message: 'Please wait a few seconds before sending another message.' });
      return;
    }

    if (!fullName || !email || !projectDetails) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({ type: 'error', message: 'Please use a valid email address.' });
      return;
    }

    if (projectDetails.length < 8) {
      setStatus({ type: 'error', message: 'Project details are too short.' });
      return;
    }

    if ([fullName, email, projectDetails].some(hasSuspiciousPattern)) {
      setStatus({ type: 'error', message: 'Your message contains blocked patterns.' });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        type: 'error',
        message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.',
      });
      return;
    }

    try {
      setSubmitting(true);
      setStatus({ type: '', message: '' });

      const payload = {
        full_name: fullName,
        email,
        project_details: projectDetails,
      };

      const { error } = await supabase.from(CONTACT_TABLE).insert([payload]);

      if (error) throw error;

      lastSubmitAtRef.current = now;
      setStatus({ type: 'success', message: 'Message sent successfully. We will get back to you shortly.' });
      setForm({ name: '', email: '', message: '', _xhp: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'We could not send your message. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="section__container">
        <div className="contact__layout">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section__label">Get in Touch</span>
            <h2 className="section__title">Start a Project</h2>
            <p className="contact__desc">
              Ready to build something powerful? Tell us about your system requirements
              and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <Mail size={18} strokeWidth={1.5} />
                <span>hello@xanzitech.com</span>
              </div>
            </div>

            <div className="contact__cta-box">
              <div className="contact__cta-glow" />
              <h4>Not sure where to start?</h4>
              <p>Book a free discovery call and we&apos;ll help scope your project.</p>
              <a href="#contact" className="btn btn--outline btn--sm">
                Let&apos;s Talk <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              name="_xhp"
              value={form._xhp}
              onChange={handleChange}
              className="form-honeypot"
              tabIndex={-1}
              autoComplete="new-password"
              aria-hidden="true"
            />

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                maxLength={140}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                maxLength={160}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Project Details</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project requirements..."
                rows="5"
                maxLength={3000}
                required
              />
            </div>

            {status.message && (
              <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">
                {status.message}
              </p>
            )}

            <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
              {submitting ? 'Sending...' : <>Send Message <Send size={16} /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
