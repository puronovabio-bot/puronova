import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderFailed.css';

const OrderFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="order-failed-page">
      <div className="failed-container">
        <i className="fa-solid fa-circle-xmark failed-icon"></i>
        <h1>Payment Failed</h1>
        <p>
          Unfortunately, your payment could not be processed successfully. Your account has not been charged.
        </p>
        <p>
          Please check your payment details or try a different payment method.
        </p>
        <div className="failed-actions">
          <button className="btn btn-primary" onClick={() => navigate('/cart')}>
            Return to Cart
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
