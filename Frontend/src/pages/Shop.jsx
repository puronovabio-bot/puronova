import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Shop.css';

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

const products = [
  { id: 1, name: 'Dish Wash Liquid', brand: 'NeatCo', category: 'Home Care', price: 165, oldPrice: 180, sizes: ['500ml', '1000ml'], img: imgDishWash },
  { id: 2, name: 'Detergent', brand: 'NeatCo', category: 'Home Care', price: 135, oldPrice: 150, sizes: ['500ml', '1000ml'], img: imgDetergent },
  { id: 3, name: 'Floor Cleaner', brand: 'NeatCo', category: 'Home Care', price: 140, oldPrice: 160, sizes: ['500ml', '1000ml'], img: imgFloorCleaner },
  { id: 4, name: 'Face Wash', brand: 'TouchCo', category: 'Personal Care', price: 175, oldPrice: 200, sizes: ['100ml', '200ml'], img: imgFaceWash },
  { id: 5, name: 'Body Wash', brand: 'TouchCo', category: 'Personal Care', price: 180, oldPrice: 210, sizes: ['200ml', '500ml'], img: imgBodyWash },
  { id: 6, name: 'Tooth Powder', brand: 'TouchCo', category: 'Personal Care', price: 120, oldPrice: 140, sizes: ['50gms'], img: imgToothPowder },
  { id: 7, name: 'Hand Wash', brand: 'TouchCo', category: 'Personal Care', price: 135, oldPrice: 150, sizes: ['200ml'], img: imgHandWash },
  { id: 8, name: 'Face Pack & Bath Powder', brand: 'TouchCo', category: 'Personal Care', price: 135, oldPrice: 160, sizes: ['100gms', '200gms'], img: imgFacePack },
  { id: 9, name: 'Shampoo', brand: 'TouchCo', category: 'Personal Care', price: 140, oldPrice: 160, sizes: ['200ml', '500ml'], img: imgShampoo },
  { id: 10, name: 'Natural Hair Dye', brand: 'TouchCo', category: 'Personal Care', price: 100, oldPrice: 120, sizes: ['50gms'], img: imgHairDye },
  { id: 11, name: 'Bio Salt Liquid', brand: 'Puro Nova', category: 'Wellness & Herbal', price: 85, oldPrice: 100, sizes: ['200ml'], img: imgPeetambar },
  { id: 12, name: 'AmruthaDhara', brand: 'Puro Nova', category: 'Wellness & Herbal', price: 100, oldPrice: 120, sizes: ['10ml'], img: imgAmrutadhara },
];

const categoryIcons = {
  'All': 'fa-border-all',
  'Home Care': 'fa-house-chimney',
  'Personal Care': 'fa-spa',
  'Wellness & Herbal': 'fa-leaf',
};

const Shop = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam !== null) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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
  }, [activeCategory, searchTerm]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const handleAddToCart = (e, p) => {
    e.stopPropagation();
    addToCart({ _id: p.id, name: p.name, brand: p.brand, images: [p.img] }, p.sizes[0], p.price, 1);
    showToast(`${p.name} added to cart!`, 'cart');
  };

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="shop-page">
      {/* Toast Notification */}
      {toast && (
        <div className={`shop-toast shop-toast--${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'cart' ? 'fa-cart-plus' : toast.type === 'info' ? 'fa-heart-crack' : 'fa-heart'}`}></i>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="shop-banner">
        <div className="container">
          <h1 className="reveal">Premium Organic Shop</h1>
          <p className="shop-banner-sub reveal delay-1">Discover our range of natural, chemical-free products</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar reveal">
            <div className="sidebar-header">
              <i className="fa-solid fa-sliders"></i>
              <h3>Filters</h3>
            </div>

            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="search-clear" onClick={() => setSearchTerm('')}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <div className="filter-section">
              <h4 className="filter-subtitle">
                <i className="fa-solid fa-layer-group"></i>
                Categories
              </h4>
              <div className="filter-list">
                {['All', 'Home Care', 'Personal Care', 'Wellness & Herbal'].map((cat, i) => (
                  <button 
                    key={i} 
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <i className={`fa-solid ${categoryIcons[cat]}`}></i>
                    <span>{cat}</span>
                    <span className="filter-count">
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-info">
              <div className="sidebar-info-card">
                <i className="fa-solid fa-truck-fast"></i>
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders above ₹500</p>
                </div>
              </div>
              <div className="sidebar-info-card">
                <i className="fa-solid fa-shield-halved"></i>
                <div>
                  <strong>100% Natural</strong>
                  <p>Chemical-free products</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="shop-content">
            <div className="shop-controls reveal">
              <p>
                <i className="fa-solid fa-box-open"></i>
                Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
              </p>
              <div className="sort-wrapper">
                <i className="fa-solid fa-arrow-down-short-wide"></i>
                <select>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-results reveal">
                <i className="fa-solid fa-face-sad-tear"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="btn btn-primary" onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}>
                  <i className="fa-solid fa-rotate-left"></i> Reset Filters
                </button>
              </div>
            ) : (
              <div className="shop-grid">
                {filteredProducts.map((p, i) => (
                  <div className={`product-card reveal delay-${(i % 3) + 1}`} key={p.id} onClick={() => handleProductClick(p)} style={{ cursor: 'pointer' }}>
                    <button 
                      className={`wishlist-btn ${wishlist.includes(p.id) ? 'wishlisted' : ''}`}
                      onClick={(e) => toggleWishlist(e, p.id)}
                      title={wishlist.includes(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <i className={`${wishlist.includes(p.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                    </button>
                    {p.oldPrice && (
                      <div className="discount-tag">
                        <i className="fa-solid fa-tag"></i>
                        {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                      </div>
                    )}
                    <div className="product-image-container">
                      <img src={p.img} alt={p.name} />
                      <div className="product-overlay">
                        <button className="quick-view-btn" onClick={(e) => handleQuickView(e, p)} title="Quick View">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="quick-cart-btn" onClick={(e) => handleAddToCart(e, p)} title="Add to Cart">
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <span className="p-cat">{p.brand}</span>
                      <h3 className="p-title">{p.name}</h3>
                      <div className="p-footer">
                        <div className="p-prices">
                          <span className="p-price">₹{p.price}</span>
                          {p.oldPrice && <span className="p-old-price">₹{p.oldPrice}</span>}
                        </div>
                        <button 
                          className="p-add-btn" 
                          onClick={(e) => handleAddToCart(e, p)}
                          title="Add to Cart"
                        >
                          <i className="fa-solid fa-bag-shopping"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
