import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // For now, static wishlist. In real app, this comes from useAuth().user.wishlist or localStorage
  const wishlistItems = [
    { id: 1, name: 'Dish Wash Liquid', brand: 'NeatCo', price: 165, img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=300&h=300&auto=format&fit=crop', sizes: ['500ml', '1000ml'] },
    { id: 4, name: 'Face Wash', brand: 'TouchCo', price: 175, img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&h=300&auto=format&fit=crop', sizes: ['100ml', '200ml'] },
  ];

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <div className="container text-center">
          <div className="empty-icon">❤</div>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love to your wishlist to find them easily later.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>Explore Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="heading-md" style={{ marginBottom: '40px' }}>My Wishlist ({wishlistItems.length})</h1>
        
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card glass-card">
              <button className="remove-btn" title="Remove from wishlist">✕</button>
              <div className="wishlist-img-wrapper" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.img} alt={item.name} />
              </div>
              <div className="wishlist-content">
                <span className="item-brand">{item.brand}</span>
                <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
                <button 
                  className="btn btn-secondary add-btn"
                  onClick={() => addToCart({ _id: item.id, name: item.name, brand: item.brand, images: [item.img] }, item.sizes[0], item.price, 1)}
                >
                  Move to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
