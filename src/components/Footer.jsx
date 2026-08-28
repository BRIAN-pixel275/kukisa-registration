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
            href="https://www.instagram.com/kukisa_ku?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
            className="social-link"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/kukisa.ku"
            className="social-link"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.tiktok.com/@kukisa_ku?is_from_webapp=1&sender_device=pc"
            className="social-link"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>

          <a
            href="https://chat.whatsapp.com/CJefRr1zzKMKz7uagvjjiO"
            className="social-link"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>

          <a
            href="mailto:kukisa.ku.association@gmail.com"
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