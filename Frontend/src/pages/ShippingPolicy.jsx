import React from 'react';
import SEO from '../components/SEO';
import './Policies.css';

const ShippingPolicy = () => {
  return (
    <div className="policy-page">
      <SEO title="Shipping Policy" url="/shipping-policy" />
      <div className="container">
        <div className="policy-card">
          <div className="section-head">
            <i className="fa-solid fa-truck-fast policy-header-icon"></i>
            <h1>Shipping Policy</h1>
          </div>
          <p className="policy-meta">Last Updated: May 27, 2026</p>
          <p>
            We deliver nationwide to ensure premium natural home care and botanical skin solutions reach your home 
            swiftly and securely.
          </p>

          <h2>1. Order Dispatch & Timelines</h2>
          <ul>
            <li><strong>Processing:</strong> Most orders are securely packaged and dispatched within <strong>24 to 48 working hours</strong>.</li>
            <li><strong>Delivery Timeline:</strong> Domestic shipping typically takes <strong>3 to 7 business days</strong> depending on your region's logistical accessibility.</li>
          </ul>

          <h2>2. Shipping Rates & Charges</h2>
          <p>Shipping charges are calculated based on the total purchase weight in grams:</p>
          <ul>
            <li><strong>Up to 500g:</strong> ₹40</li>
            <li><strong>501g to 1000g:</strong> ₹60</li>
            <li><strong>1001g to 2000g:</strong> ₹100</li>
            <li><strong>2001g to 4000g:</strong> ₹150</li>
            <li><strong>Above 4000g (4001g+):</strong> ₹180</li>
          </ul>

          <h2>3. Real-Time Shipment Tracking</h2>
          <p>
            Once your order departs our facilities, a unique tracking number and logistics link will be shared 
            immediately via email and SMS so you can monitor transit details in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
