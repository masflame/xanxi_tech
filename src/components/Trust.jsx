import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ShieldCheck, Expand, Zap, Code2 } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Secure Systems',
    desc: 'Enterprise-grade security with RBAC, row-level policies, encryption, and audit logging baked into every layer.',
  },
  {
    icon: Expand,
    title: 'Scalable Architecture',
    desc: 'Systems designed to grow – from hundreds to hundreds of thousands of users without re-architecture.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Agile sprints, continuous deployment, and a lean engineering process that ships production-ready systems fast.',
  },
  {
    icon: Code2,
    title: 'Modern Tech Stack',
    desc: 'React, Supabase, serverless functions, and modern APIs – no legacy frameworks or outdated tools.',
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

export default function Trust() {
  const [ref, inView] = useInView(0.15);

  return (
    <section className="trust" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Why Us</span>
          <h2 className="section__title">Built for Trust</h2>
          <p className="section__subtitle">
            Organisations choose XANZI Tech because we deliver systems they can rely on.
          </p>
        </motion.div>

        <div className="trust__grid">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="trust-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="trust-card__icon">
                <r.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="trust-card__title">{r.title}</h3>
              <p className="trust-card__desc">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
