import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    num: '01',
    title: 'Discovery & Requirements',
    desc: 'We start by understanding your organisation, stakeholders, and goals. Through structured sessions we map out exactly what needs to be built.',
  },
  {
    icon: PenTool,
    num: '02',
    title: 'System Architecture & Planning',
    desc: 'We design the data models, security layers, integrations, and user flows before writing a single line of code.',
  },
  {
    icon: Code2,
    num: '03',
    title: 'Development & Iteration',
    desc: 'We build in focused sprints, delivering functional milestones you can review and test at every stage.',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Deployment & Scaling',
    desc: 'Your system goes live with monitoring, documentation, and a clear path for future growth.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Process() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="process" className="process" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">How It Works</span>
          <h2 className="section__title">Our Process</h2>
          <p className="section__subtitle">
            A structured, transparent approach from first conversation to production launch.
          </p>
        </motion.div>

        <div className="process__grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="process-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="process-card__top">
                <div className="process-card__icon">
                  <step.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="process-card__num">{step.num}</span>
              </div>
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="process-card__connector" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
