import React from "react";
import "../style/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      {/* Contact Section */}
      <div className="footer-section contact">
        <h3>Contact Us</h3>
        <p>📞 +91 8390651053</p>
        <p>
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="inline-icon"
            style={{ color: "#25D366" }}
          />{" "}
          +91 9518717844
        </p>
        <p>📧 Vidharbhaoptical@gmail.com</p>
      </div>

      {/* Address Section */}
      <div className="footer-section address">
        <h3>Address</h3>
        <p>Near Y S Garage, Mohammad Ali Road, Akola 444006</p>
        <p>🕒 Hours: 10:30 AM – 8:30 PM</p>
        <p>🗓 Monday to Sunday</p>
      </div>

      {/* Social Section */}
      <div className="footer-section social">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#" className="social-icon facebook" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="social-icon instagram" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://wa.me/8390541217"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
            aria-label="WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          {/* <a href="#" className="social-icon twitter" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#" className="social-icon youtube" aria-label="YouTube">
            <FontAwesomeIcon icon={faYoutube} />
          </a> */}
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="footer-bottom">
      <p className="text-techno">© 2025 Technoforcast. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
