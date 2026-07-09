import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
import imgHairDye from '../assets/products/hair-dye.jpeg';
import imgPeetambar from '../assets/products/Peetambar.png';
import imgAmrutadhara from '../assets/products/Amrutadhara.png';
import imgA2Ghee from '../assets/products/A2-cow-ghee.jpeg';
import imgProteinJawa from '../assets/products/protein.jpeg';
import imgDryFruit from '../assets/products/dryfruit.jpeg';
import imgLipBalm from '../assets/products/lip-bam.jpeg';
import imgHairOil from '../assets/products/hair-oil.jpeg';
import imgFaceCream from '../assets/products/Moisturizing face cream.png';

const products = [
  { id: 1, name: 'Dish Wash', brand: 'NeatCo', category: 'Home Care & Hygiene', price: 215, sizes: ['500ml', '1L'], img: imgDishWash },
  { id: 2, name: 'Detergent', brand: 'NeatCo', category: 'Home Care & Hygiene', price: 200, sizes: ['500ml', '1L'], img: imgDetergent },
  { id: 3, name: 'Floor Cleaner', brand: 'NeatCo', category: 'Home Care & Hygiene', price: 195, sizes: ['500ml', '1L'], img: imgFloorCleaner },
  { id: 4, name: 'Bio Pitambar', brand: 'NeatCo', category: 'Home Care & Hygiene', price: 250, sizes: ['500ml'], img: imgPeetambar }, /* Placeholder img */
  { id: 5, name: 'Rose + Papaya Face Wash', brand: 'TouchCo', category: 'Personal Care', price: 225, sizes: ['100ml', '200ml'], img: imgFaceWash },
  { id: 6, name: 'Herbal Facepack Powder', brand: 'TouchCo', category: 'Personal Care', price: 175, sizes: ['100g'], img: imgFacePack },
  { id: 7, name: 'Face Cream', brand: 'TouchCo', category: 'Personal Care', price: 220, sizes: ['50g'], img: imgFaceCream },
  { id: 8, name: 'Bees Wax Lip Balm, Beetroot', brand: 'TouchCo', category: 'Personal Care', price: 230, sizes: ['20g'], img: imgLipBalm },
  { id: 9, name: 'Body Wash', brand: 'TouchCo', category: 'Personal Care', price: 235, sizes: ['200ml'], img: imgBodyWash },
  { id: 10, name: 'Bio Enzyme Shampoo', brand: 'TouchCo', category: 'Personal Care', price: 190, sizes: ['200ml', '500ml'], img: imgShampoo },
  { id: 11, name: 'Chemical-Free Black Henna / Hair Dye', brand: 'TouchCo', category: 'Personal Care', price: 150, sizes: ['50g'], img: imgHairDye },
  { id: 12, name: 'Hair Oil', brand: 'TouchCo', category: 'Personal Care', price: 215, sizes: ['100ml'], img: imgHairOil },
  { id: 13, name: 'Neem + Citrus Hand Wash', brand: 'TouchCo', category: 'Personal Care', price: 185, sizes: ['200ml'], img: imgHandWash },
  { id: 14, name: 'Vedic Tooth Powder', brand: 'TouchCo', category: 'Personal Care', price: 170, sizes: ['50g'], img: imgToothPowder },
  { id: 15, name: 'Amruta Dhara', brand: 'Wellness / Traditional', category: 'Wellness / Traditional', price: 150, sizes: ['10ml'], img: imgAmrutadhara },
  { id: 16, name: 'Dry Fruit Laddu', brand: 'Heart-full Foods', category: 'Heart-full Foods', price: 325, sizes: ['250g', '500g', '1kg'], img: imgDryFruit },
  { id: 17, name: 'Protein Jawa', brand: 'Heart-full Foods', category: 'Heart-full Foods', price: 700, sizes: ['500g'], img: imgProteinJawa },
  { id: 18, name: 'A2 Cow Ghee', brand: 'Heart-full Foods', category: 'Heart-full Foods', price: 850, sizes: ['500ml'], img: imgA2Ghee },
];

