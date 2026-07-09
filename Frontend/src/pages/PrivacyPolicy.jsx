import React from 'react';
import SEO from '../components/SEO';
import './Policies.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <SEO title="Privacy Policy" url="/privacy-policy" />
      <div className="container">
        <div className="policy-card">
          <div className="section-head">
            <i className="fa-solid fa-user-shield policy-header-icon"></i>
            <h1>Privacy Policy</h1>
          </div>
          <p className="policy-meta">Last Updated: May 27, 2026</p>
          <p>
            At Puro Nova, we value your trust and are highly committed to protecting your personal data. 
            This Privacy Policy outlines how we collect, use, store, and safeguard your details when you 
            interact with our storefront or utilize our wellness and cleaning solutions.
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We only collect information necessary to fulfill orders and enhance your custom shopping experience:
          </p>
          <ul>
            <li><strong>Identity & Contact Details:</strong> Name, shipping address, billing address, phone number, and email.</li>
            <li><strong>Transaction details:</strong> Order details, order history, transaction dates, and items purchased.</li>
            <li><strong>Technical Information:</strong> Device details, IP addresses, and session details processed via standard secure cookies.</li>
          </ul>

          <h2>2. Secure Payment Processing</h2>
          <p>
            We prioritize credit card and online banking security. All transactions are securely routed through 
            industry-standard, certified PCI-DSS payment gateways. Puro Nova **never stores** your credit card numbers, 
            cvv codes, or payment credentials on our servers.
          </p>

          <h2>3. How We Use Your Data</h2>
          <p>
            Your details are utilized strictly to facilitate deliveries, communicate tracking numbers, process payments, 
            and send occasional newsletters (only if opted in). We do not rent, sell, or trade your personal data 
            with third-party marketing companies under any circumstances.
          </p>

          <h2>4. Third-Party Disclosures</h2>
          <p>
            We share essential details strictly with our reliable logistics partners (e.g. shipping carriers) to dispatch 
            orders and ensure correct, safe doorstep delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
