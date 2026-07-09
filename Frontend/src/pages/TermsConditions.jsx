import React from 'react';
import SEO from '../components/SEO';
import './Policies.css';

const TermsConditions = () => {
  return (
    <div className="policy-page">
      <SEO title="Terms & Conditions" url="/terms-policy" />
      <div className="container">
        <div className="policy-card">
          <div className="section-head">
            <i className="fa-solid fa-file-contract policy-header-icon"></i>
            <h1>Terms & Conditions</h1>
          </div>
          <p className="policy-meta">Last Updated: May 27, 2026</p>
          <p>
            By accessing this website, purchasing products, or engaging with our service lines, you agree to comply 
            with and be bound by these Terms & Conditions. Please read them carefully before finalizing transactions.
          </p>

          <h2>1. Small-Batch Natural Product Variances</h2>
          <p>
            Because Puro Nova products (including NeatCo, TouchCo, and Heart-full Foods) are formulated using natural, 
            plant-based actives and fermented bio-enzymes in small batches, minor natural variances in product color, 
            scent intensity, and thickness may occur. These are normal, safe characteristics of pure botanical 
            processing and do not constitute product defects.
          </p>

          <h2>2. Use of Products & Liability</h2>
          <p>
            Our wellness and personal care formulations are designed with family safety in mind. Always perform 
            patch tests before continuous topical applications. NeatCo cleaners must be used strictly as directed on 
            packaging. Puro Nova is not liable for outcomes resulting from product misuse.
          </p>

          <h2>3. Orders, Pricing, and GST</h2>
          <p>
            All prices published on our online shop are in Indian Rupees (₹), inclusive of GST. We reserve the right 
            to refuse or cancel any orders containing typographic or pricing errors. In such cases, a complete refund 
            will be automatically initiated back to the original payment source.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The designs, formulations, visual banners, brand names (Puro Nova, NeatCo, TouchCo, Heartful Foods), 
            and code structures are the sole intellectual property of Puro Nova.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
