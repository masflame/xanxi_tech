import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Gobin / Revalu Platform',
    type: 'Digital Platform',
    desc: 'A comprehensive multi-user platform connecting stakeholders with real-time waste analytics & ESG/Carbon tracking, featuring structured data management, role-based access, and dashboard-driven insights.',
    tags: ['React', 'Supabase', 'Dashboard'],
  },
  {
    title: 'Roll Call System',
    type: 'Attendance System',
    desc: 'An intelligent attendance and check-in system built for institutions – featuring live tracking, reporting, and role-based access.',
    tags: ['Full-Stack', 'RBAC', 'Real-time'],
  },
  {
    title: 'Institutional Management System',
    type: 'Enterprise Platform',
    desc: 'A large-scale management platform for institutional operations – handling users, compliance workflows, and data governance.',
    tags: ['Platform', 'Security', 'APIs'],
  },
  {
    title: 'Alert Notification System',
    type: 'Communication System',
    desc: 'A real-time alert and notification engine delivering critical updates across multiple channels with priority-based routing.',
    tags: ['Real-time', 'Webhooks', 'Automation'],
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  /* Horizontal scroll – cards slide left as you scroll down */
  const x = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '-55%']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 992 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="work"
      className={`work${isDesktop ? ' work--horizontal' : ''}`}
      ref={sectionRef}
    >
      <div className={isDesktop ? 'work__sticky' : undefined}>
        <div className="section__container">
          <motion.div
            className="section__header"
            style={isDesktop ? { opacity: headerOpacity, y: headerY } : undefined}
          >
            <span className="section__label">Portfolio</span>
            <h2 className="section__title">Our Work</h2>
            <p className="section__subtitle">
              Real systems delivered for real organisations – each engineered for impact.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="work__track"
          style={isDesktop ? { x } : undefined}
        >
          {projects.map((proj) => (
            <div key={proj.title} className="work-card">
              <div className="work-card__header">
                <span className="work-card__type">{proj.type}</span>
                <ExternalLink size={16} className="work-card__arrow" />
              </div>
              <h3 className="work-card__title">{proj.title}</h3>
              <p className="work-card__desc">{proj.desc}</p>
              <div className="work-card__tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="work-card__tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
