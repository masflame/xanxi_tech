import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { AlertTriangle, Lightbulb, Layers, TrendingUp } from 'lucide-react';

const study = {
  client: 'ESG Analytics Platform',
  challenge:
    'Disconnected waste and carbon data spread across multiple stakeholders with no unified reporting, leading to delayed compliance reports and limited visibility for leadership.',
  solution:
    'Designed and built a centralised ESG analytics platform with role-based stakeholder portals, real-time data ingestion pipelines, and interactive dashboards for KPI tracking.',
  system: [
    'Multi-tenant Supabase backend with row-level security',
    'React dashboard with live charting and filtering',
    'Role-based access for municipalities, waste operators, and executives',
    'Automated reporting and CSV/PDF export pipelines',
  ],
  impact: [
    { label: 'Faster reporting', value: '40%' },
    { label: 'Real-time data access', value: 'Live' },
    { label: 'Stakeholders onboarded', value: '12+' },
    { label: 'Manual processes replaced', value: '6' },
  ],
};

export default function CaseStudy() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="case-study" className="case-study" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">In Practice</span>
          <h2 className="section__title">Case Study</h2>
          <p className="section__subtitle">
            A closer look at how we solve complex problems end-to-end.
          </p>
        </motion.div>

        <motion.div
          className="case-study__card"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <h3 className="case-study__client">{study.client}</h3>

          <div className="case-study__grid">
            <div className="case-study__block">
              <div className="case-study__block-icon">
                <AlertTriangle size={20} strokeWidth={1.5} />
              </div>
              <h4 className="case-study__block-title">The Challenge</h4>
              <p className="case-study__block-text">{study.challenge}</p>
            </div>

            <div className="case-study__block">
              <div className="case-study__block-icon">
                <Lightbulb size={20} strokeWidth={1.5} />
              </div>
              <h4 className="case-study__block-title">Our Solution</h4>
              <p className="case-study__block-text">{study.solution}</p>
            </div>

            <div className="case-study__block">
              <div className="case-study__block-icon">
                <Layers size={20} strokeWidth={1.5} />
              </div>
              <h4 className="case-study__block-title">What We Built</h4>
              <ul className="case-study__list">
                {study.system.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="case-study__block">
              <div className="case-study__block-icon">
                <TrendingUp size={20} strokeWidth={1.5} />
              </div>
              <h4 className="case-study__block-title">The Impact</h4>
              <div className="case-study__metrics">
                {study.impact.map((m) => (
                  <div key={m.label} className="case-study__metric">
                    <span className="case-study__metric-value">{m.value}</span>
                    <span className="case-study__metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
