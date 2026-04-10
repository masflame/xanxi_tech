import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import platformDevelopmentImage from '../assets/capabilities/Platform Development.jpg';
import securePortalsImage from '../assets/capabilities/Secure Portals.jpg';
import dataDashboardsImage from '../assets/capabilities/Data Dashboards.jpg';
import systemIntegrationImage from '../assets/capabilities/System Integration.jpg';
import mobileWebDevImage from '../assets/capabilities/mobile dev.jpg';
import legacyModernizationImage from '../assets/capabilities/legacy systems.jpg';

const capabilities = [
  {
    key: 'platform-dev',
    tabLabel: 'Platform Development',
    eyebrow: 'Platform Development',
    cta: 'Explore Platform Solutions',
    image: platformDevelopmentImage,
    title: 'Platform Development',
    desc: 'End-to-end digital platforms built with modern frameworks, designed for scale and performance from day one.',
  },
  {
    key: 'secure-portals',
    tabLabel: 'Secure Portals',
    eyebrow: 'Secure Portals',
    cta: 'Explore Portal Solutions',
    image: securePortalsImage,
    title: 'Secure Portals',
    desc: 'Role-based stakeholder portals with enterprise-grade authentication, encryption, and access control layers.',
  },
  {
    key: 'data-systems',
    tabLabel: 'Data Systems & Dashboards',
    eyebrow: 'Data Systems & Dashboards',
    cta: 'Explore Data Solutions',
    image: dataDashboardsImage,
    title: 'Data Systems & Dashboards',
    desc: 'Real-time analytics dashboards and data pipelines that turn complex information into actionable insights.',
  },
  {
    key: 'system-integration',
    tabLabel: 'System Integration',
    eyebrow: 'System Integration',
    cta: 'Explore Integration Solutions',
    image: systemIntegrationImage,
    title: 'System Integration',
    desc: 'Seamless API integrations connecting your existing tools, WordPress sites, and third-party services into unified workflows.',
  },
  {
    key: 'mobile-web-dev',
    tabLabel: 'Mobile & Web Development',
    eyebrow: 'Mobile & Web Development',
    cta: 'Explore Development Solutions',
    image: mobileWebDevImage,
    title: 'Mobile & Web Development',
    desc: 'Responsive web applications and cross-platform mobile solutions engineered for seamless user experiences across every device and screen size.',
  },
  {
    key: 'legacy-modernization',
    tabLabel: 'Legacy Modernization',
    eyebrow: 'Legacy Modernization',
    cta: 'Explore Modernization Solutions',
    image: legacyModernizationImage,
    title: 'Legacy Systems Modernization',
    desc: 'Strategic migration and re-architecture of outdated systems into modern, maintainable technology stacks – without disrupting ongoing operations.',
  },
];

export default function Capabilities() {
  const [ref, inView] = useInView(0.15);
  const [activeKey, setActiveKey] = useState(capabilities[0].key);
  const active = capabilities.find((cap) => cap.key === activeKey) || capabilities[0];

  useEffect(() => {
    const onSelect = (e) => {
      const key = e.detail;
      if (capabilities.some((c) => c.key === key)) {
        setActiveKey(key);
      }
    };
    window.addEventListener('selectCapability', onSelect);
    return () => window.removeEventListener('selectCapability', onSelect);
  }, []);

  useEffect(() => {
    // Preload capability images once to avoid first-switch flicker/jank.
    const preloadedImages = capabilities.map((cap) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = cap.image;
      return img;
    });

    return () => {
      preloadedImages.forEach((img) => {
        img.src = '';
      });
    };
  }, []);

  return (
    <section id="capabilities" className="capabilities" ref={ref}>
      <div className="section__container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">What We Do</span>
          <h2 className="section__title">Our Capabilities</h2>
          <p className="section__subtitle">
            We don&apos;t build websites. We engineer secure, scalable digital systems
            that power organisations.
          </p>
        </motion.div>

        <motion.div
          className="cap-tabs"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cap-tabs__menu" role="tablist" aria-label="Capabilities">
            {capabilities.map((cap) => {
              const isActive = cap.key === active.key;
              return (
                <button
                  key={cap.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`cap-tabs__tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveKey(cap.key)}
                >
                  {cap.tabLabel}
                </button>
              );
            })}
          </div>

          <div className="cap-panel" role="tabpanel">
            <div className="cap-panel__inner">
              <div className="cap-panel__content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    className="cap-panel__content-inner"
                    initial={{ opacity: 0, x: 60, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -50, filter: 'blur(14px)' }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <p className="cap-panel__eyebrow">{active.eyebrow}</p>
                    <h3 className="cap-panel__title">{active.title}</h3>
                    <p className="cap-panel__desc">{active.desc}</p>
                    <button type="button" className="cap-panel__cta">
                      {active.cta}
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="cap-panel__asset" aria-label="Capability visual placeholder">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key + '-asset'}
                    className="cap-panel__asset-inner"
                    initial={{ opacity: 0, x: 60, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -50, filter: 'blur(14px)' }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <img
                      src={active.image}
                      alt={active.title}
                      className="cap-panel__asset-img"
                      loading="eager"
                      decoding="async"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
