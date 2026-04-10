import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState({
    analytics: true,
    marketing: false,
    personalization: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('xanzi_cookie_consent');
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('xanzi_cookie_consent', 'all');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('xanzi_cookie_consent', 'essential');
    setVisible(false);
  };

  const saveCustom = () => {
    localStorage.setItem('xanzi_cookie_consent', JSON.stringify(prefs));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cookie"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cookie__inner">
            <div className="cookie__header">
              <div className="cookie__icon">
                <Cookie size={20} strokeWidth={1.5} />
              </div>
              <h4 className="cookie__title">Cookie Settings</h4>
              <button className="cookie__close" onClick={reject} aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <p className="cookie__text">
              We use cookies and similar technologies to personalize content, tailor
              and measure ads, and provide a better experience. By clicking Allow All
              or enabling an option in your cookie preferences, you agree to this use.
            </p>

            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  className="cookie__options"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="cookie__option">
                    <input type="checkbox" checked disabled />
                    <span>Essential</span>
                    <span className="cookie__badge">Always on</span>
                  </label>
                  <label className="cookie__option">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    />
                    <span>Analytics</span>
                  </label>
                  <label className="cookie__option">
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                    />
                    <span>Marketing</span>
                  </label>
                  <label className="cookie__option">
                    <input
                      type="checkbox"
                      checked={prefs.personalization}
                      onChange={(e) => setPrefs({ ...prefs, personalization: e.target.checked })}
                    />
                    <span>Personalization</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cookie__actions">
              <button className="btn btn--sm" onClick={accept}>Allow All</button>
              <button className="btn btn--sm btn--outline" onClick={reject}>Reject</button>
              {!showCustomize ? (
                <button
                  className="btn btn--sm btn--ghost"
                  onClick={() => setShowCustomize(true)}
                >
                  Customize
                </button>
              ) : (
                <button className="btn btn--sm btn--ghost" onClick={saveCustom}>
                  Save Preferences
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
