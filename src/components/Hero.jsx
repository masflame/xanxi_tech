import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroBgVideo from '../assets/background/background.mp4';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.18,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero({ ready = false }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /* Parallax layers – bg slow, content fast, stats mid */
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const animState = ready ? 'visible' : 'hidden';

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* Parallax content layer */}
      <motion.div style={{ y: contentY, opacity: contentOpacity, willChange: 'transform' }}>
        <div className="hero__wrapper">
          <motion.h1
            className="hero__title"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={animState}
          >
            We build the systems that power{' '}
            <span className="hero__title-accent">
              ambitious organisations.
            </span>
          </motion.h1>

          <motion.div
            className="hero__subtitle"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={animState}
          >
            We engineer powerful platforms, stakeholder portals, data dashboards,
            and scalable institutional systems
            <br />– <span>built for security, performance, and scale.</span>
          </motion.div>
        </div>

        <motion.div
          className="hero__actions"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={animState}
        >
          <a href="#capabilities" className="btn">
            Discover our capabilities
          </a>
          <a href="#contact" className="btn btn--outline">
            Start a project
          </a>
        </motion.div>
      </motion.div>

      {/* Stats – different parallax speed */}
      <motion.div
        className="hero__stats"
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate={animState}
        style={{ y: statsY, opacity: statsOpacity, willChange: 'transform' }}
      >
        <div className="hero__stat">
          <h3 className="hero__stat-num">10+</h3>
          <p className="hero__stat-label">Systems delivered</p>
        </div>
        <div className="hero__stat">
          <h3 className="hero__stat-num">99.9%</h3>
          <p className="hero__stat-label">Uptime SLA</p>
        </div>
        <div className="hero__stat">
          <h3 className="hero__stat-num">Award</h3>
          <p className="hero__stat-label">Winning team</p>
        </div>
      </motion.div>

      {/* Background parallax layers – move slower */}
      <motion.div className="hero__gradient" style={{ y: gradientY }} />
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <video
          className="hero__video"
          src={heroBgVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>
    </section>
  );
}
