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
  // ── CONTENT ROADMAP: 5 authoritative inbound SEO articles ──────────────────
  // Targeting: transactional + problem-solving long-tail enterprise keywords
  {
    slug: 'popia-compliance-database-architecture',
    tag: 'Compliance & Security',
    title: 'How POPIA shapes your database architecture',
    excerpt:
      'POPIA compliance is not a checkbox after development. It shapes your data model, retention policies, and encryption strategy from the first migration.',
  },
  {
    slug: 'row-level-security-supabase-enterprise',
    tag: 'Security Engineering',
    title: 'Row-Level Security in Supabase: the enterprise guide',
    excerpt:
      'A step-by-step breakdown of how we implement RLS policies in multi-tenant Supabase backends to ensure no user ever sees data they are not authorised to access.',
  },
  {
    slug: 'multi-tenant-stakeholder-portal-architecture',
    tag: 'Platform Architecture',
    title: 'Architecting multi-tenant stakeholder portals that scale',
    excerpt:
      'The decisions that separate a portal that handles 50 users from one that handles 50,000 — tenant isolation, access control patterns, and data layer design.',
  },
  {
    slug: 'govtech-digital-transformation-south-africa',
    tag: 'GovTech',
    title: 'What government entities must demand from software agencies',
    excerpt:
      'Most GovTech projects fail because of the wrong vendor, not the wrong technology. Here is what security-first, POPIA-compliant digital transformation actually requires.',
  },
  {
    slug: 'esg-analytics-platform-development',
    tag: 'ESG & Analytics',
    title: 'Engineering real-time ESG and carbon analytics platforms',
    excerpt:
      'How we connected municipalities, waste operators and executives to a single live compliance reporting system — the architecture, data pipelines, and lessons learned.',
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
