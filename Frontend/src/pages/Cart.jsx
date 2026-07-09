import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + (cartItems.length > 0 ? shipping : 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
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

            {shipping > 0 && (
              <div className="free-shipping-notice">
                Add ₹{500 - subtotal} more to get free shipping!
              </div>
            )}

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
