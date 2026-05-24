import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

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

const allProducts = {
  1: {
    _id: '1', name: 'Dish Wash Liquid', brand: 'NeatCo by Puro Nova', category: 'Home Care',
    rating: 4.8, numReviews: 24,
    description: 'A powerful yet gentle dish wash liquid with citrus lemon bio-enzyme formula. Cuts through grease naturally while being safe for your hands and the environment.',
    ingredients: 'Citrus bio enzyme, xanthan gum, natural surfactant, essential oil',
    benefits: 'Chemical-free cleaning, Safe for hands, Bio-degradable, Effective grease cutting',
    variants: [{ size: '500ml', price: 165 }, { size: '1 Litre', price: 260 }],
    images: [imgDishWash],
  },
  2: {
    _id: '2', name: 'Detergent', brand: 'NeatCo by Puro Nova', category: 'Home Care',
    rating: 4.7, numReviews: 18,
    description: 'An eco-friendly detergent powered by citrus bio-enzyme technology. Effectively removes stains while being gentle on fabrics and the planet.',
    ingredients: 'Citrus bio enzyme, xanthan gum & guar gum, natural surfactant, essential oil',
    benefits: 'Tough on stains, Gentle on fabrics, Eco-friendly formula, Pleasant citrus fragrance',
    variants: [{ size: '500ml', price: 135 }, { size: '1 Litre', price: 220 }],
    images: [imgDetergent],
  },
  3: {
    _id: '3', name: 'Floor Cleaner', brand: 'NeatCo by Puro Nova', category: 'Home Care',
    rating: 4.9, numReviews: 31,
    description: 'A neem and lemon infused floor cleaner that leaves your floors sparkling clean with a refreshing natural fragrance. Made with coconut-based surfactants for safe and effective cleaning.',
    ingredients: 'Pomegranate & citrus bioenzyme, xanthan gum, Coconut based surfactant, Fragrance oils',
    benefits: 'Natural disinfectant, Anti-bacterial neem, Refreshing fragrance, Safe for kids & pets',
    variants: [{ size: '500ml', price: 140 }, { size: '1 Litre', price: 230 }],
    images: [imgFloorCleaner],
  },
  4: {
    _id: '4', name: 'Face Wash', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.8, numReviews: 42,
    description: 'A gentle face wash enriched with rose and papaya bio-enzymes. Deeply cleanses pores while maintaining skin\'s natural moisture balance for a fresh, glowing complexion.',
    ingredients: 'Rose bio enzyme, papaya bio enzyme, xanthan gum, natural surfactant, essential oils, glycerin',
    benefits: 'Deep pore cleansing, Natural glow, Moisture retention, Suitable for all skin types',
    variants: [{ size: '100ml', price: 175 }, { size: '200ml', price: 290 }],
    images: [imgFaceWash],
  },
  5: {
    _id: '5', name: 'Body Wash', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.9, numReviews: 36,
    description: 'A luxurious body wash infused with raw turmeric and aloe vera for deeply nourishing skin care. The citrus bio-enzyme base ensures a thorough yet gentle cleanse.',
    ingredients: 'Citrus bio enzyme, raw turmeric, nagarmotha, xanthan gum, natural surfactant, aloe vera gel, glycerin, essential oil',
    benefits: 'Deep hydration, Anti-inflammatory turmeric, Soothing aloe vera, Natural fragrance',
    variants: [{ size: '200ml', price: 180 }, { size: '500ml', price: 350 }],
    images: [imgBodyWash],
  },
  6: {
    _id: '6', name: 'Tooth Powder', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.7, numReviews: 28,
    description: 'An Ayurvedic tooth powder crafted with traditional ingredients like gomaya bhasmam, cloves, and rock salt for complete oral care and strong, healthy teeth.',
    ingredients: 'Gomaya bhasmam, pacha karpuram, cloves, rock salt, vamu, jeera, paniya, mint flower, cold pressed sesame oil',
    benefits: 'Strengthens gums, Fresh breath, Natural whitening, Ayurvedic formula',
    variants: [{ size: '50gms', price: 120 }],
    images: [imgToothPowder],
  },
  7: {
    _id: '7', name: 'Hand Wash', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.6, numReviews: 19,
    description: 'A neem-infused hand wash that combines the antibacterial power of neem with gentle citrus bio-enzymes for clean, soft, and protected hands.',
    ingredients: 'Citrus bio enzyme, neem bio enzyme, guar gum, natural surfactant, glycerin, essential oil',
    benefits: 'Anti-bacterial protection, Soft & moisturized hands, Natural neem benefits, Gentle formula',
    variants: [{ size: '200ml', price: 135 }],
    images: [imgHandWash],
  },
  8: {
    _id: '8', name: 'Face Pack & Bath Powder', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.9, numReviews: 45,
    description: 'A versatile herbal powder that works as both a face pack and bath powder. Made with a blend of traditional ingredients like moong dal, kasturi turmeric, and vetiver for radiant skin.',
    ingredients: 'Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multanimatti',
    benefits: 'Radiant skin, Deep exfoliation, Natural ingredients, Dual-purpose formula',
    variants: [{ size: '100gms', price: 135 }, { size: '200gms', price: 220 }],
    images: [imgFacePack],
  },
  9: {
    _id: '9', name: 'Shampoo', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.8, numReviews: 33,
    description: 'A herbal shampoo enriched with soapnuts, shikakai, and hibiscus flowers for naturally strong, shiny, and healthy hair. Free from harsh chemicals.',
    ingredients: 'Citrus bioenzyme, soapnuts, shikakai, dry amla, menthulu, aloevera, Hibiscus flowers, natural surfactants, xanthan gum, fragrance',
    benefits: 'Stronger hair, Natural shine, Reduces hair fall, Chemical-free cleansing',
    variants: [{ size: '200ml', price: 140 }, { size: '500ml', price: 280 }],
    images: [imgShampoo],
  },
  10: {
    _id: '10', name: 'Natural Hair Dye', brand: 'TouchCo by Puro Nova', category: 'Personal Care',
    rating: 4.7, numReviews: 22,
    description: 'A 100% natural hair dye made with mehendi, amla, and other herbal ingredients. Provides rich, long-lasting color without the harmful effects of chemical dyes.',
    ingredients: 'Mahendi, Amla, Reetha, Nagamotha, Jatamasi, Behda, Turmeric, Coffee, Iron Rust',
    benefits: 'Chemical-free coloring, Nourishes hair, Long-lasting color, Conditions while coloring',
    variants: [{ size: '50gms', price: 100 }],
    images: [imgHairDye],
  },
  11: {
    _id: '11', name: 'Bio Salt Liquid', brand: 'Puro Nova', category: 'Wellness & Herbal',
    rating: 4.8, numReviews: 15,
    description: 'A traditional wellness preparation made from rice starch and river salt. Supports digestive health and overall well-being through time-tested Ayurvedic principles.',
    ingredients: 'Rice starch & river salt',
    benefits: 'Digestive support, Natural minerals, Traditional Ayurvedic formula, Easy to consume',
    variants: [{ size: '200ml', price: 85 }],
    images: [imgPeetambar],
  },
  12: {
    _id: '12', name: 'AmruthaDhara', brand: 'Puro Nova', category: 'Wellness & Herbal',
    rating: 4.9, numReviews: 38,
    description: 'A concentrated herbal preparation with mint, camphor, and cow ghee. Provides relief from headaches, cold, and digestive discomfort. A must-have in every household.',
    ingredients: 'Vamu flower, mint flower, pacha karpuram, cow ghee',
    benefits: 'Headache relief, Cold & cough remedy, Digestive aid, Multi-purpose wellness drop',
    variants: [{ size: '10ml', price: 100 }],
    images: [imgAmrutadhara],
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = allProducts[id] || allProducts[1];

  const relatedProducts = Object.values(allProducts)
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const toggleWishlist = () => {
    const numericId = parseInt(product._id, 10);
    setWishlist(prev => {
      if (prev.includes(numericId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== numericId);
      } else {
        showToast('Added to wishlist!', 'success');
        return [...prev, numericId];
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset variant and quantity when product changes
    const currentProduct = allProducts[id] || allProducts[1];
    setSelectedVariant(currentProduct.variants[0]);
    setQuantity(1);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant.size, selectedVariant.price, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-details-page">
      {toast && (
        <div className={`shop-toast shop-toast--${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'cart' ? 'fa-cart-plus' : toast.type === 'info' ? 'fa-heart-crack' : 'fa-heart'}`}></i>
          <span>{toast.message}</span>
        </div>
      )}
      <div className="container">
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span> / 
          <span onClick={() => navigate('/shop')}>Shop</span> / 
          <span>{product.name}</span>
        </div>

        <div className="product-main-grid">
          <div className="product-gallery">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="main-image" 
              onClick={() => setIsLightboxOpen(true)}
              style={{ cursor: 'zoom-in' }}
            />
          </div>

          <div className="product-info-panel">
            <div className="brand-tag">{product.brand}</div>
            <h1 className="product-title">{product.name}</h1>
            


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
              
              <button 
                className={`btn btn-secondary wishlist-btn-large ${wishlist.includes(parseInt(product._id, 10)) ? 'active' : ''}`}
                onClick={toggleWishlist}
                title={wishlist.includes(parseInt(product._id, 10)) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {wishlist.includes(parseInt(product._id, 10)) ? '♥' : '♡'}
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

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2>You may also like</h2>
            <div className="related-product-grid">
              {relatedProducts.map(rp => (
                <div key={rp._id} className="related-product-card" onClick={() => navigate(`/product/${rp._id}`)}>
                  <img src={rp.images[0]} alt={rp.name} className="related-product-img" />
                  <div className="related-product-brand">{rp.brand}</div>
                  <h4 className="related-product-name">{rp.name}</h4>
                  <div className="related-product-price">₹{rp.variants[0].price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>×</div>
          <img src={product.images[0]} alt={product.name} className="lightbox-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
