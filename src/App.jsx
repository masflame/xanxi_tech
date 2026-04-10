import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Architecture from './components/Architecture';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Process from './components/Process';
import Industries from './components/Industries';
import CaseStudy from './components/CaseStudy';
import Security from './components/Security';
import Differentiator from './components/Differentiator';
import StrategyCTA from './components/StrategyCTA';
import FAQ from './components/FAQ';
import Insights from './components/Insights';
import ArticlePage from './components/ArticlePage';
import logo from './assets/logo.png';

/* ---- Intro overlay ---- */
function Loader({ onComplete }) {
  const [phase, setPhase] = useState('logo'); // logo → reveal → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1400);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={
        phase === 'reveal' || phase === 'done'
          ? { clipPath: 'inset(0% 0% 100% 0%)' }
          : { clipPath: 'inset(0% 0% 0% 0%)' }
      }
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="loader__logo"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={logo} alt="XANZI Tech" />
      </motion.div>
      <motion.div
        className="loader__bar-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="loader__bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ---- Page transition wrapper ---- */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
};

/* ---- Homepage content ---- */
function HomePage({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <Capabilities />
      <Process />
      <Industries />
      <Work />
      <CaseStudy />
      <Security />
      <Architecture />
      <Differentiator />
      <About />
      <Insights />
      <FAQ />
      <StrategyCTA />
      <Contact />
    </>
  );
}

function App() {
  const lenisRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    /* Lock scroll during loader */
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  /* Scroll to top on route change (skip when hash is present) */
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onAnchorClick = (e) => {
      if (e.defaultPrevented) return;

      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.25 });
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage ready={!loading} />} />
              <Route path="/insights/:slug" element={<ArticlePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </motion.div>

      <CookieBanner />
    </>
  );
}

export default App;
