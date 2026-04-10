import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Lock, ShieldCheck, FileSearch, Scale } from 'lucide-react';

const pillars = [
  {
    icon: Lock,
    title: 'Data Encryption',
    desc: 'All data encrypted at rest and in transit using industry-standard protocols, ensuring sensitive information stays protected.',
  },
  {
    icon: ShieldCheck,
    title: 'RBAC & Row-Level Security',
    desc: 'Granular role-based access control and row-level policies so users only see and interact with what they should.',
  },
  {
    icon: FileSearch,
    title: 'Audit Logs & Monitoring',
    desc: 'Full audit trails for every critical action, combined with real-time monitoring for anomaly detection.',
  },
  {
    icon: Scale,
    title: 'POPIA Compliance',
    desc: 'Systems architected with South Africa\'s Protection of Personal Information Act in mind, from data collection to deletion.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Security() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="security" className="security" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Security & Compliance</span>
          <h2 className="section__title">Built Secure by Default</h2>
          <p className="section__subtitle">
            Security is not an afterthought. Every system we deliver is designed with
            compliance and data protection at its core.
          </p>
        </motion.div>

        <div className="security__grid">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="security-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="security-card__icon">
                <p.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="security-card__title">{p.title}</h3>
              <p className="security-card__desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
