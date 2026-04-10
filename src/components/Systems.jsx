import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Users, LineChart, FileCheck, Building2 } from 'lucide-react';

const systems = [
  {
    icon: Users,
    title: 'Stakeholder Content Portals',
    desc: 'Centralised hubs where stakeholders access documents, media, reports, and communications – all role-gated and secure.',
  },
  {
    icon: LineChart,
    title: 'Innovation Dashboards',
    desc: 'Live data visualisation platforms that surface KPIs, trends, and analytics for leadership decision-making.',
  },
  {
    icon: FileCheck,
    title: 'Secure Document Systems',
    desc: 'End-to-end document management with version control, audit trails, and encrypted storage for sensitive data.',
  },
  {
    icon: Building2,
    title: 'Institutional Platforms',
    desc: 'Large-scale systems for institutions – managing processes, users, compliance, and workflows under one roof.',
  },
];

/* Scroll choreography – icon, title, description all animate at different rates */
function SysCard({ sys, index, progress }) {
  const start = 0.08 + index * 0.1;

  const cardY = useTransform(progress, [start, start + 0.14], [80, 0]);
  const cardOpacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const iconScale = useTransform(progress, [start, start + 0.18], [0.5, 1]);
  const iconRotate = useTransform(progress, [start, start + 0.18], [-15, 0]);
  const descOpacity = useTransform(progress, [start + 0.05, start + 0.18], [0, 1]);
  const descY = useTransform(progress, [start + 0.05, start + 0.18], [15, 0]);

  return (
    <motion.div
      className="sys-card"
      style={{ opacity: cardOpacity, y: cardY, willChange: 'transform' }}
    >
      <div className="sys-card__inner">
        <motion.div
          className="sys-card__icon-box"
          style={{ scale: iconScale, rotate: iconRotate }}
        >
          <sys.icon size={28} strokeWidth={1.5} className="sys-card__icon-svg" />
          <div className="sys-card__radar" />
        </motion.div>
        <div className="sys-card__content">
          <h3 className="sys-card__title">{sys.title}</h3>
          <motion.p
            className="sys-card__desc"
            style={{ opacity: descOpacity, y: descY }}
          >
            {sys.desc}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Systems() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* Staggered header choreography */
  const capsuleOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const capsuleY = useTransform(scrollYProgress, [0.02, 0.1], [20, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.04, 0.12], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.04, 0.12], [30, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.06, 0.14], [20, 0]);

  return (
    <section id="systems" className="systems" ref={sectionRef}>
      {/* Decorative blurred shapes */}
      <div className="sys-shape sys-shape--top-right" />
      <div className="sys-shape sys-shape--bottom-left" />

      <div className="section__container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section__header" style={{ textAlign: 'center' }}>
          <motion.span
            className="sys-capsule"
            style={{ opacity: capsuleOpacity, y: capsuleY, display: 'inline-block' }}
          >
            What We Deliver
          </motion.span>
          <motion.h2
            className="section__title"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            Systems We Build
          </motion.h2>
          <motion.p
            className="section__subtitle"
            style={{ margin: '0 auto', opacity: subtitleOpacity, y: subtitleY }}
          >
            Purpose-built digital products engineered for security, scale, and real-world impact.
          </motion.p>
        </div>

        <div className="systems__grid">
          {systems.map((sys, i) => (
            <SysCard key={sys.title} sys={sys} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
