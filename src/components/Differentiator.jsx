import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X } from 'lucide-react';

const points = [
  {
    text: 'We don\'t use templates or drag-and-drop builders',
    detail: 'Every line of code is written with intent. No shortcuts, no cookie-cutter layouts.',
  },
  {
    text: 'We don\'t outsource your project',
    detail: 'One team owns your system from first commit to production. No hand-offs, no communication gaps.',
  },
  {
    text: 'We don\'t optimise for speed over substance',
    detail: 'We would rather push back on a deadline than ship something that breaks under pressure.',
  },
  {
    text: 'We don\'t disappear after deployment',
    detail: 'We treat launch day as the starting line. Continuous iteration and support are how we operate.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Differentiator() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="why-us" className="diff" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Our Philosophy</span>
          <h2 className="section__title">Why XANZI Tech Is Different</h2>
          <p className="section__subtitle">
            It is not just what we build. It is how we think about building it.
          </p>
        </motion.div>

        <div className="diff__list">
          {points.map((p, i) => (
            <motion.div
              key={p.text}
              className="diff-item"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="diff-item__x">
                <X size={20} strokeWidth={2.5} />
              </div>
              <div className="diff-item__body">
                <h3 className="diff-item__title">{p.text}</h3>
                <p className="diff-item__desc">{p.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
