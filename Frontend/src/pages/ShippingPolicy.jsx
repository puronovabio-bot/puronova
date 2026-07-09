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

          <h2>2. Shipping Rates & Free Shipping</h2>
          <ul>
            <li>Orders of <strong>₹500 and above</strong> qualify for <strong>Free Shipping</strong> nationwide.</li>
            <li>Orders below ₹500 incur a standard flat shipping fee of <strong>₹50</strong>.</li>
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
