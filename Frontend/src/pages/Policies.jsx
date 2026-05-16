import React from 'react';
import './Policies.css';

const Policies = () => {
  return (
    <div className="policies-page">
      <div className="container">
        <div className="policy-layout">
          <aside className="policy-sidebar">
            <nav>
              <a href="#privacy" className="active">Privacy Policy</a>
              <a href="#terms">Terms & Conditions</a>
              <a href="#shipping">Shipping Policy</a>
              <a href="#returns">Returns & Refunds</a>
            </nav>
          </aside>
          
          <main className="policy-content">
            <section id="privacy">
              <h1>Privacy Policy</h1>
              <p>Last Updated: May 2026</p>
              <p>
                At Puro Nova, we value your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you 
                visit our website or make a purchase.
              </p>
              <h2>1. Information We Collect</h2>
              <p>
                We collect personal information that you provide to us, such as your name, address, 
                email, and phone number when you create an account or place an order.
              </p>
              <h2>2. How We Use Your Information</h2>
              <p>
                We use your information to process your orders, communicate with you about your 
                purchases, and improve our services.
              </p>
            </section>

            <div className="policy-divider"></div>

            <section id="terms">
              <h1>Terms & Conditions</h1>
              <p>
                By using our website, you agree to comply with and be bound by the following 
                terms and conditions of use.
              </p>
              <h2>1. Use of the Website</h2>
              <p>
                The content of the pages of this website is for your general information and use only. 
                It is subject to change without notice.
              </p>
              <h2>2. Product Accuracy</h2>
              <p>
                While we strive for accuracy, we do not warrant that product descriptions or other 
                content on this site are accurate, complete, or error-free.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Policies;
