import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Systems', href: '#systems' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`nav-container ${hidden ? 'nav-container--hidden' : ''}`}>
      <motion.header
        className="nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#home"
          className="nav__logo"
          aria-label="Home"
          onClick={(e) => handleClick(e, '#home')}
        >
          <img src={logo} alt="XANZI Tech" />
        </a>

        {/* Desktop nav */}
        <nav className="nav__menu">
          <ul className="nav__list">
            {navLinks.map(({ label, href }) => (
              <li key={href} className="nav__item">
                <a
                  href={href}
                  className="nav__link"
                  onClick={(e) => handleClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <a
            href="#contact"
            className="nav__contact"
            onClick={(e) => handleClick(e, '#contact')}
          >
            Contact us
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="nav__burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="nav__burger-text">{mobileOpen ? 'Close' : 'Menu'}</span>
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav__mobile-link"
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="nav__contact nav__contact--mobile"
              onClick={(e) => handleClick(e, '#contact')}
            >
              Contact us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
