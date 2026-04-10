import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Rocket } from 'lucide-react';
import telkomImg from '../assets/Achievements/telkom.jpg';
import absaImg from '../assets/Achievements/absa.jpg';

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* Curtain / mask reveal – section opens up like doors parting */
  const clipPath = useTransform(scrollYProgress, (v) => {
    const prog = Math.min(1, v * 2.5);
    const inset = 8 * (1 - prog);
    const radius = 24 * (1 - prog);
    return `inset(${inset}% round ${radius}px)`;
  });

  /* Staggered content entrances */
  const textX = useTransform(scrollYProgress, [0.1, 0.32], [-40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.32], [0, 1]);
  const highlightsX = useTransform(scrollYProgress, [0.15, 0.38], [40, 0]);
  const highlightsOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);

  return (
    <motion.section
      id="about"
      className="about"
      ref={sectionRef}
      style={{ clipPath, willChange: 'clip-path' }}
    >
      <div className="section__container">
        <div className="about__layout">
          <motion.div
            className="about__text"
            style={{ x: textX, opacity: textOpacity }}
          >
            <span className="section__label">Who We Are</span>
            <h2 className="section__title">About XANZI Tech</h2>
            <p className="about__desc">
              XANZI Tech is a technology company focused on engineering secure, 
              scalable digital systems for organisations that demand more than a basic 
              web presence. We design and build platforms, portals, dashboards, and 
              institutional-grade systems that solve real operational challenges.
            </p>
            <p className="about__desc">
              Founded with a vision to bridge the gap between innovation and execution, 
              we combine modern development practices with a deep understanding of 
              stakeholder needs to deliver systems that are secure, performant, and 
              built to last.
            </p>
          </motion.div>

          <motion.div
            className="about__highlights"
            style={{ x: highlightsX, opacity: highlightsOpacity }}
          >
            <div className="about-highlight">
              <div className="about-highlight__icon">
                <Rocket size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="about-highlight__title">Innovation-Driven</h4>
                <p className="about-highlight__desc">
                  Every system we build is engineered with cutting-edge technology 
                  and a forward-thinking approach to solve tomorrow&apos;s challenges today.
                </p>
              </div>
            </div>

            <a
              className="about-highlight about-highlight--link"
              href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7427425753698385921"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="about-highlight__img">
                <img src={telkomImg} alt="Telkom Innovation Awards" />
              </div>
              <div className="about-highlight__body">
                <h4 className="about-highlight__title">Telkom Innovation Awards 2025</h4>
                <p className="about-highlight__desc">
                  Recognised at the Telkom Transformation &amp; Innovation Awards 
                  for our contribution to digital innovation and system design.
                </p>
              </div>
              <ArrowUpRight size={18} className="about-highlight__arrow" />
            </a>

            <a
              className="about-highlight about-highlight--link"
              href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7397585982268538881"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="about-highlight__img">
                <img src={absaImg} alt="ABSA x YEI Emerging Innovators" />
              </div>
              <div className="about-highlight__body">
                <h4 className="about-highlight__title">ABSA x YEI Emerging Innovators</h4>
                <p className="about-highlight__desc">
                  Selected as emerging innovators through the ABSA &amp; Youth Employment 
                  Initiative programme for entrepreneurial technology solutions.
                </p>
              </div>
              <ArrowUpRight size={18} className="about-highlight__arrow" />
            </a>

            <div className="about-embeds" aria-label="LinkedIn post embeds">
              <div className="about-embed-card">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7427425753698385921?collapsed=1"
                  title="Telkom Innovation Awards embedded post"
                  loading="lazy"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="about-embed-card">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7397585982268538881?collapsed=1"
                  title="ABSA x YEI Emerging Innovators embedded post"
                  loading="lazy"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
