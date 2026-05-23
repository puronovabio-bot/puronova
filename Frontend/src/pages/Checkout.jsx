import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Checkout.css';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { clearCart } = useCart();
  
  const { subtotal, shipping, total, cartItems } = location.state || { subtotal: 0, shipping: 0, total: 0, cartItems: [] };

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay'
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    window.scrollTo(0, 0);
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to place an order");
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => {
          // Convert simple mock IDs to valid 24-char hex ObjectIds for MongoDB
          const validObjectId = /^[0-9a-fA-F]{24}$/.test(String(item._id)) 
            ? item._id 
            : '6000000000000000000000' + String(item._id).padStart(2, '0');
            
          return {
            product: validObjectId,
            name: item.name,
            image: item.image,
            size: item.size,
            price: item.price,
            quantity: item.quantity
          };
        }),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        subtotal,
        shippingCharge: shipping,
        tax: 0,
        discount: 0,
        total,
        coupon: '',
        paymentMethod: formData.paymentMethod
      };

      const orderRes = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!orderRes.data.success) {
        alert("Failed to create order");
        return;
      }

      const orderId = orderRes.data.order._id;

      if (formData.paymentMethod === 'cod') {
        clearCart();
        navigate('/order-success');
        return;
      }

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const rzpOrderRes = await axios.post('http://localhost:5000/api/payments/create-order', {
        amount: total,
        orderId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!rzpOrderRes.data.success) {
        alert("Failed to initiate payment");
        return;
      }

      const { razorpayOrderId, keyId, amount, currency } = rzpOrderRes.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Puro Nova",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post('http://localhost:5000/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (verifyRes.data.success) {
              clearCart();
              navigate('/order-success');
            } else {
              navigate('/order-failed');
            }
          } catch (err) {
            console.error("Payment verification error", err);
            navigate('/order-failed');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#1e4d3b"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        navigate('/order-failed');
      });
      rzp.open();

    } catch (err) {
      console.error("Order error:", err);
      alert(err.response?.data?.message || "Something went wrong while placing order");
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="checkout-page">
      <div className="container checkout-container">
        <div className="checkout-form-section">
          <h2>Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>PIN Code</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
              </div>
            </div>

            <h2 style={{ marginTop: '30px' }}>Payment Method</h2>
            <div className="payment-methods">
              <label className={`payment-option ${formData.paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="razorpay" 
                  checked={formData.paymentMethod === 'razorpay'} 
                  onChange={handleChange} 
                />
                <span className="payment-name">Razorpay (UPI, Cards, NetBanking)</span>
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={formData.paymentMethod === 'cod'} 
                  onChange={handleChange} 
                />
                <span className="payment-name">Cash on Delivery (COD)</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary place-order-btn">
              {formData.paymentMethod === 'razorpay' ? 'Pay Securely with Razorpay' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item, index) => (
              <div key={index} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size} | Qty: {item.quantity}</p>
                </div>
                <div className="item-price">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
