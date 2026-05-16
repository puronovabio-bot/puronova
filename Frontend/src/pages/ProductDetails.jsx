import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Dummy product data for frontend dev (will be replaced by API call)
  const product = {
    _id: id || '1',
    name: 'Dish Wash Liquid',
    brand: 'NeatCo by Puro Nova',
    category: 'Home Care',
    rating: 4.8,
    numReviews: 24,
    description: 'A powerful yet gentle dish wash liquid with citrus lemon bio-enzyme formula. Cuts through grease naturally while being safe for your hands and the environment.',
    ingredients: 'Citrus bio enzyme, xanthan gum, natural surfactant, essential oil',
    benefits: 'Chemical-free cleaning, Safe for hands, Bio-degradable, Effective grease cutting',
    variants: [
      { size: '500ml', price: 165 },
      { size: '1 Litre', price: 260 },
    ],
    images: ['https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=800&auto=format&fit=crop'],
  };

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant.size, selectedVariant.price, quantity);
    // Optional: show a toast notification here
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span> / 
          <span onClick={() => navigate('/shop')}>Shop</span> / 
          <span>{product.name}</span>
        </div>

        <div className="product-main-grid">
          <div className="product-gallery">
            <img src={product.images[0]} alt={product.name} className="main-image" />
          </div>

          <div className="product-info-panel">
            <div className="brand-tag">{product.brand}</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="rating-row">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-count">{product.rating} ({product.numReviews} Reviews)</span>
            </div>

            <div className="price-display">
              <span className="currency">₹</span>
              <span className="amount">{selectedVariant.price}</span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="variants-section">
              <h3>Select Size</h3>
              <div className="variants-grid">
                {product.variants.map((v, i) => (
                  <button 
                    key={i} 
                    className={`variant-btn ${selectedVariant.size === v.size ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="purchase-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              
              <button className="btn btn-primary add-to-cart-btn-large" onClick={handleAddToCart}>
                Add to Cart
              </button>
              
              <button className="btn btn-secondary wishlist-btn-large">
                ❤
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-icon">🌿</span>
                <div>
                  <strong>Ingredients</strong>
                  <p>{product.ingredients}</p>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">✨</span>
                <div>
                  <strong>Benefits</strong>
                  <p>{product.benefits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
