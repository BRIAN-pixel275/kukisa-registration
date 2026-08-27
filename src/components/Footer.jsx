import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>KUKISA</h2>

        <p className="footer-description">
          Kenyatta University Kiambu Students Association
        </p>

        <p className="footer-message">
          Stay connected with the KUKISA community.
        </p>

        <div className="social-links">
          <a
            href="#"
            className="social-link"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="social-link"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="social-link"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>

          <a
            href="#"
            className="social-link"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>

          <a
            href="mailto:yourkukisaemail@gmail.com"
            className="social-link"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        <div className="footer-divider"></div>

        <p className="copyright">
          © {new Date().getFullYear()} KUKISA. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;