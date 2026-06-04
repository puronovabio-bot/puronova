import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';
import originalLogo from '../assets/logoo.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top-accent"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src={originalLogo} alt="Puro Nova" className="footer-logo-img" />
            </Link>
            <p className="footer-desc">
              Providing the best quality natural, herbal, and eco-friendly products at your doorstep. We believe in pure living and holistic care.
            </p>
            <div className="social-icons">
              <a href="https://instagram.com/puronova_official" aria-label="Instagram Puro Nova" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span style={{ fontSize: '12px', marginLeft: '5px' }}>@puronova_official</span>
              </a>
              <a href="https://instagram.com/heart_full_foods" aria-label="Instagram Heartful Foods" target="_blank" rel="noopener noreferrer" style={{marginLeft: '15px'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span style={{ fontSize: '12px', marginLeft: '5px' }}>@heart_full_foods</span>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/learn">Our Blog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/return-policy">Returns & Replacements</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-policy">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <MapPin size={18} style={{ flexShrink: 0, marginTop: '4px' }} />
              <span>
                Plot No. 127, Suraram Village,<br />
                Gajularamaram, Quthbullapur,<br />
                Medchal-Malkajgiri, Hyderabad,<br />
                Telangana — 500055
              </span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+91 97048 45883</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span><a href="mailto:hello@puronova.in" style={{color: 'inherit', textDecoration: 'none'}}>hello@puronova.in</a></span>
            </div>

            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <p>Subscribe to get updates on new offers.</p>
              <form className="footer-form">
                <input type="email" placeholder="Your email address" />
                <button type="submit"><Send size={18} /></button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PURO NOVA. All Rights Reserved.</p>
          <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.8 }}>FSSAI Registration No: 23625029001465</p>
        </div>
      </div>
      <div className="footer-floating-leaf">🍃</div>
    </footer>
  );
};

export default Footer;
