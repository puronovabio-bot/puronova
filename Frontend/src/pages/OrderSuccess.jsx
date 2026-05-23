import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="order-success-page">
      <div className="success-container">
        <i className="fa-solid fa-circle-check success-icon"></i>
        <h1>Order Confirmed!</h1>
        <p>
          Thank you for your purchase. Your order has been placed successfully and we have sent an order confirmation email to you.
        </p>
        <p>
          We are getting your items ready and will notify you once they ship!
        </p>
        <div className="success-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
