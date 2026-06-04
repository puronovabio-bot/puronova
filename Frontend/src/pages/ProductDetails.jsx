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
    _id: '1', name: 'Dish Wash Liquid', brand: 'NeatCo', category: 'Home Care',
    rating: 4.8, numReviews: 24,
    description: 'A powerful yet gentle dish wash liquid with citrus lemon bio-enzyme formula. Cuts through grease naturally while being safe for your hands and the environment.',
    ingredients: 'Citrus bio-enzyme, xanthan gum, natural surfactant, essential oil.',
    benefits: 'Plant-based cleaning, Safe for hands, Bio-degradable, Effective grease cutting',
    variants: [{ size: '500ml', price: 149 }, { size: '1000ml', price: 259 }],
    images: [imgDishWash],
  },
  2: {
    _id: '2', name: 'Detergent Liquid', brand: 'NeatCo', category: 'Home Care',
    rating: 4.7, numReviews: 18,
    description: 'An eco-friendly detergent powered by citrus bio-enzyme technology. Effectively removes stains while being gentle on fabrics and the planet.',
    ingredients: 'Citrus bio-enzyme, xanthan gum & guar gum, natural surfactant, essential oil.',
    benefits: 'Tough on stains, Gentle on fabrics, Eco-friendly formula, Pleasant citrus fragrance',
    variants: [{ size: '500ml', price: 135 }, { size: '1000ml', price: 249 }],
    images: [imgDetergent],
  },
  3: {
    _id: '3', name: 'Floor Cleaner', brand: 'NeatCo', category: 'Home Care',
    rating: 4.9, numReviews: 31,
    description: 'A neem and lemon infused floor cleaner that leaves your floors sparkling clean with a refreshing natural fragrance. Made with coconut-based surfactants for safe and effective cleaning.',
    ingredients: 'Pomegranate & citrus bio-enzyme, xanthan gum, coconut-based surfactant, fragrance oils.',
    benefits: 'Natural cleaning power, Anti-bacterial properties, Refreshing fragrance, Family-conscious formulation',
    variants: [{ size: '500ml', price: 120 }, { size: '1000ml', price: 220 }],
    images: [imgFloorCleaner],
  },
  4: {
    _id: '4', name: 'Toilet Cleaner', brand: 'NeatCo', category: 'Home Care',
    rating: 4.6, numReviews: 12,
    description: 'A powerful bio-enzyme based toilet cleaner that effectively removes stains and odors without harsh fumes or corrosive chemicals.',
    ingredients: 'Citrus & soapnut bio-enzyme, guar gum, natural surfactant, essential oil.',
    benefits: 'Effective stain removal, No harsh fumes, Safe for septic systems, Bio-enzyme powered',
    variants: [{ size: '500ml', price: 118 }],
    images: [imgFloorCleaner], /* Placeholder img */
  },
  5: {
    _id: '5', name: 'Face Wash', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 42,
    description: 'A gentle face wash enriched with rose and papaya bio-enzymes. Deeply cleanses pores while maintaining skin\'s natural moisture balance for a fresh, glowing complexion.',
    ingredients: 'Rose bio-enzyme, papaya bio-enzyme, xanthan gum, natural surfactant, essential oils, glycerin.',
    benefits: 'Deep pore cleansing, Natural glow, Moisture retention, Suitable for all skin types',
    variants: [{ size: '100ml', price: 125 }],
    images: [imgFaceWash],
  },
  6: {
    _id: '6', name: 'Body Wash', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.9, numReviews: 36,
    description: 'A luxurious body wash infused with raw turmeric and aloe vera for deeply nourishing skin care. The citrus bio-enzyme base ensures a thorough yet gentle cleanse.',
    ingredients: 'Citrus bio-enzyme, raw turmeric, nagarmotha, xanthan gum, natural surfactant, aloe vera gel, glycerin, essential oil.',
    benefits: 'Deep hydration, Anti-inflammatory turmeric, Soothing aloe vera, Natural fragrance',
    variants: [{ size: '200ml', price: 135 }, { size: '500ml', price: 295 }],
    images: [imgBodyWash],
  },
  7: {
    _id: '7', name: 'Hand Wash', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.6, numReviews: 19,
    description: 'A neem-infused hand wash that combines the antibacterial power of neem with gentle citrus bio-enzymes for clean, soft, and protected hands.',
    ingredients: 'Citrus bio-enzyme, neem bio-enzyme, guar gum, natural surfactant, glycerin, essential oil.',
    benefits: 'Cleansing protection, Soft & moisturized hands, Natural neem benefits, Gentle formula',
    variants: [{ size: '200ml', price: 115 }],
    images: [imgHandWash],
  },
  8: {
    _id: '8', name: 'Vedic Tooth Powder', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 28,
    description: 'An Ayurvedic tooth powder crafted with traditional ingredients like gomaya bhasmam, cloves, and rock salt for complete oral care and strong, healthy teeth.',
    ingredients: 'Gomaya bhasmam, pacha karpuram, cloves, rock salt, vamu, jeera, paniya, mint flower, cold-pressed sesame oil.',
    benefits: 'Supports oral hygiene, Fresh breath, Natural ingredients, Ayurvedic formula',
    variants: [{ size: '50g', price: 120 }],
    images: [imgToothPowder],
  },
  9: {
    _id: '9', name: 'Face Pack & Bath Powder', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.9, numReviews: 45,
    description: 'A versatile herbal powder that works as both a face pack and bath powder. Made with a blend of traditional ingredients like moong dal, kasturi turmeric, and vetiver for radiant skin.',
    ingredients: 'Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multani mitti.',
    benefits: 'Radiant skin, Deep exfoliation, Natural ingredients, Dual-purpose formula',
    variants: [{ size: '200g', price: 249 }],
    images: [imgFacePack],
  },
  10: {
    _id: '10', name: 'Shampoo', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 33,
    description: 'A herbal shampoo enriched with soapnuts, shikakai, and hibiscus flowers for naturally strong, shiny, and healthy hair. Free from harsh additives.',
    ingredients: 'Citrus bio-enzyme, soapnuts, shikakai, dry amla, menthulu, aloe vera, hibiscus flowers, natural surfactants, xanthan gum, fragrance.',
    benefits: 'Supports healthy hair, Natural shine, Gentle cleansing, Free from harsh additives',
    variants: [{ size: '200ml', price: 140 }, { size: '500ml', price: 350 }],
    images: [imgShampoo],
  },
  11: {
    _id: '11', name: 'Natural Hair Dye', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 22,
    description: 'A natural hair dye made with mehendi, amla, and other herbal ingredients. Provides rich, long-lasting color without the harmful effects of synthetic dyes.',
    ingredients: 'Mehendi, Amla, Reetha, Nagarmotha, Jatamansi, Behda, Turmeric, Coffee, Iron Rust.',
    benefits: 'Free from harsh additives, Nourishes hair, Natural color, Conditions while coloring',
    variants: [{ size: '50g', price: 100 }],
    images: [imgHairDye],
  },
  12: {
    _id: '12', name: 'Moisturizing Face Cream', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 29,
    description: 'A luxurious daily skin repair formula crafted for deep moisturization, nourishment, and natural glow. Specially formulated for all skin types, particularly dry and sensitive skin.',
    ingredients: 'Shea Butter, Mango Butter, Jojoba Oil, Almond Oil, Vitamin E Oil, Ghee, Kesar (Saffron), and Special Herbs.',
    benefits: 'Deep hydration and skin repair, improves skin elasticity, nourishes and smoothens skin, reduces fine lines, brightens skin tone, and enhances natural glow.',
    variants: [{ size: '50g', price: 200 }],
    images: [imgFaceWash], /* Placeholder img */
  },
  13: {
    _id: '13', name: 'Herbal Tea Powder', brand: 'Wellness', category: 'Wellness & Herbal',
    rating: 4.7, numReviews: 21,
    description: 'A soothing and aromatic herbal tea blend formulated with traditional spices to support digestion and overall wellness.',
    ingredients: 'Tulsi, ginger, dry lemon peel, coriander seeds, cardamom, black pepper.',
    benefits: 'Supports digestion, Comforting aroma, Natural spices, Wellness support',
    variants: [{ size: '100g', price: 95 }],
    images: [imgPeetambar], /* Placeholder img */
  },
  14: {
    _id: '14', name: 'Pitambar (Peetambar) Metal Shine Powder', brand: 'Wellness', category: 'Wellness & Herbal',
    rating: 4.8, numReviews: 35,
    description: 'A traditional metal cleaning and shining powder formulated with natural cleaning agents. Restores brilliant shine to copper, brass, bronze, aluminum, and iron vessels.',
    ingredients: 'Citrus peel extracts, tamarind pulp actives, river salt, natural foaming agents, polishing clays.',
    benefits: 'Effectively cuts through oil, grease, tarnish, and oxide layers without leaving scratches. Gentle on hands and completely biodegradable.',
    variants: [{ size: '200g', price: 75 }],
    images: [imgPeetambar],
  },
  15: {
    _id: '15', name: 'Amrutha Dhara', brand: 'Wellness', category: 'Wellness & Herbal',
    rating: 4.9, numReviews: 38,
    description: 'A concentrated herbal preparation with mint, camphor, and cow ghee. Provides soothing relief and is a must-have in every household.',
    ingredients: 'Vamu flower, mint flower, pacha karpuram, cow ghee.',
    benefits: 'Soothing relief, Comforting aroma, Traditional formulation, Multi-purpose wellness drop',
    variants: [{ size: '10ml', price: 90 }],
    images: [imgAmrutadhara],
  },
  16: {
    _id: '16', name: 'Dry Fruit Laddu', brand: 'Heartful Foods', category: 'Heartful Foods',
    rating: 4.9, numReviews: 54,
    description: 'A wholesome and energy-packed traditional sweet made entirely from premium dry fruits and cow ghee, with no added refined sugar.',
    ingredients: 'Almonds, cashews, pistachios, dates, walnuts, cow ghee.',
    benefits: 'Energy boosting, No refined sugar, Rich in nuts, Wholesome snack',
    variants: [{ size: '250g', price: 325 }, { size: '500g', price: 599 }, { size: '1kg', price: 1150 }],
    images: [imgFacePack], /* Placeholder img */
  },
  17: {
    _id: '17', name: 'Sesame & Flax Seed Laddu', brand: 'Heartful Foods', category: 'Heartful Foods',
    rating: 4.8, numReviews: 27,
    description: 'A nutrient-dense traditional laddu combining the goodness of black sesame seeds and flax seeds, sweetened with organic jaggery.',
    ingredients: 'Black sesame seeds, flax seeds, organic jaggery, cow ghee.',
    benefits: 'Nutrient-rich, Traditional recipe, Sweetened with jaggery, Wholesome snack',
    variants: [{ size: '500g', price: 249 }, { size: '1kg', price: 499 }],
    images: [imgFacePack], /* Placeholder img */
  },
  18: {
    _id: '18', name: 'Protein Powder', brand: 'Heartful Foods', category: 'Heartful Foods',
    rating: 4.8, numReviews: 41,
    description: 'A natural, plant-based protein supplement made from sprouted ragi and nuts, perfect for daily nutritional support.',
    ingredients: 'Sprouted ragi, almonds, walnuts, cardamom, dry ginger.',
    benefits: 'Plant-based protein, Easy to digest, Natural ingredients, Supports daily nutrition',
    variants: [{ size: '500g', price: 700 }],
    images: [imgFacePack], /* Placeholder img */
  },
  19: {
    _id: '19', name: 'Organic Jaggery', brand: 'Heartful Foods', category: 'Heartful Foods',
    rating: 4.9, numReviews: 62,
    description: 'Pure, unrefined organic jaggery made from raw sugarcane juice using traditional boiling processes. A healthier alternative to refined sugar.',
    ingredients: 'Raw sugarcane juice, traditional boiling process.',
    benefits: 'Unrefined sweetener, Retains natural minerals, Traditional process, Processing without harsh additives',
    variants: [{ size: '500g', price: 55 }, { size: '1kg', price: 110 }],
    images: [imgFacePack], /* Placeholder img */
  },
  20: {
    _id: '20', name: 'Papads', brand: 'Heartful Foods', category: 'Heartful Foods',
    rating: 4.7, numReviews: 18,
    description: 'Traditional, handmade papads prepared with urad dal and organic spices, sun-dried to perfection for the perfect crunch.',
    ingredients: 'Urad dal, organic spices, cold-pressed sesame oil.',
    benefits: 'Handmade, Traditional taste, Sun-dried, Perfect accompaniment',
    variants: [{ size: '10pc', price: 50 }, { size: '25pc', price: 125 }, { size: '50pc', price: 250 }],
    images: [imgFacePack], /* Placeholder img */
  },
};

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
  const product = Object.values(allProducts).find(p => getSlug(p.name) === slug) || allProducts[1];

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
    setSelectedVariant(product.variants[0]);
    setQuantity(1);
    document.title = `${product.name} | Puro Nova`;
  }, [slug, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant.size, selectedVariant.price, quantity);
    navigate('/cart');
  };

  const handleBack = () => {
    navigate('/shop');
  };

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://puronova.in/products/${getSlug(product.name)}`,
      "priceCurrency": "INR",
      "price": selectedVariant.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="product-details-page">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
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
