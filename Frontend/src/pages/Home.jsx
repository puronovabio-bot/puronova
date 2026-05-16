import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Home.css';
import vegImage from '../assets/490f43d6-cf4a-42b9-aa7b-e3794043f1af.png';
import promoImage from '../assets/two-image.png';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const popularCategories = [
    { name: 'Home Care', items: '3 Items', img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=200&h=200&auto=format&fit=crop' },
    { name: 'Personal Care', items: '7 Items', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&h=200&auto=format&fit=crop' },
    { name: 'Wellness & Herbal', items: '2 Items', img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=200&h=200&auto=format&fit=crop' },
  ];

  const bestSellers = [
    { id: 1, name: 'Dish Wash Liquid', brand: 'NeatCo', price: 165, oldPrice: 180, rating: 4.8, sizes: ['500ml', '1000ml'], img: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Citrus lemon themed design. Ingredients: Citrus bio enzyme, xanthan gum, natural surfactant, essential oil' },
    { id: 4, name: 'Face Wash', brand: 'TouchCo', price: 175, oldPrice: 200, rating: 4.8, sizes: ['100ml', '200ml'], img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Rose+papaya themed design. Ingredients: Rose bio enzyme, papaya bio enzyme, xanthan gum, natural surfactant, essential oils, glycerin' },
    { id: 5, name: 'Body Wash', brand: 'TouchCo', price: 180, oldPrice: 210, rating: 4.9, sizes: ['200ml', '500ml'], img: 'https://images.unsplash.com/photo-1608248593842-8021c640e70b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Raw turmeric, aloevera themed design. Ingredients: Citrus bio enzyme, raw turmeric, nagarmotha, xathan gum, natural surfactant, aloe vera gel, glycerin, essential oil' },
    { id: 8, name: 'Face Pack & Bath Powder', brand: 'TouchCo', price: 135, oldPrice: 160, rating: 4.9, sizes: ['100gms', '200gms'], img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Herbal theme. Ingredients: Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multanimatti' },
    { id: 12, name: 'AmruthaDhara', brand: 'Puro Nova', price: 100, oldPrice: 120, rating: 4.9, sizes: ['10ml'], img: 'https://images.unsplash.com/photo-1608248593842-8021c640e70b?q=80&w=300&h=300&auto=format&fit=crop', desc: 'Mint, camphor theme. Ingredients: Vamu flower, mint flower, pacha karpuram, cow ghee' },
  ];

  const handleProductClick = (product) => {
    // We will navigate programmatically or user can use Link
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content reveal">
            <h1 className="hero-title">
              A Healthy <br />
              Life Starts <br />
              <span className="text-leaf">with Fresh Food</span>
            </h1>
            <p className="hero-subtitle">
              Discover farm-fresh fruits and vegetables, handpicked<br />
              for quality and delivered straight to your door.
            </p>
            <div className="hero-btns">
              <Link to="/shop" className="btn btn-accent">Shop Now ➔</Link>
              <Link to="/categories" className="btn btn-secondary">Explore Categories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="category-cards-section section-padding">
        <div className="container">
          <div className="category-grid">
            <div className="cat-card reveal" style={{ background: '#F0F7F0' }}>
              <div className="cat-info">
                <h3>Home Care</h3>
                <p>NeatCo by Puro Nova</p>
                <Link to="/shop" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=300&auto=format&fit=crop" alt="Home Care" className="cat-img" style={{ width: '180px', height: 'auto', borderRadius: '8px', filter: 'none' }} />
            </div>
            <div className="cat-card reveal delay-1" style={{ background: '#FFF8E7' }}>
              <div className="cat-info">
                <h3>Personal Care</h3>
                <p>TouchCo by Puro Nova</p>
                <Link to="/shop" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&auto=format&fit=crop" alt="Personal Care" className="cat-img" />
            </div>
            <div className="cat-card reveal delay-2" style={{ background: '#FDF2F2' }}>
              <div className="cat-info">
                <h3>Wellness</h3>
                <p>Natural & Herbal</p>
                <Link to="/shop" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=300&auto=format&fit=crop" alt="Wellness" className="cat-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="popular-categories section-padding">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-subtitle">Categories</span>
            <h2 className="heading-md">Popular Categories</h2>
          </div>
          <div className="pop-cat-grid">
            {popularCategories.map((cat, i) => (
              <div key={i} className={`pop-cat-item reveal delay-${i + 1}`}>
                <div className="pop-cat-img-wrapper">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <h4>{cat.name}</h4>
                <p>{cat.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="best-selling-section section-padding" style={{ background: '#F9F7F2' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-subtitle">Products</span>
            <h2 className="heading-md">Best Selling Products</h2>
          </div>
          <div className="product-grid">
            {bestSellers.map((product, i) => (
              <div key={product.id} className={`product-card reveal delay-${i % 3 + 1}`} onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
                <div className="product-badge">-10%</div>
                <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>❤</button>
                <div className="product-image-container">
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="product-info">
                  <span className="p-cat" style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.brand}</span>
                  <h4 className="product-name" style={{ marginTop: '4px' }}>{product.name}</h4>
                  <div className="product-rating">
                    <span>⭐ ({product.rating})</span>
                  </div>
                  <div className="product-price-row">
                    <div className="prices">
                      <span className="current-price">₹{product.price}</span>
                      <span className="old-price">₹{product.oldPrice}</span>
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ _id: product.id, name: product.name, brand: product.brand, images: [product.img] }, product.sizes[0], product.price, 1);
                      }}
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner-section section-padding">
        <div className="container">
          <div className="promo-banner reveal">
            <div className="promo-content">
              <span className="promo-tag">Special Offer</span>
              <h2 className="heading-lg">Get 25% Off <br /> on Your First Order!</h2>
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>
            <div className="promo-visual">
              <img src={promoImage} alt="Promo" />
              <div className="discount-circle">25% <br /> OFF</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
