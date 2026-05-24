import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Leaf, Sparkles, Beaker, Users, HandHeart } from 'lucide-react';
import './Home.css';
import vegImage from '../assets/490f43d6-cf4a-42b9-aa7b-e3794043f1af.png';
import promoImage from '../assets/two-image.png';

import imgDishWash from '../assets/products/Dish Wash.png';
import imgFaceWash from '../assets/products/face wash.jpeg';
import imgBodyWash from '../assets/products/Bodywash.png';
import imgFacePack from '../assets/products/Facepack.png';
import imgAmrutadhara from '../assets/products/Amrutadhara.png';
import imgPeetambar from '../assets/products/Peetambar.png';
import categoryOneImg from '../assets/categoryone.png';
import categoryTwoImg from '../assets/categorytwo.png';
import categoryThreeImg from '../assets/categorythree.png';
import imgBlog1 from '../assets/learn_blog_1.png';
import imgBlog2 from '../assets/learn_blog_2.png';
import imgBlog3 from '../assets/learn_blog_3.png';
import imgPhilosophyPrinciples from '../assets/philosophy_principles.png';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
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
    { name: 'Home Care', items: '3 Items', img: imgDishWash },
    { name: 'Personal Care', items: '7 Items', img: imgFaceWash },
    { name: 'Wellness & Herbal', items: '2 Items', img: imgPeetambar },
  ];

  const bestSellers = [
    { id: 1, name: 'Dish Wash Liquid', brand: 'NeatCo', price: 165, oldPrice: 180, rating: 4.8, sizes: ['500ml', '1000ml'], img: imgDishWash, desc: 'Citrus lemon themed design. Ingredients: Citrus bio enzyme, xanthan gum, natural surfactant, essential oil' },
    { id: 4, name: 'Face Wash', brand: 'TouchCo', price: 175, oldPrice: 200, rating: 4.8, sizes: ['100ml', '200ml'], img: imgFaceWash, desc: 'Rose+papaya themed design. Ingredients: Rose bio enzyme, papaya bio enzyme, xanthan gum, natural surfactant, essential oils, glycerin' },
    { id: 5, name: 'Body Wash', brand: 'TouchCo', price: 180, oldPrice: 210, rating: 4.9, sizes: ['200ml', '500ml'], img: imgBodyWash, desc: 'Raw turmeric, aloevera themed design. Ingredients: Citrus bio enzyme, raw turmeric, nagarmotha, xathan gum, natural surfactant, aloe vera gel, glycerin, essential oil' },
    { id: 8, name: 'Face Pack & Bath Powder', brand: 'TouchCo', price: 135, oldPrice: 160, rating: 4.9, sizes: ['100gms', '200gms'], img: imgFacePack, desc: 'Herbal theme. Ingredients: Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multanimatti' },
  ];

  const handleProductClick = (product) => {
    // We will navigate programmatically or user can use Link
  };

  return (
    <div className="home-page">
      {/* Toast Notification */}
      {toast && (
        <div className={`shop-toast shop-toast--${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'cart' ? 'fa-cart-plus' : toast.type === 'info' ? 'fa-heart-crack' : 'fa-heart'}`}></i>
          <span>{toast.message}</span>
        </div>
      )}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>

        {/* Cinematic Animated Leaves Effect */}
        <div className="cinematic-leaves-container">
          {/* Blurred foreground leaves */}
          <div className="cinematic-leaf leaf-fg" style={{ left: '5%', animationDelay: '0s', animationDuration: '12s' }}>🍃</div>
          <div className="cinematic-leaf leaf-fg" style={{ left: '85%', animationDelay: '4s', animationDuration: '15s', fontSize: '100px' }}>🌿</div>
          <div className="cinematic-leaf leaf-fg" style={{ left: '40%', animationDelay: '7s', animationDuration: '14s' }}>🍃</div>

          {/* Falling background leaves */}
          <div className="cinematic-leaf leaf-bg" style={{ left: '20%', animationDelay: '1s' }}>🌿</div>
          <div className="cinematic-leaf leaf-bg" style={{ left: '60%', animationDelay: '3s', animationDuration: '18s' }}>🍃</div>
          <div className="cinematic-leaf leaf-bg" style={{ left: '75%', animationDelay: '6s', animationDuration: '22s' }}>🌿</div>
          <div className="cinematic-leaf leaf-bg" style={{ left: '30%', animationDelay: '9s' }}>🍃</div>
          <div className="cinematic-leaf leaf-bg" style={{ left: '90%', animationDelay: '2s' }}>🌿</div>

          {/* Tiny floating petals & particles */}
          <div className="cinematic-leaf particle" style={{ left: '15%', bottom: '20%', animationDelay: '0s' }}>🌸</div>
          <div className="cinematic-leaf particle" style={{ left: '50%', bottom: '40%', animationDelay: '2s' }}>✨</div>
          <div className="cinematic-leaf particle" style={{ left: '70%', bottom: '10%', animationDelay: '4s' }}>🌸</div>
          <div className="cinematic-leaf particle" style={{ left: '85%', bottom: '30%', animationDelay: '1s' }}>✨</div>
          <div className="cinematic-leaf particle" style={{ left: '35%', bottom: '15%', animationDelay: '5s' }}>🌸</div>

          {/* Resting leaves on marble */}
          <div className="cinematic-leaf leaf-resting" style={{ left: '25%', bottom: '5%', transform: 'rotate(-15deg)' }}>🍃</div>
          <div className="cinematic-leaf leaf-resting" style={{ left: '65%', bottom: '8%', transform: 'rotate(45deg)' }}>🌿</div>
          <div className="cinematic-leaf leaf-resting" style={{ left: '80%', bottom: '2%', transform: 'rotate(70deg)' }}>🍃</div>
        </div>

        <div className="container hero-container">
          <div className="hero-content reveal">
            <h1 className="hero-title">
              Pure Living <br />
              Starts with <br />
              <span className="text-leaf">Natural Care</span>
            </h1>
            <p className="hero-subtitle">
              Discover our range of herbal personal care and eco-friendly <br />
              home care products, crafted from nature for a healthier lifestyle.
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
          <div className="section-header reveal">
            <span className="section-subtitle">Discover</span>
            <h2 className="heading-lg">Our Categories</h2>
          </div>
          <div className="category-grid">
            <div className="cat-card reveal" style={{ background: '#F0F7F0' }}>
              <div className="cat-info">
                <h3>Home Care</h3>
                <p>NeatCo by Puro Nova</p>
                <Link to="/shop" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src={categoryOneImg} alt="Home Care" className="cat-img floating-element" />
            </div>
            <div className="cat-card reveal delay-1" style={{ background: '#FFF8E7' }}>
              <div className="cat-info">
                <h3>Personal Care</h3>
                <p>TouchCo by Puro Nova</p>
                <Link to="/shop" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src={categoryThreeImg} alt="Personal Care" className="cat-img floating-element delay-1" />
            </div>
            <div className="cat-card reveal delay-2" style={{ background: '#FDF2F2' }}>
              <div className="cat-info">
                <h3>Wellness</h3>
                <p>Natural & Herbal</p>
                <Link to="/shop" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src={categoryTwoImg} alt="Wellness" className="cat-img floating-element delay-2" />
            </div>
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
                <button 
                  className={`wishlist-btn ${wishlist.includes(product.id) ? 'wishlisted' : ''}`}
                  onClick={(e) => toggleWishlist(e, product.id)}
                  title={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <i className={`${wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                </button>
                <div className="product-image-container">
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="product-info">
                  <span className="p-cat" style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.brand}</span>
                  <h4 className="product-name" style={{ marginTop: '4px' }}>{product.name}</h4>

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
                        navigate('/cart');
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

      {/* Our Brands Section */}
      <section className="brands-section section-padding">
        <div className="container">
          <div className="section-header reveal text-center">
            <span className="section-subtitle">Our Brands</span>
            <h2 className="heading-lg">One vision, three distinct families</h2>
            <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto', marginTop: '10px', color: 'var(--text-light)', lineHeight: '1.6' }}>
              Every brand in the Puro Nova family has a distinct purpose — but all share the same core commitment to honest ingredients and thoughtful formulation.
            </p>
          </div>
          <div className="brands-grid">
            <div className="brand-card reveal delay-1">
              <div className="brand-img-wrapper" style={{ background: '#F0F7F0' }}>
                <img src={categoryOneImg} alt="NeatCo Products" className="brand-img" style={{ objectFit: 'contain', padding: '20px' }} />
              </div>
              <div className="brand-content-wrapper">
                <h3 className="brand-name">NeatCo</h3>
                <p className="brand-desc">Bio-enzyme powered cleaners for every surface. Effective, plant-based, and free from harsh additives that linger on hands and surfaces.</p>
                <div className="brand-products">
                  <strong>Products:</strong>
                  <ul>
                    <li>Dish Wash</li>
                    <li>Detergent</li>
                    <li>Floor Cleaner</li>
                    <li>Toilet Cleaner</li>
                  </ul>
                </div>
                <Link to="/shop" className="explore-link">Explore range →</Link>
              </div>
            </div>
            <div className="brand-card reveal delay-2">
              <div className="brand-img-wrapper" style={{ background: '#FFF8E7' }}>
                <img src={categoryThreeImg} alt="TouchCo Products" className="brand-img" style={{ objectFit: 'contain', padding: '20px' }} />
              </div>
              <div className="brand-content-wrapper">
                <h3 className="brand-name">TouchCo</h3>
                <p className="brand-desc">Botanical personal care rooted in tradition. Formulated for gentle daily use — for you and everyone in your family.</p>
                <div className="brand-products">
                  <strong>Products:</strong>
                  <ul>
                    <li>Face Wash</li>
                    <li>Body Wash</li>
                    <li>Hand Wash</li>
                    <li>Tooth Powder</li>
                  </ul>
                </div>
                <Link to="/shop" className="explore-link">Explore range →</Link>
              </div>
            </div>
            <div className="brand-card reveal delay-3">
              <div className="brand-img-wrapper" style={{ background: '#FDF2F2' }}>
                <img src={categoryTwoImg} alt="Heartful Foods" className="brand-img" style={{ objectFit: 'contain', padding: '20px' }} />
              </div>
              <div className="brand-content-wrapper">
                <h3 className="brand-name">Heartful Foods</h3>
                <p className="brand-desc">Honest food, made the right way. Dry fruit laddus, herbal teas, organic jaggery — whole ingredients, nothing hidden.</p>
                <div className="brand-products">
                  <strong>Products:</strong>
                  <ul>
                    <li>Dry Fruit Laddus</li>
                    <li>Herbal Tea</li>
                    <li>Organic Jaggery</li>
                    <li>Papads</li>
                  </ul>
                </div>
                <Link to="/shop" className="explore-link">Explore range →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section reveal">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">15+</h3>
              <p className="stat-label">Products across all ranges</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">4</h3>
              <p className="stat-label">Brands under one vision</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Plant-based active ingredients</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">6+</h3>
              <p className="stat-label">Ingredients documented openly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Puro Nova Section */}
      <section className="why-us-section section-padding">
        <div className="container">
          <div className="section-header reveal text-center">
            <span className="section-subtitle">Why Puro Nova</span>
            <h2 className="heading-lg">Five principles that guide everything we make</h2>
          </div>
          <div className="why-us-split">
            <div className="why-us-image-wrapper reveal">
              <img src={imgPhilosophyPrinciples} alt="Our Principles" className="why-us-img" />
              <div className="why-us-floating-card floating-element">
                <span className="floating-icon">✨</span>
                <strong>100% Honest</strong>
              </div>
            </div>
            <div className="why-us-content">
              <div className="principle-list-item reveal delay-1">
                <div className="principle-list-icon"><Leaf size={24} color="var(--puro-green-leaf)" /></div>
                <div className="principle-list-text">
                  <h4 className="principle-list-title">Plant-based Formulations</h4>
                  <p className="principle-list-desc">Every active ingredient originates from botanical sources — with long safety histories and proven harmony with biological systems.</p>
                </div>
              </div>
              <div className="principle-list-item reveal delay-2">
                <div className="principle-list-icon"><Sparkles size={24} color="var(--puro-gold)" /></div>
                <div className="principle-list-text">
                  <h4 className="principle-list-title">Bio-enzyme Powered</h4>
                  <p className="principle-list-desc">Fermented bio-enzymes are nature’s own catalysts. They work effectively without the aggression of synthetic alternatives.</p>
                </div>
              </div>
              <div className="principle-list-item reveal delay-3">
                <div className="principle-list-icon"><Beaker size={24} color="var(--puro-green-forest)" /></div>
                <div className="principle-list-text">
                  <h4 className="principle-list-title">Thoughtfully Formulated</h4>
                  <p className="principle-list-desc">Every component has a purpose we can explain in plain language. No ingredients added for marketing value.</p>
                </div>
              </div>
              <div className="principle-list-item reveal delay-4">
                <div className="principle-list-icon"><Users size={24} color="var(--puro-green-leaf)" /></div>
                <div className="principle-list-text">
                  <h4 className="principle-list-title">Family-conscious</h4>
                  <p className="principle-list-desc">Formulated for homes with children, elderly members, and sensitive skin. Not as an afterthought — as a core design constraint.</p>
                </div>
              </div>
              <div className="principle-list-item reveal delay-5">
                <div className="principle-list-icon"><HandHeart size={24} color="var(--puro-gold)" /></div>
                <div className="principle-list-text">
                  <h4 className="principle-list-title">Small-batch Quality</h4>
                  <p className="principle-list-desc">Slower, softer, and worth it. Small batches mean fresher products and a human scale of care.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding reveal" style={{ background: '#F9F7F2', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="heading-lg">What Our Customers Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon-large">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"The NeatCo dish wash is incredibly gentle on my hands but tough on grease. I love knowing it's safe for my family."</p>
              <div className="testimonial-author-box">
                <div className="author-avatar" style={{ background: 'var(--puro-green-leaf)' }}>S</div>
                <div className="author-info">
                  <h5 className="testimonial-author">Sarah M.</h5>
                  <span className="author-role">Verified Buyer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon-large">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"TouchCo face wash has completely cleared up my skin. The natural ingredients really make a difference compared to chemical alternatives."</p>
              <div className="testimonial-author-box">
                <div className="author-avatar" style={{ background: 'var(--puro-gold)' }}>P</div>
                <div className="author-info">
                  <h5 className="testimonial-author">Priya K.</h5>
                  <span className="author-role">Verified Buyer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon-large">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"Absolutely love the Heartful Foods laddus! They are the perfect healthy snack for my kids without any refined sugar."</p>
              <div className="testimonial-author-box">
                <div className="author-avatar" style={{ background: 'var(--puro-green-forest)' }}>A</div>
                <div className="author-info">
                  <h5 className="testimonial-author">Anjali R.</h5>
                  <span className="author-role">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blog-section section-padding reveal">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Learn</span>
            <h2 className="heading-lg">Latest from our Blog</h2>
          </div>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-img-wrapper">
                <img src={imgBlog1} alt="Blog 1" className="blog-img" />
              </div>
              <div className="blog-content">
                <span className="blog-date">May 15, 2026</span>
                <h4 className="blog-title">The Power of Bio-enzymes in Cleaning</h4>
                <Link to="/learn" className="blog-link">Read More →</Link>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-img-wrapper">
                <img src={imgBlog2} alt="Blog 2" className="blog-img" />
              </div>
              <div className="blog-content">
                <span className="blog-date">May 10, 2026</span>
                <h4 className="blog-title">Why Plant-Based Ingredients Matter</h4>
                <Link to="/learn" className="blog-link">Read More →</Link>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-img-wrapper">
                <img src={imgBlog3} alt="Blog 3" className="blog-img" />
              </div>
              <div className="blog-content">
                <span className="blog-date">May 05, 2026</span>
                <h4 className="blog-title">A Guide to Toxin-Free Living</h4>
                <Link to="/learn" className="blog-link">Read More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section section-padding reveal" style={{ background: 'var(--puro-green-forest)', color: 'white' }}>
        <div className="container newsletter-container text-center">
          <h2 className="heading-md" style={{ color: 'white', margin: '0 0 15px 0' }}>Join the Puro Nova Family</h2>
          <p style={{ margin: '0 0 30px 0', opacity: '0.9', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Subscribe to our newsletter for exclusive offers, wellness tips, and early access to new products.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required className="newsletter-input" />
            <button type="submit" className="btn btn-accent newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
