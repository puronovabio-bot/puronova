import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Shop.css';

const products = [
  { id: 1, name: 'Dish Wash Liquid', brand: 'NeatCo', category: 'Home Care', rating: 4.8, price: 165, oldPrice: 180, sizes: ['500ml', '1000ml'], img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Citrus lemon themed design. Ingredients: Citrus bio enzyme, xanthan gum, natural surfactant, essential oil' },
  { id: 2, name: 'Detergent', brand: 'NeatCo', category: 'Home Care', rating: 4.7, price: 135, oldPrice: 150, sizes: ['500ml', '1000ml'], img: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Citrus lemon themed design. Ingredients: Citrus bio enzyme, xanthan gum & guar gum, natural surfactant, essential oil' },
  { id: 3, name: 'Floor Cleaner', brand: 'NeatCo', category: 'Home Care', rating: 4.9, price: 140, oldPrice: 160, sizes: ['500ml', '1000ml'], img: 'https://images.unsplash.com/photo-1585833758064-9cb696662705?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Neem + lemon themed design. Ingredients: Pomegranate & citrus bioenzyme, xanthan gum, Coconut based surfactant, Fragrance oils' },
  { id: 4, name: 'Face Wash', brand: 'TouchCo', category: 'Personal Care', rating: 4.8, price: 175, oldPrice: 200, sizes: ['100ml', '200ml'], img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Rose+papaya themed design. Ingredients: Rose bio enzyme, papaya bio enzyme, xanthan gum, natural surfactant, essential oils, glycerin' },
  { id: 5, name: 'Body Wash', brand: 'TouchCo', category: 'Personal Care', rating: 4.9, price: 180, oldPrice: 210, sizes: ['200ml', '500ml'], img: 'https://images.unsplash.com/photo-1608248593842-8021c640e70b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Raw turmeric, aloevera themed design. Ingredients: Citrus bio enzyme, raw turmeric, nagarmotha, xathan gum, natural surfactant, aloe vera gel, glycerin, essential oil' },
  { id: 6, name: 'Tooth Powder', brand: 'TouchCo', category: 'Personal Care', rating: 4.7, price: 120, oldPrice: 140, sizes: ['50gms'], img: 'https://images.unsplash.com/photo-1607341883307-e85df6a50654?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Cloves, salt, Mint theme. Ingredients: Gomaya bhasmam, pacha karpuram, cloves, rock salt, vamu, jeera, paniya, mint flower, cold pressed sesame oil' },
  { id: 7, name: 'Hand Wash', brand: 'TouchCo', category: 'Personal Care', rating: 4.6, price: 135, oldPrice: 150, sizes: ['200ml'], img: 'https://images.unsplash.com/photo-1584824388143-6c8430e37bc6?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Neem theme. Ingredients: Citrus bio enzyme, neem bio enzyme, guar gum, natural surfactant, glycerin, essential oil' },
  { id: 8, name: 'Face Pack & Bath Powder', brand: 'TouchCo', category: 'Personal Care', rating: 4.9, price: 135, oldPrice: 160, sizes: ['100gms', '200gms'], img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Herbal theme. Ingredients: Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multanimatti' },
  { id: 9, name: 'Shampoo', brand: 'TouchCo', category: 'Personal Care', rating: 4.8, price: 140, oldPrice: 160, sizes: ['200ml', '500ml'], img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Herbal theme. Ingredients: Citus bioenzyme, soapnuts, shikakai, dry amla, menthulu, aloevera, Hibiscus flowers, natural surfactants, xanthan gum, fragrance' },
  { id: 10, name: 'Natural Hair Dye', brand: 'TouchCo', category: 'Personal Care', rating: 4.7, price: 100, oldPrice: 120, sizes: ['50gms'], img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Herbal theme. Ingredients: Mahendi, Amla, Reetha, Nagamotha, Jatamasi, Behda, Turmeric, Coffee, Iron Rust' },
  { id: 11, name: 'Bio Salt Liquid', brand: 'Puro Nova', category: 'Wellness & Herbal', rating: 4.8, price: 85, oldPrice: 100, sizes: ['200ml'], img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Wellness theme. Ingredients: Rice starch & river salt' },
  { id: 12, name: 'AmruthaDhara', brand: 'Puro Nova', category: 'Wellness & Herbal', rating: 4.9, price: 100, oldPrice: 120, sizes: ['10ml'], img: 'https://images.unsplash.com/photo-1608248593842-8021c640e70b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Mint, camphor theme. Ingredients: Vamu flower, mint flower, pacha karpuram, cow ghee' },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="shop-page">
      <div className="shop-banner">
        <div className="container">
          <h1 className="reveal">Premium Organic Shop</h1>
          <div className="breadcrumb reveal delay-1">Home / Shop</div>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar reveal">
            <div className="search-box">
              <input type="text" placeholder="Search products..." />
              <span>🔍</span>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">⚙️ Filters</h3>
            </div>

            <div className="filter-section">
              <h4 className="filter-subtitle">Categories</h4>
              <div className="filter-list">
                {['All', 'Home Care', 'Personal Care', 'Wellness & Herbal'].map((cat, i) => (
                  <button 
                    key={i} 
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-subtitle">Price Range</h4>
              <div className="price-slider">
                <input type="range" min="0" max="500" />
                <div className="price-labels">
                  <span>₹0</span>
                  <span>₹500</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-subtitle">Ratings</h4>
              {[5, 4, 3].map(rating => (
                <div key={rating} className="rating-filter">
                  <div className="checkbox"></div>
                  <div className="stars">
                    {"★".repeat(rating)}{"☆".repeat(5-rating)}
                  </div>
                  <span>& Up</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="shop-content">
            <div className="shop-controls reveal">
              <p>Showing 1–{filteredProducts.length} of {products.length} results</p>
              <div className="sort-wrapper">
                <span>Sort by:</span>
                <select>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>

            <div className="shop-grid">
              {filteredProducts.map((p, i) => (
                <div className={`product-card reveal delay-${(i % 3) + 1}`} key={p.id} onClick={() => handleProductClick(p)} style={{ cursor: 'pointer' }}>
                  <button className="wishlist-btn">❤</button>
                  <div className="product-image-container">
                    <img src={p.img} alt={p.name} />
                    <div className="product-overlay">
                      <button className="quick-view">👁</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="p-cat">{p.brand}</span>
                    <h3 className="p-title">{p.name}</h3>
                    <div className="p-rating">
                      <span>⭐ ({p.rating})</span>
                    </div>
                    <div className="p-footer">
                      <div className="p-prices">
                        <span className="p-price">₹{p.price}</span>
                        {p.oldPrice && <span className="p-old-price">₹{p.oldPrice}</span>}
                      </div>
                      <button 
                        className="p-add-btn" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          addToCart({ _id: p.id, name: p.name, brand: p.brand, images: [p.img] }, p.sizes[0], p.price, 1); 
                        }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination reveal">
              <button className="page-nav">◀</button>
              <button className="page-num active">1</button>
              <button className="page-num">2</button>
              <button className="page-num">3</button>
              <button className="page-nav">▶</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;

