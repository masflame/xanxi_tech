import { Monitor, Server, Lock, RefreshCw } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const layers = [
  {
    icon: Monitor,
    title: 'Frontend Engineering',
    desc: 'Modern, high-performance web interfaces designed for responsiveness, accessibility, and seamless user interaction.',
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    desc: 'Scalable backend systems leveraging technologies such as .NET (C#) and API-driven architectures to support complex business logic and secure data processing.',
  },
  {
    icon: Lock,
    title: 'Security & Identity',
    desc: 'Enterprise-grade authentication, role-based access control, and structured data protection aligned with industry best practices.',
  },
  {
    icon: RefreshCw,
    title: 'Systems Integration',
    desc: 'Seamless integration with internal systems, CMS platforms, and external services through secure APIs and interoperable architectures.',
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
            <span className="section__label">Our Stack</span>
            <h2 className="section__title">How We Build</h2>
            <p className="section__subtitle">
              A modern, layered architecture designed for security, speed, and seamless scalability.
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
