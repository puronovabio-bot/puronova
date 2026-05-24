import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

import imgDishWash from '../assets/products/Dish Wash.png';
import imgDetergent from '../assets/products/Detergent.png';
import imgFloorCleaner from '../assets/products/Floor Cleaner.jpeg';
import imgFaceWash from '../assets/products/face wash.jpeg';
import imgBodyWash from '../assets/products/Bodywash.png';
import imgToothPowder from '../assets/products/Tooth powder.png';
import imgHandWash from '../assets/products/Handwash.png';
import imgFacePack from '../assets/products/Facepack.png';
import imgShampoo from '../assets/products/Herbal shampoo.png';
import imgHairDye from '../assets/products/Hairdye.png';
import imgPeetambar from '../assets/products/Peetambar.png';
import imgAmrutadhara from '../assets/products/Amrutadhara.png';

const allProducts = [
  { id: 1, name: 'Dish Wash Liquid', brand: 'NeatCo', price: 165, oldPrice: 180, sizes: ['500ml', '1000ml'], img: imgDishWash },
  { id: 2, name: 'Detergent', brand: 'NeatCo', price: 135, oldPrice: 150, sizes: ['500ml', '1000ml'], img: imgDetergent },
  { id: 3, name: 'Floor Cleaner', brand: 'NeatCo', price: 140, oldPrice: 160, sizes: ['500ml', '1000ml'], img: imgFloorCleaner },
  { id: 4, name: 'Face Wash', brand: 'TouchCo', price: 175, oldPrice: 200, sizes: ['100ml', '200ml'], img: imgFaceWash },
  { id: 5, name: 'Body Wash', brand: 'TouchCo', price: 180, oldPrice: 210, sizes: ['200ml', '500ml'], img: imgBodyWash },
  { id: 6, name: 'Tooth Powder', brand: 'TouchCo', price: 120, oldPrice: 140, sizes: ['50gms'], img: imgToothPowder },
  { id: 7, name: 'Hand Wash', brand: 'TouchCo', price: 135, oldPrice: 150, sizes: ['200ml'], img: imgHandWash },
  { id: 8, name: 'Face Pack & Bath Powder', brand: 'TouchCo', price: 135, oldPrice: 160, sizes: ['100gms', '200gms'], img: imgFacePack },
  { id: 9, name: 'Shampoo', brand: 'TouchCo', price: 140, oldPrice: 160, sizes: ['200ml', '500ml'], img: imgShampoo },
  { id: 10, name: 'Natural Hair Dye', brand: 'TouchCo', price: 100, oldPrice: 120, sizes: ['50gms'], img: imgHairDye },
  { id: 11, name: 'Bio Salt Liquid', brand: 'Puro Nova', price: 85, oldPrice: 100, sizes: ['200ml'], img: imgPeetambar },
  { id: 12, name: 'AmruthaDhara', brand: 'Puro Nova', price: 100, oldPrice: 120, sizes: ['10ml'], img: imgAmrutadhara },
];

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlistIds, setWishlistIds] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const removeFromWishlist = (id) => {
    setWishlistIds(prev => prev.filter(wishId => wishId !== id));
    showToast('Removed from wishlist', 'info');
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({ _id: item.id, name: item.name, brand: item.brand, images: [item.img] }, item.sizes[0], item.price, 1);
    removeFromWishlist(item.id);
    showToast(`${item.name} moved to cart!`, 'cart');
    navigate('/cart');
  };

  const wishlistItems = allProducts.filter(p => wishlistIds.includes(p.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <div className="container text-center">
          <div className="empty-icon"><i className="fa-regular fa-heart"></i></div>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love to your wishlist to find them easily later.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            <i className="fa-solid fa-store"></i> Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {/* Toast Notification */}
      {toast && (
        <div className={`shop-toast shop-toast--${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'cart' ? 'fa-cart-plus' : toast.type === 'info' ? 'fa-heart-crack' : 'fa-heart'}`}></i>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="container">
        <div className="wishlist-header">
          <h1 className="heading-md">My Wishlist</h1>
          <span className="wishlist-count">{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}</span>
        </div>
        
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="product-card glass-card">
              <button 
                className="remove-btn" 
                title="Remove from wishlist"
                onClick={() => removeFromWishlist(item.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              
              <div className="product-image-container wishlist-img-wrapper" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.img} alt={item.name} />
              </div>
              
              <div className="product-info">
                <span className="p-cat">{item.brand}</span>
                <h3 className="p-title" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                
                <div className="p-footer">
                  <div className="p-prices">
                    <span className="p-price">₹{item.price}</span>
                    {item.oldPrice && <span className="p-old-price">₹{item.oldPrice}</span>}
                  </div>
                  <button 
                    className="p-add-btn"
                    title="Move to Cart"
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
