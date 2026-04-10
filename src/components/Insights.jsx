import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    slug: 'why-institutional-systems-fail',
    tag: 'Systems Design',
    title: 'Why most institutional systems fail',
    excerpt:
      'The biggest failures are not technical. They stem from poor scoping, weak security foundations, and building for today instead of tomorrow.',
  },
  {
    slug: 'how-to-design-scalable-dashboards',
    tag: 'Data & Dashboards',
    title: 'How to design scalable dashboards',
    excerpt:
      'Effective dashboards are not about cramming data onto a screen. They are about surfacing the right metrics for the right stakeholders at the right time.',
  },
  {
    slug: 'security-mistakes-companies-make',
    tag: 'Security',
    title: 'Security mistakes companies make',
    excerpt:
      'From storing secrets in frontend code to skipping row-level policies, these common oversights leave organisations exposed.',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Insights() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="insights" className="insights" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Insights</span>
          <h2 className="section__title">Our Thinking</h2>
          <p className="section__subtitle">
            Perspectives from the team on systems, security, and building for scale.
          </p>
        </motion.div>

        <div className="insights__grid">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              className="insight-card"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <span className="insight-card__tag">{a.tag}</span>
              <h3 className="insight-card__title">{a.title}</h3>
              <p className="insight-card__excerpt">{a.excerpt}</p>
              <Link to={`/insights/${a.slug}`} className="insight-card__link">
                Read more <ArrowUpRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
