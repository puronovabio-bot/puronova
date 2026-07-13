import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import './ProductDetails.css';

import imgDishWash from '../assets/products/Dish Wash.png';
import imgDetergent from '../assets/products/Detergent.png';
import imgFloorCleaner from '../assets/products/Floor Cleaner.jpeg';
import imgFaceWash from '../assets/products/face wash.jpeg';
import imgBodyWash from '../assets/products/Bodywash.png';
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

const allProducts = {
  1: {
    _id: '1', name: 'Dish Wash', brand: 'NeatCo', category: 'Home Care & Hygiene',
    rating: 4.8, numReviews: 24,
    description: 'A powerful yet gentle dish wash liquid with citrus lemon bio-enzyme formula. Cuts through grease naturally while being safe for your hands and the environment.',
    ingredients: 'Citrus bio-enzyme, xanthan gum, natural surfactant, essential oil.',
    benefits: 'Plant-based cleaning, Safe for hands, Bio-degradable, Effective grease cutting',
    variants: [{ size: '500ml', price: 215 }, { size: '1L', price: 430 }],
    images: [imgDishWash],
  },
  2: {
    _id: '2', name: 'Detergent', brand: 'NeatCo', category: 'Home Care & Hygiene',
    rating: 4.7, numReviews: 18,
    description: 'An eco-friendly detergent powered by citrus bio-enzyme technology. Effectively removes stains while being gentle on fabrics and the planet.',
    ingredients: 'Citrus bio-enzyme, xanthan gum & guar gum, natural surfactant, essential oil.',
    benefits: 'Tough on stains, Gentle on fabrics, Eco-friendly formula, Pleasant citrus fragrance',
    variants: [{ size: '500ml', price: 200 }, { size: '1L', price: 380 }],
    images: [imgDetergent],
  },
  3: {
    _id: '3', name: 'Floor Cleaner', brand: 'NeatCo', category: 'Home Care & Hygiene',
    rating: 4.9, numReviews: 31,
    description: 'A neem and lemon infused floor cleaner that leaves your floors sparkling clean with a refreshing natural fragrance. Made with coconut-based surfactants for safe and effective cleaning.',
    ingredients: 'Pomegranate & citrus bio-enzyme, xanthan gum, coconut-based surfactant, fragrance oils.',
    benefits: 'Natural cleaning power, Anti-bacterial properties, Refreshing fragrance, Family-conscious formulation',
    variants: [{ size: '500ml', price: 195 }, { size: '1L', price: 360 }],
    images: [imgFloorCleaner],
  },
  4: {
    _id: '4', name: 'Bio Pitambar', brand: 'NeatCo', category: 'Home Care & Hygiene',
    rating: 4.6, numReviews: 12,
    description: 'A traditional metal cleaning and shining powder formulated with natural cleaning agents. Restores brilliant shine to copper, brass, bronze, aluminum, and iron vessels.',
    ingredients: 'Citrus peel extracts, tamarind pulp actives, river salt, natural foaming agents, polishing clays.',
    benefits: 'Effectively cuts through oil, grease, tarnish, and oxide layers without leaving scratches. Gentle on hands and completely biodegradable.',
    variants: [{ size: '500ml', price: 250 }],
    images: [imgPeetambar], /* Placeholder img */
  },
  5: {
    _id: '5', name: 'Rose + Papaya Face Wash', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 42,
    description: 'A gentle face wash enriched with rose and papaya bio-enzymes. Deeply cleanses pores while maintaining skin\'s natural moisture balance for a fresh, glowing complexion.',
    ingredients: 'Rose bio-enzyme, papaya bio-enzyme, xanthan gum, natural surfactant, essential oils, glycerin.',
    benefits: 'Deep pore cleansing, Natural glow, Moisture retention, Suitable for all skin types',
    variants: [{ size: '100ml', price: 225 }, { size: '200ml', price: 450 }],
    images: [imgFaceWash],
  },
  6: {
    _id: '6', name: 'Herbal Facepack Powder', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.9, numReviews: 45,
    description: 'A versatile herbal powder made with a blend of traditional ingredients like moong dal, kasturi turmeric, and vetiver for radiant skin.',
    ingredients: 'Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multani mitti.',
    benefits: 'Radiant skin, Deep exfoliation, Natural ingredients',
    variants: [{ size: '100g', price: 175 }],
    images: [imgFacePack],
  },
  7: {
    _id: '7', name: 'Face Cream', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 29,
    description: 'A luxurious daily skin repair formula crafted for deep moisturization, nourishment, and natural glow. Specially formulated for all skin types, particularly dry and sensitive skin.',
    ingredients: 'Shea Butter, Mango Butter, Jojoba Oil, Almond Oil, Vitamin E Oil, Ghee, Kesar (Saffron), and Special Herbs.',
    benefits: 'Deep hydration and skin repair, improves skin elasticity, nourishes and smoothens skin, reduces fine lines, brightens skin tone, and enhances natural glow.',
    variants: [{ size: '50g', price: 220 }],
    images: [imgFaceCream],
  },
  8: {
    _id: '8', name: 'Bees Wax Lip Balm, Beetroot', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 19,
    description: 'A deeply nourishing lip balm made with natural beeswax and beetroot extract to keep your lips soft, hydrated, and naturally pink.',
    ingredients: 'Beeswax, Beetroot extract, Almond oil, Shea butter, Vitamin E.',
    benefits: 'Deeply hydrates lips, Natural tint, Prevents chapping, Gentle formulation',
    variants: [{ size: '20g', price: 230 }],
    images: [imgLipBalm],
  },
  9: {
    _id: '9', name: 'Body Wash', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.9, numReviews: 36,
    description: 'A luxurious body wash infused with raw turmeric and aloe vera for deeply nourishing skin care. The citrus bio-enzyme base ensures a thorough yet gentle cleanse.',
    ingredients: 'Citrus bio-enzyme, raw turmeric, nagarmotha, xanthan gum, natural surfactant, aloe vera gel, glycerin, essential oil.',
    benefits: 'Deep hydration, Anti-inflammatory turmeric, Soothing aloe vera, Natural fragrance',
    variants: [{ size: '200ml', price: 235 }, { size: '500ml', price: 450 }],
    images: [imgBodyWash],
  },
  10: {
    _id: '10', name: 'Bio Enzyme Shampoo', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 33,
    description: 'A herbal shampoo enriched with citrus bio-enzyme, soapnuts, shikakai, and hibiscus flowers for naturally strong, shiny, and healthy hair.',
    ingredients: 'Citrus bio-enzyme, soapnuts, shikakai, dry amla, menthulu, aloe vera, hibiscus flowers, natural surfactants, xanthan gum, fragrance.',
    benefits: 'Supports healthy hair, Natural shine, Gentle cleansing, Free from harsh additives',
    variants: [{ size: '200ml', price: 190 }, { size: '500ml', price: 400 }],
    images: [imgShampoo],
  },
  11: {
    _id: '11', name: 'Chemical-Free Black Henna / Hair Dye', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 22,
    description: 'A natural hair dye made with mehendi, amla, and other herbal ingredients. Provides rich, long-lasting color without the harmful effects of synthetic dyes.',
    ingredients: 'Mehendi, Amla, Reetha, Nagarmotha, Jatamansi, Behda, Turmeric, Coffee, Iron Rust.',
    benefits: 'Free from harsh additives, Nourishes hair, Natural color, Conditions while coloring',
    variants: [{ size: '50g', price: 150 }],
    images: [imgHairDye],
  },
  12: {
    _id: '12', name: 'Hair Oil', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.8, numReviews: 25,
    description: 'A deeply nourishing hair oil formulated with traditional herbs to strengthen roots, reduce hair fall, and promote healthy growth.',
    ingredients: 'Coconut oil, Sesame oil, Amla, Brahmi, Bhringraj, Hibiscus, Fenugreek.',
    benefits: 'Strengthens hair roots, Reduces hair fall, Promotes growth, Deep nourishment',
    variants: [{ size: '100ml', price: 215 }],
    images: [imgHairOil],
  },
  13: {
    _id: '13', name: 'Neem + Citrus Hand Wash', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.6, numReviews: 19,
    description: 'A neem-infused hand wash that combines the antibacterial power of neem with gentle citrus bio-enzymes for clean, soft, and protected hands.',
    ingredients: 'Citrus bio-enzyme, neem bio-enzyme, guar gum, natural surfactant, glycerin, essential oil.',
    benefits: 'Cleansing protection, Soft & moisturized hands, Natural neem benefits, Gentle formula',
    variants: [{ size: '200ml', price: 185 }],
    images: [imgHandWash],
  },
  14: {
    _id: '14', name: 'Vedic Tooth Powder', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 28,
    description: 'An Ayurvedic tooth powder crafted with traditional ingredients like gomaya bhasmam, cloves, and rock salt for complete oral care and strong, healthy teeth.',
    ingredients: 'Gomaya bhasmam, pacha karpuram, cloves, rock salt, vamu, jeera, paniya, mint flower, cold-pressed sesame oil.',
    benefits: 'Supports oral hygiene, Fresh breath, Natural ingredients, Ayurvedic formula',
    variants: [{ size: '50g', price: 170 }],
    images: [imgToothPowder],
  },
  15: {
    _id: '15', name: 'Amruta Dhara', brand: 'Wellness / Traditional', category: 'Wellness / Traditional',
    rating: 4.9, numReviews: 38,
    description: 'A concentrated herbal preparation with mint, camphor, and cow ghee. Provides soothing relief and is a must-have in every household.',
    ingredients: 'Vamu flower, mint flower, pacha karpuram, cow ghee.',
    benefits: 'Soothing relief, Comforting aroma, Traditional formulation, Multi-purpose wellness drop',
    variants: [{ size: '10ml', price: 150 }],
    images: [imgAmrutadhara],
  },
  16: {
    _id: '16', name: 'Dry Fruit Laddu', brand: 'Heart-full Foods', category: 'Heart-full Foods',
    rating: 4.9, numReviews: 54,
    description: 'A wholesome and energy-packed traditional sweet made entirely from premium dry fruits and cow ghee, with no added refined sugar.',
    ingredients: 'Almonds, cashews, pistachios, dates, walnuts, cow ghee.',
    benefits: 'Energy boosting, No refined sugar, Rich in nuts, Wholesome snack',
    variants: [{ size: '250g', price: 325 }, { size: '500g', price: 650 }, { size: '1kg', price: 1300 }],
    images: [imgDryFruit],
  },
  17: {
    _id: '17', name: 'Protein Jawa', brand: 'Heart-full Foods', category: 'Heart-full Foods',
    rating: 4.8, numReviews: 41,
    description: 'A nutritious traditional drink mix packed with protein and vital nutrients to start your day right.',
    ingredients: 'Ragi, whole grains, nuts, cardamom.',
    benefits: 'High in protein, Sustained energy, Traditional recipe, Rich in calcium',
    variants: [{ size: '500g', price: 700 }],
    images: [imgProteinJawa],
  },
  18: {
    _id: '18', name: 'A2 Cow Ghee', brand: 'Heart-full Foods', category: 'Heart-full Foods',
    rating: 5.0, numReviews: 89,
    description: 'Pure, traditional bilona A2 cow ghee. Made from the milk of indigenous cows using the time-honored curd churning method.',
    ingredients: '100% Pure A2 Cow Milk Fat.',
    benefits: 'Rich in Omega-3, Enhances digestion, Traditional bilona method, Supports overall immunity',
    variants: [{ size: '500g', price: 1400 }, { size: '1kg', price: 2700 }],
    images: [imgA2Ghee],
  },
  19: {
    _id: '19', name: 'Bees Wax Lip Balm, Vanilla', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 19,
    description: 'A deeply nourishing lip balm made with natural beeswax and vanilla extract to keep your lips soft, hydrated, and naturally healthy.',
    ingredients: 'Beeswax, Vanilla extract, Almond oil, Shea butter, Vitamin E.',
    benefits: 'Deeply hydrates lips, Gentle aroma, Prevents chapping, Gentle formulation',
    variants: [{ size: '20g', price: 230 }],
    images: [imgLipBalmVanilla],
  },
  20: {
    _id: '20', name: 'Bees Wax Lip Balm, Mixed Fruit', brand: 'TouchCo', category: 'Personal Care',
    rating: 4.7, numReviews: 19,
    description: 'A deeply nourishing lip balm made with natural beeswax and mixed fruit extract to keep your lips soft, hydrated, and naturally healthy.',
    ingredients: 'Beeswax, Mixed fruit extract, Almond oil, Shea butter, Vitamin E.',
    benefits: 'Deeply hydrates lips, Natural fruit flavor, Prevents chapping, Gentle formulation',
    variants: [{ size: '20g', price: 230 }],
    images: [imgLipBalmMixFruit],
  }
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
      <SEO 
        title={product.name} 
        description={product.description} 
        url={`/products/${slug}`}
        image={product.images[0]}
      />
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
              <span className="old-amount" style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.6em', marginRight: '10px' }}>
                ₹{Math.round(selectedVariant.price * 1.1)}
              </span>
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
                <div key={rp._id} className="related-product-card" onClick={() => navigate(`/products/${getSlug(rp.name)}`)}>
                  <img src={rp.images[0]} alt={rp.name} className="related-product-img" />
                  <div className="related-product-brand">{rp.brand}</div>
                  <h4 className="related-product-name">{rp.name}</h4>
                  <div className="related-product-price">
                    <span style={{ textDecoration: 'line-through', color: '#94a3b8', marginRight: '8px', fontSize: '0.85em' }}>
                      ₹{Math.round(rp.variants[0].price * 1.1)}
                    </span>
                    ₹{rp.variants[0].price}
                  </div>
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