const categoryIcons = {
  'All': 'fa-border-all',
  'Home Care & Hygiene': 'fa-house-chimney',
  'Personal Care': 'fa-spa',
  'Wellness / Traditional': 'fa-leaf',
  'Heart-full Foods': 'fa-seedling',
};

const catMap = {
  'home-care': 'Home Care & Hygiene',
  'personal-care': 'Personal Care',
  'wellness': 'Wellness / Traditional',
  'heartful-foods': 'Heart-full Foods'
};

const Shop = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shop | Puro Nova';
  }, []);

  useEffect(() => {
    if (category && catMap[category]) {
      setActiveCategory(catMap[category]);
    } else {
      setActiveCategory('All');
    }
  }, [category]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam !== null) {
      setSearchTerm(searchParam);
    } else {
      setSearchTerm('');
    }
  }, [location.search]);

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

    // Fly-to-cart animation
    const imgEl = e.currentTarget.closest('.product-card')?.querySelector('.product-image-container img');
    const cartBtn = document.querySelector('.cart-btn');
    if (imgEl && cartBtn) {
      const imgRect = imgEl.getBoundingClientRect();
      const cartRect = cartBtn.getBoundingClientRect();

      const flyImg = document.createElement('img');
      flyImg.src = p.img;
      flyImg.className = 'fly-to-cart-img';
      flyImg.style.cssText = `
        position: fixed;
        left: ${imgRect.left}px;
        top: ${imgRect.top}px;
        width: ${imgRect.width}px;
        height: ${imgRect.height}px;
        z-index: 9999;
        border-radius: 12px;
        object-fit: cover;
        pointer-events: none;
        transition: all 0.7s cubic-bezier(0.2, 1, 0.3, 1);
      `;
      document.body.appendChild(flyImg);

      // Force reflow then animate
      requestAnimationFrame(() => {
        flyImg.style.left = `${cartRect.left + cartRect.width / 2 - 12}px`;
        flyImg.style.top = `${cartRect.top + cartRect.height / 2 - 12}px`;
        flyImg.style.width = '24px';
        flyImg.style.height = '24px';
        flyImg.style.opacity = '0.4';
        flyImg.style.borderRadius = '50%';
      });

      // Bounce the cart badge
      setTimeout(() => {
        cartBtn.classList.add('cart-bounce');
        setTimeout(() => cartBtn.classList.remove('cart-bounce'), 500);
      }, 600);

      // Remove the flying image
      setTimeout(() => flyImg.remove(), 750);
    }
  };

  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    navigate(`/products/${getSlug(product.name)}`);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product) => {
    navigate(`/products/${getSlug(product.name)}`);
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
          <h1 className="reveal">Shop Natural Everyday Essentials</h1>
          <p className="shop-banner-sub reveal delay-1">Discover our range of natural, plant-based products</p>
        </div>
      </div>

      <div className="container">
        {/* Mobile Top Bar (Search + Categories) */}
        <div className="mobile-top-bar">
          <div className="mobile-search-box">
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
          <div className="mobile-scroll-filters">
            <button className="mobile-chip-btn" onClick={() => setShowMobileFilters(!showMobileFilters)}>
              <i className="fa-solid fa-sliders"></i> Sort & Filter
            </button>
            {['All', 'Home Care & Hygiene', 'Personal Care', 'Wellness / Traditional', 'Heart-full Foods'].map((cat, i) => (
              <button 
                key={i} 
                className={`mobile-chip-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar reveal ${showMobileFilters ? 'show-mobile' : ''}`}>
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
                {['All', 'Home Care & Hygiene', 'Personal Care', 'Wellness / Traditional', 'Heart-full Foods'].map((cat, i) => (
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
                  <p>Free from harsh additives</p>
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
                    {/* Discount tag removed */}
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
