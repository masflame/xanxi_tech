import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  {
    label: 'Capabilities',
    href: '#capabilities',
    children: [
      { label: 'Platform Development', href: '#capabilities', capKey: 'platform-dev' },
      { label: 'Secure Portals', href: '#capabilities', capKey: 'secure-portals' },
      { label: 'Data Dashboards', href: '#capabilities', capKey: 'data-systems' },
      { label: 'System Integration', href: '#capabilities', capKey: 'system-integration' },
      { label: 'Mobile & Web Dev', href: '#capabilities', capKey: 'mobile-web-dev' },
      { label: 'Legacy Modernization', href: '#capabilities', capKey: 'legacy-modernization' },
    ],
  },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Industries', href: '#industries' },
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'Our Story', href: '#about' },
      { label: 'Security', href: '#security' },
      { label: 'Insights', href: '#insights' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const scrollToHash = (hash) => {
    const target = document.querySelector(hash);
    if (target && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e, href, capKey) => {
    e.preventDefault();
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileAccordion(null);

    if (capKey) {
      window.dispatchEvent(new CustomEvent('selectCapability', { detail: capKey }));
    }

    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      scrollToHash(href);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    setOpenDropdown(null);

    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    }
  };

  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // After navigating to home with a hash, scroll to that section
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const timer = setTimeout(() => scrollToHash(location.hash), 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className={`nav-container ${hidden ? 'nav-container--hidden' : ''}`}>
      <motion.header
        className="nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="/"
          className="nav__logo"
          aria-label="Home"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="XANZI Tech" />
        </a>

        {/* Desktop nav */}
        <nav className="nav__menu">
          <ul className="nav__list">
            {navLinks.map(({ label, href, children }) => (
              <li
                key={href}
                className={`nav__item${children ? ' nav__item--has-dropdown' : ''}`}
                onMouseEnter={children ? () => handleDropdownEnter(label) : undefined}
                onMouseLeave={children ? handleDropdownLeave : undefined}
              >
                <a
                  href={href}
                  className="nav__link"
                  onClick={(e) => handleClick(e, href)}
                >
                  {label}
                  {children && (
                    <ChevronDown
                      size={14}
                      className={`nav__chevron${openDropdown === label ? ' nav__chevron--open' : ''}`}
                    />
                  )}
                </a>

                {children && (
                  <AnimatePresence>
                    {openDropdown === label && (
                      <motion.div
                        className={`nav__dropdown${
                          children.length > 4
                            ? ' nav__dropdown--wide'
                            : ' nav__dropdown--narrow'
                        }`}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="nav__dropdown-grid">
                          {children.map((child, ci) => (
                            <motion.a
                              key={child.label}
                              href={child.href}
                              className="nav__dropdown-card"
                              onClick={(e) => handleClick(e, child.href, child.capKey)}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: ci * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <span className="nav__dropdown-card-dot" />
                              <span className="nav__dropdown-card-label">{child.label}</span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
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
            {navLinks.map(({ label, href, children }) =>
              children ? (
                <div key={href} className="nav__mobile-group">
                  <button
                    className="nav__mobile-link nav__mobile-link--parent"
                    onClick={() =>
                      setMobileAccordion(mobileAccordion === label ? null : label)
                    }
                  >
                    {label}
                    <ChevronDown
                      size={14}
                      className={`nav__chevron${mobileAccordion === label ? ' nav__chevron--open' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === label && (
                      <motion.div
                        className="nav__mobile-children"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="nav__mobile-child"
                            onClick={(e) => handleClick(e, child.href, child.capKey)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={href}
                  href={href}
                  className="nav__mobile-link"
                  onClick={(e) => handleClick(e, href)}
                >
                  {label}
                </a>
              )
            )}
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
