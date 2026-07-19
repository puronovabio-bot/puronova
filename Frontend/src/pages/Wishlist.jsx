import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import './Wishlist.css';

import imgDishWash from '../assets/products/Dish Wash.png';
import imgDetergent from '../assets/products/Detergent.png';
import imgFloorCleaner from '../assets/products/Floor Cleaner.jpeg';
import imgFaceWash from '../assets/products/face wash.jpeg';
import imgBodyWash from '../assets/products/body-wash.jpg';
import imgToothPowder from '../assets/products/tooth.jpg';
import imgHandWash from '../assets/products/Handwash.png';
import imgFacePack from '../assets/products/Facepack.png';
import imgShampoo from '../assets/products/Herbal shampoo.png';
import imgHairDye from '../assets/products/hair-dye.jpeg';
import imgPeetambar from '../assets/products/Peetambar.png';
import imgAmrutadhara from '../assets/products/Amrutadhara.png';
import imgA2Ghee from '../assets/products/A2-cow-ghee.jpeg';
import imgProteinJawa from '../assets/products/protein.jpeg';
import imgDryFruit from '../assets/products/dryfruit.jpeg';
import imgLipBalm from '../assets/products/beetroot.jpg';
import imgLipBalmVanilla from '../assets/products/vennela.jpg';
import imgLipBalmMixFruit from '../assets/products/mix-fruit.jpg';
import imgHairOil from '../assets/products/hair-oil.jpeg';
import imgFaceCream from '../assets/products/Moisturizing face cream.png';
import imgDiabeticTea from '../assets/products/diabetics.jpg';
import imgGastricTea from '../assets/products/gastric.jpg';
import imgHeartHealthyTea from '../assets/products/Heart-healthy.jpg';
const allProducts = [
  { id: 1, name: 'Dish Wash', brand: 'NeatCo', price: 215, oldPrice: 215, sizes: ['500ml', '1L'], img: imgDishWash },
  { id: 2, name: 'Detergent', brand: 'NeatCo', price: 200, oldPrice: 200, sizes: ['500ml', '1L'], img: imgDetergent },
  { id: 3, name: 'Floor Cleaner', brand: 'NeatCo', price: 195, oldPrice: 195, sizes: ['500ml', '1L'], img: imgFloorCleaner },
  { id: 4, name: 'Bio Pitambar', brand: 'NeatCo', price: 250, oldPrice: 250, sizes: ['500ml'], img: imgPeetambar }, /* Placeholder img */
  { id: 5, name: 'Rose + Papaya Face Wash', brand: 'TouchCo', price: 225, oldPrice: 225, sizes: ['100ml', '200ml'], img: imgFaceWash },
  { id: 6, name: 'Herbal Facepack Powder', brand: 'TouchCo', price: 175, oldPrice: 175, sizes: ['100g'], img: imgFacePack },
  { id: 7, name: 'Face Cream', brand: 'TouchCo', price: 220, oldPrice: 220, sizes: ['50g'], img: imgFaceCream },
  { id: 8, name: 'Bees Wax Lip Balm, Beetroot', brand: 'TouchCo', price: 230, oldPrice: 230, sizes: ['20g'], img: imgLipBalm },
  { id: 9, name: 'Body Wash', brand: 'TouchCo', price: 235, oldPrice: 235, sizes: ['200ml', '500ml'], img: imgBodyWash },
  { id: 10, name: 'Bio Enzyme Shampoo', brand: 'TouchCo', price: 190, oldPrice: 190, sizes: ['200ml', '500ml'], img: imgShampoo },
  { id: 11, name: 'Chemical-Free Black Henna / Hair Dye', brand: 'TouchCo', price: 150, oldPrice: 150, sizes: ['50g'], img: imgHairDye },
  { id: 12, name: 'Hair Oil', brand: 'TouchCo', price: 215, oldPrice: 215, sizes: ['100ml'], img: imgHairOil },
  { id: 13, name: 'Neem + Citrus Hand Wash', brand: 'TouchCo', price: 185, oldPrice: 185, sizes: ['200ml'], img: imgHandWash },
  { id: 14, name: 'Vedic Tooth Powder', brand: 'TouchCo', price: 170, oldPrice: 170, sizes: ['50g'], img: imgToothPowder },
  { id: 15, name: 'Amruta Dhara', brand: 'Wellness / Traditional', price: 150, oldPrice: 150, sizes: ['10ml'], img: imgAmrutadhara },
  { id: 16, name: 'Dry Fruit Laddu', brand: 'Heart-full Foods', price: 325, oldPrice: 325, sizes: ['250g', '500g', '1kg'], img: imgDryFruit },
  { id: 17, name: 'Protein Jawa', brand: 'Heart-full Foods', price: 700, oldPrice: 700, sizes: ['500g'], img: imgProteinJawa },
  { id: 18, name: 'A2 Cow Ghee', brand: 'Heart-full Foods', price: 1400, oldPrice: 1400, sizes: ['500g', '1kg'], img: imgA2Ghee },
  { id: 19, name: 'Bees Wax Lip Balm, Vanilla', brand: 'TouchCo', price: 230, oldPrice: 230, sizes: ['20g'], img: imgLipBalmVanilla },
  { id: 20, name: 'Bees Wax Lip Balm, Mixed Fruit', brand: 'TouchCo', price: 230, oldPrice: 230, sizes: ['20g'], img: imgLipBalmMixFruit },
  { id: 21, name: 'Diabetic tea', brand: 'Health Care', price: 93, oldPrice: 93, sizes: ['100g'], img: imgDiabeticTea },
  { id: 22, name: 'Gastric tea', brand: 'Health Care', price: 114, oldPrice: 114, sizes: ['100g'], img: imgGastricTea },
  { id: 23, name: 'Heart health tea', brand: 'Health Care', price: 110, oldPrice: 110, sizes: ['100g'], img: imgHeartHealthyTea },
];

const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[&]/g, 'and');

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
        <SEO title="Your Wishlist" url="/wishlist" />
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
      <SEO title="Your Wishlist" url="/wishlist" />
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
              
              <div className="product-image-container wishlist-img-wrapper" onClick={() => navigate(`/products/${getSlug(item.name)}`)}>
                <img src={item.img} alt={item.name} />
              </div>
              
              <div className="product-info">
                <span className="p-cat">{item.brand}</span>
                <h3 className="p-title" onClick={() => navigate(`/products/${getSlug(item.name)}`)}>{item.name}</h3>
                
                <div className="p-footer">
                  <div className="p-prices">
                    <span className="p-old-price">₹{Math.round(item.price * 1.1)}</span>
                    <span className="p-price">₹{item.price}</span>
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
