import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Layers, ShieldCheck, BarChart3, Plug } from 'lucide-react';

const capabilities = [
  {
    icon: Layers,
    title: 'Platform Development',
    desc: 'End-to-end digital platforms built with modern frameworks, designed for scale and performance from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Portals',
    desc: 'Role-based stakeholder portals with enterprise-grade authentication, encryption, and access control layers.',
  },
  {
    icon: BarChart3,
    title: 'Data Systems & Dashboards',
    desc: 'Real-time analytics dashboards and data pipelines that turn complex information into actionable insights.',
  },
  {
    icon: Plug,
    title: 'System Integration',
    desc: 'Seamless API integrations connecting your existing tools, WordPress sites, and third-party services into unified workflows.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Capabilities() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="capabilities" className="capabilities" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">What We Do</span>
          <h2 className="section__title">Our Capabilities</h2>
          <p className="section__subtitle">
            We don&apos;t build websites. We engineer secure, scalable digital systems
            that power organisations.
          </p>
        </motion.div>

        <div className="capabilities__grid">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="cap-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="cap-card__icon">
                <cap.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="cap-card__title">{cap.title}</h3>
              <p className="cap-card__desc">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
