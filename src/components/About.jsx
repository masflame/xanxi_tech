import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Rocket } from 'lucide-react';
import telkomImg from '../assets/Achievements/telkom.jpg';
import absaImg from '../assets/Achievements/absa.jpg';

export default function About() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 992 : true
  );

  const revealOffset = isDesktop
    ? ['start end', 'end start']
    : ['start 96%', 'end 42%'];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: revealOffset,
  });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* Curtain / mask reveal – section opens up like doors parting */
  const clipPath = useTransform(scrollYProgress, (v) => {
    const speed = isDesktop ? 2.5 : 3.1;
    const maxInset = isDesktop ? 8 : 2.4;
    const maxRadius = isDesktop ? 24 : 10;
    const prog = Math.min(1, v * speed);
    const inset = maxInset * (1 - prog);
    const radius = maxRadius * (1 - prog);
    return `inset(${inset}% round ${radius}px)`;
  });

  /* Staggered content entrances */
  const textX = useTransform(
    scrollYProgress,
    isDesktop ? [0.1, 0.32] : [0.01, 0.13],
    isDesktop ? [-40, 0] : [-14, 0]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    isDesktop ? [0.1, 0.32] : [0.01, 0.13],
    [0, 1]
  );
  const highlightsX = useTransform(
    scrollYProgress,
    isDesktop ? [0.15, 0.38] : [0.04, 0.18],
    isDesktop ? [40, 0] : [14, 0]
  );
  const highlightsOpacity = useTransform(
    scrollYProgress,
    isDesktop ? [0.15, 0.38] : [0.04, 0.18],
    [0, 1]
  );

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
            <span className="section__label">Our Story</span>
            <h2 className="section__title">About XANZI Tech</h2>
            <p className="about__desc">
              XANZI Tech started with a simple frustration: too many organisations 
              were stuck with systems that did not match their ambition. Off-the-shelf 
              tools that could not scale. Disconnected workflows. Technology that 
              created problems instead of solving them.
            </p>
            <p className="about__desc">
              We set out to change that. Today we are a focused engineering team 
              based in Pretoria, working with government bodies, institutions, and 
              enterprises who need technology they can actually rely on. Our mission 
              is to close the gap between what organisations need and what their 
              current systems deliver.
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
