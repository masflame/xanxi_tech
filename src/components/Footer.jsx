import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section__container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={logo} alt="XANZI Tech" />
            <p className="footer__tagline">
              Building secure, scalable digital systems for the future.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>Navigate</h4>
              <a href="#home">Home</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">Process</a>
              <a href="#work">Work</a>
              <a href="#industries">Industries</a>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#security">Security</a>
              <a href="#insights">Insights</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer__col">
              <h4>Contact</h4>
              <a href="mailto:aphanenate@gmail.com">aphanenate@gmail.com</a>
              <a href="tel:+27815918802">+27 81 591 8802</a>
              <a
                href="https://www.linkedin.com/company/xanzitech"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn / xanzitech
              </a>
              <span className="footer__text">5 De Friedland St, Capital Park, Pretoria, 0084</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} XANZI Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
