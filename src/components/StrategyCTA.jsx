import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { CalendarCheck, ArrowRight } from 'lucide-react';

const benefits = [
  'Understand your system requirements',
  'Map out the right technical approach',
  'Get a clear project timeline and scope',
];

export default function StrategyCTA() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="strategy" className="strategy-cta" ref={ref}>
      <div className="section__container">
        <motion.div
          className="strategy-cta__inner"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="strategy-cta__content">
            <div className="strategy-cta__icon">
              <CalendarCheck size={32} strokeWidth={1.5} />
            </div>
            <h2 className="strategy-cta__title">Book a Strategy Call</h2>
            <p className="strategy-cta__desc">
              Not sure where to start? Let&apos;s talk. In a focused 15-30 minute call, we will:
            </p>
            <ul className="strategy-cta__list">
              {benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <a href="#contact" className="btn">
              Schedule a Call <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
