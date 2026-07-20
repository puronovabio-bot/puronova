import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  
  const parseGrams = (sizeStr) => {
    if (!sizeStr) return 0;
    const str = sizeStr.toLowerCase().trim();
    
    // Extract number and unit
    const numMatch = str.match(/^([\d.]+)\s*([a-zA-Z]+)?$/);
    if (!numMatch) return 0;
    
    const value = parseFloat(numMatch[1]);
    const unit = numMatch[2] || '';
    
    if (unit === 'kg' || unit === 'l' || unit === 'litre') {
      return value * 1000;
    }
    // All other units: ml, g, gm, gms, etc., map 1-to-1 to grams
    return value;
  };

  const getShippingCharge = (grams) => {
    if (grams <= 0) return 0;
    if (grams <= 500) return 40;
    if (grams <= 1000) return 60;
    if (grams <= 2000) return 100;
    if (grams <= 4000) return 150;
    return 180;
  };

  const totalGrams = cartItems.reduce((acc, item) => {
    return acc + (parseGrams(item.size) * item.quantity);
  }, 0);

  const shipping = getShippingCharge(totalGrams);
  const total = subtotal + (cartItems.length > 0 ? shipping : 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <SEO title="Your Cart" url="/cart" />
        <div className="container text-center">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any natural goodness yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '20px' }}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <SEO title="Your Cart" url="/cart" />
      <div className="container">
        <h1 className="heading-md" style={{ marginBottom: '40px' }}>Shopping Cart ({cartItems.length})</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item._id}-${item.size}-${index}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <div className="cart-item-brand">{item.brand}</div>
                  <h3 className="cart-item-title">{item.name}</h3>
                  <div className="cart-item-size">Size: {item.size}</div>
                </div>

                <div className="cart-item-price">
                  ₹{item.price}
                </div>

                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}>+</button>
                </div>

                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>

                <button 
                  className="cart-item-remove" 
                  onClick={() => removeFromCart(item._id, item.size)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
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

            <button 
              className="btn btn-primary checkout-btn"
              onClick={() => navigate('/checkout', { state: { subtotal, shipping, total, cartItems } })}
            >
              Proceed to Checkout
            </button>
            
            <button className="btn btn-secondary continue-shopping-btn" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
