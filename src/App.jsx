import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Systems from './components/Systems';
import Architecture from './components/Architecture';
import Work from './components/Work';
import About from './components/About';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
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

function App() {
  const lenisRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* Lock scroll during loader */
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

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

    return () => {
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
        <Hero ready={!loading} />
        <Capabilities />
        <Systems />
        <Architecture />
        <Work />
        <About />
        <Trust />
        <Contact />
        <Footer />
      </motion.div>

      <CookieBanner />
    </>
  );
}

export default App;
