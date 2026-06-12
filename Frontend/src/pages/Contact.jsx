import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Simulate API call
    setTimeout(() => {
      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-section">
            <h1 className="heading-md">Get in Touch</h1>
            <p className="contact-desc">
              Have questions about our bio-enzyme powered products or your order? 
              Our team is here to help you embrace a more organic lifestyle.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <span className="info-icon">📍</span>
                <div>
                  <h4>Our Location</h4>
                  <p style={{ margin: 0, lineHeight: '1.5' }}>
                    Plot No. 127, Suraram Village,<br />
                    Gajularamaram, Quthbullapur,<br />
                    Medchal-Malkajgiri, Hyderabad,<br />
                    Telangana — 500055
                  </p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">📞</span>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 97048 45883</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">✉️</span>
                <div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:hello@puronova.in">hello@puronova.in</a></p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Our Journey</h3>
              <div className="contact-social-icons">
                <a href="#"><Instagram size={18} /> Instagram</a>
                <a href="#"><Facebook size={18} /> Facebook</a>
                <a href="#"><Linkedin size={18} /> LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="glass-card contact-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange}>
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Wholesale/Bulk Orders</option>
                    <option>Product Feedback</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                  Send Message ➔
                </button>
                {status && <p className="form-status">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
