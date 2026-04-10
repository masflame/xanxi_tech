import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section__container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={logo} alt="XANZI Tech" height="32" />
            <p className="footer__tagline">
              Building secure, scalable digital systems for the future.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>Navigate</h4>
              <a href="#home">Home</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#systems">Systems</a>
              <a href="#work">Work</a>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#architecture">Architecture</a>
              <a href="#contact">Contact</a>
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
