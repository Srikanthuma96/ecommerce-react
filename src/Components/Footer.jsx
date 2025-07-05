import React from "react";
import logo from '../Assets/Srikanth-removebg-preview.png'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp, faTelegram, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, faWhatsapp, faTelegram, faInstagram, faXTwitter);


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Contact Info */}
        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>
  <a href="tel:+917095122779" target="_blank">📞 +91 7095122779</a>
</p>

          <p>📧 <a href="mailto:srikanthuma96@gmail.com">srikanthuma96@gmail.com</a></p>
          <p>📍 5-179/A, Lakshmi Vihari Phase 1, Nallagandla, Hyderabad, Telangana, 500019</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-middle">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Cancellation & Return Policy</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
    {/* Right Section - Social Media */}
<div className="footer-right">
  <h3>Follow Us On</h3>
  <div className="social-icons">
    <a href="https://wa.me/+917095122779" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faWhatsapp} size="1x" />
    </a>
    <a href="https://t.me/+917095122779" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTelegram} size="1x" />
    </a>
    <a href="https://twitter.com/Srikant73612565" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faXTwitter} size="1x" />
    </a>
    <a href="https://instagram.com/srikanth_reddy_7095" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} size="1x" />
    </a>
  </div>
</div>


      </div>
    </footer>
  );
};

export default Footer;
