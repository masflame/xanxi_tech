import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a system take to build?',
    a: 'It depends on scope and complexity. A focused MVP can take 4–6 weeks, while a full enterprise platform may take 3–6 months. We provide a clear timeline during scoping.',
  },
  {
    q: 'What does it cost to build a system?',
    a: 'Every project is scoped individually. We provide transparent, milestone-based pricing after understanding your requirements during a discovery call.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes. We work with startups, scale-ups, and established enterprises. If you need a reliable system built properly, we are a good fit.',
  },
  {
    q: 'Do you provide ongoing support after launch?',
    a: 'Absolutely. We offer maintenance plans, monitoring, and iterative development so your system keeps performing as your needs evolve.',
  },
  {
    q: 'What technologies do you use?',
    a: 'Our core stack includes React, Supabase, .NET, and modern API-driven architectures. We select tools based on what best fits the project requirements.',
  },
  {
    q: 'Can you integrate with our existing tools?',
    a: 'Yes. System integration is one of our core capabilities. We connect CRMs, ERPs, payment gateways, legacy databases, and third-party APIs.',
  },
];

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      className={`faq-item ${isOpen ? 'is-open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-item__question">{faq.q}</span>
        <motion.span
          className="faq-item__icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="faq-item__answer">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [ref, inView] = useInView(0.1);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="faq" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Questions</span>
          <h2 className="section__title">Frequently Asked</h2>
          <p className="section__subtitle">
            Answers to the questions we hear most.
          </p>
        </motion.div>

        <motion.div
          className="faq__list"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
