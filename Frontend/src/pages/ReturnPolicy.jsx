import React, { useEffect } from 'react';
import './Policies.css';

const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Return Policy | Puro Nova';
  }, []);

  return (
    <div className="policy-page">
      <div className="container">
        <div className="policy-card">
          <div className="section-head">
            <i className="fa-solid fa-circle-exclamation policy-header-icon text-warning"></i>
            <h1>Returns & Replacements</h1>
          </div>
          <p className="policy-meta">Last Updated: May 27, 2026</p>
          
          <div className="alert-box-warning">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <div>
              <strong>Important Notice: Returns & Replacements Not Available</strong>
              <p>
                Due to the hygiene, safety, small-batch, and highly natural composition of our personal care, wellness, 
                and home care solutions, **all sales are final**. We do not accept physical returns, exchanges, or offer 
                replacements for delivered goods under normal circumstances.
              </p>
            </div>
          </div>

          <h2>1. Why is this policy in place?</h2>
          <p>
            To maintain our promise of supplying purely unadulterated, free from harsh additives, and contaminant-free batches 
            directly to homes, we cannot restock or redistribute items that have left our secure custody. This 
            policy protects all families against product contamination and keeps standards pristine.
          </p>

          <h2>2. Transit Damages & Incorrect Shipments</h2>
          <p>
            In the rare event that your product suffers critical leakage/breakage during shipping, or if an incorrect 
            item is dispatched, we are dedicated to resolving the issue immediately.
          </p>
          <p>
            To qualify for a refund or store credit in these scenarios, please comply with these essential guidelines:
          </p>
          <ul>
            <li><strong>Reporting Timeframe:</strong> Damage or shipment mismatch claims must be sent to our support desk via email within <strong>24 hours</strong> of delivery.</li>
            <li><strong>Mandatory Unboxing Video:</strong> You must attach a <strong>continuous, unedited unboxing video</strong>. The video must show the shipping label, package condition before opening, and the damaged or incorrect item clearly within the recording.</li>
          </ul>

          <h2>3. Verified Claim Resolutions</h2>
          <p>
            Upon verification of your unboxing video and details, we will issue a store credit note or complete payment 
            refund back to your bank account/original payment method within 5-7 working days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
