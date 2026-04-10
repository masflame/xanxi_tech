import { Monitor, Server, Database, GitBranch } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const layers = [
  {
    icon: Monitor,
    title: 'Frontend & Component Architecture',
    tags: ['React', 'Vite', 'Framer Motion'],
    desc: 'Modular, component-driven interfaces with lazy loading, code splitting, and optimised rendering pipelines. Designed for high-performance, interactive user experiences across web and mobile form factors.',
  },
  {
    icon: Server,
    title: 'API & Business Logic Layer',
    tags: ['ASP.NET Core (C#)', 'REST APIs', 'Edge Functions'],
    desc: 'Robust backend services built with ASP.NET Core, handling business logic, validation, and secure data orchestration. Cleanly structured API layers ensure scalability, maintainability, and seamless client-server communication.',
  },
  {
    icon: Database,
    title: 'Database & Data Modelling',
    tags: ['PostgreSQL', 'Redis', 'Row-Level Security'],
    desc: 'Well-structured, normalised schemas with enforced row-level security policies. Optimised queries, indexing strategies, and real-time subscriptions enable secure, high-performance data access at scale.',
  },
  {
    icon: GitBranch,
    title: 'Infrastructure, DevOps & Scalability',
    tags: ['Docker', 'Kubernetes', 'Vercel', 'GitHub Actions'],
    desc: 'Containerised applications deployed via Docker and orchestrated with Kubernetes for scalable, resilient infrastructure. CI/CD pipelines automate testing, preview environments, and zero-downtime deployments.',
  },
];

/* Each card maps to a scroll-progress range inside the pinned section */
function ArchCard({ layer, index, progress }) {
  const Icon = layer.icon;
  const start = 0.05 + index * 0.1;
  const end = start + 0.09;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);

  return (
    <motion.div className="arch-card" style={{ opacity, y, scale, willChange: 'transform' }}>
      <div className="arch-card__num">{String(index + 1).padStart(2, '0')}</div>
      <div className="arch-card__icon">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="arch-card__body">
        <div className="arch-card__head">
          <h3 className="arch-card__title">{layer.title}</h3>
        </div>
        {layer.tags && (
          <div className="arch-card__tags">
            {layer.tags.map((tag) => (
              <span key={tag} className="arch-card__tech">{tag}</span>
            ))}
          </div>
        )}
        <p className="arch-card__desc">{layer.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Architecture() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [30, 0]);

  return (
    <section id="architecture" className="arch-section" ref={sectionRef}>
      <div className="arch-section__sticky">
        <div className="section__container">
          <motion.div
            className="section__header"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            <span className="section__label">Under the Hood</span>
            <h2 className="section__title">Our Tech Stack</h2>
            <p className="section__subtitle">
              The engineering layers behind every system we ship.
            </p>
          </motion.div>

          <div className="arch-cards">
            {layers.map((layer, i) => (
              <ArchCard key={layer.title} layer={layer} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
