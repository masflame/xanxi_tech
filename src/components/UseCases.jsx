import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Users, BarChart3, Smartphone, RefreshCw, ArrowRight } from 'lucide-react';

const useCases = [
  {
    icon: Users,
    need: 'Need to manage stakeholders?',
    solution: 'We build secure portals with role-based access and real-time content management.',
  },
  {
    icon: BarChart3,
    need: 'Need real-time insights?',
    solution: 'We build interactive dashboards with live data pipelines and visual analytics.',
  },
  {
    icon: Smartphone,
    need: 'Need a digital product?',
    solution: 'We engineer responsive web and mobile applications from concept to production.',
  },
  {
    icon: RefreshCw,
    need: 'Stuck on legacy systems?',
    solution: 'We modernise outdated platforms into scalable, maintainable technology stacks.',
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

export default function UseCases() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="solutions" className="use-cases" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Solutions</span>
          <h2 className="section__title">How We Can Help</h2>
          <p className="section__subtitle">
            Real problems, matched with the right systems.
          </p>
        </motion.div>

        <div className="use-cases__grid">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.need}
              className="uc-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="uc-card__icon">
                <uc.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="uc-card__need">{uc.need}</h3>
              <div className="uc-card__arrow">
                <ArrowRight size={16} />
              </div>
              <p className="uc-card__solution">{uc.solution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
