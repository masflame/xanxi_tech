import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Landmark, GraduationCap, Building2, FlaskConical } from 'lucide-react';

const industries = [
  {
    icon: Landmark,
    title: 'Government & Public Sector',
    desc: 'Secure platforms for citizen services, compliance management, and inter-departmental data sharing.',
  },
  {
    icon: GraduationCap,
    title: 'Education Institutions',
    desc: 'Digital systems for student management, attendance tracking, and institutional operations.',
  },
  {
    icon: Building2,
    title: 'Corporate Enterprises',
    desc: 'Internal tools, stakeholder portals, and real-time dashboards built for complex organisational needs.',
  },
  {
    icon: FlaskConical,
    title: 'Startups & Innovation Labs',
    desc: 'Scalable MVPs and data-driven platforms that grow with your user base and product roadmap.',
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

export default function Industries() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="industries" className="industries" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Who We Serve</span>
          <h2 className="section__title">Industries We Work With</h2>
          <p className="section__subtitle">
            Tailored solutions for sectors where security, compliance, and scale are
            non-negotiable.
          </p>
        </motion.div>

        <div className="industries__grid">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              className="industry-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="industry-card__icon">
                <ind.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="industry-card__title">{ind.title}</h3>
              <p className="industry-card__desc">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
