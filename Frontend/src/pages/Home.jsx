import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { Leaf, Sparkles, Beaker, Users, HandHeart, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';
import './Home_Additions.css';
import vegImage from '../assets/490f43d6-cf4a-42b9-aa7b-e3794043f1af.png';
import promoImage from '../assets/two-image.png';

import imgDishWash from '../assets/products/Dish Wash.png';
import imgFaceWash from '../assets/products/face wash.jpeg';
import imgBodyWash from '../assets/products/body-wash.jpg';
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
import imgSarah from '../assets/testmonials/sarah.jpg';
import imgPriya from '../assets/testmonials/priya.jpg';
import imgPrasanth from '../assets/testmonials/prasanth-testmonials.jpg';
import imgElena from '../assets/testmonials/Elena.png';
import imgMichael from '../assets/testmonials/Michael.png';
import imgAmit from '../assets/testmonials/Amit.png';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const testimonials = [
    { text: "The NeatCo dish wash is incredibly gentle on my hands but tough on grease. I love knowing it's safe for my family.", author: "Sarah M.", role: "Verified Buyer", image: imgSarah, rating: 5, type: 'standard' },
    { headline: "I really appreciate!!", text: "TouchCo face wash has completely cleared up my skin. The natural ingredients really make a difference compared to chemical alternatives.", author: "Priya K.", role: "Verified Buyer", image: imgPriya, rating: 5, type: 'highlight' },
    { text: "Puro Nova's commitment to 100% honest, plant-based ingredients is remarkable. Their bio-enzyme cleaners and botanical care products have completely transformed our family's daily wellness routine.", author: "Prasanth", role: "Digital Marketer", image: imgPrasanth, rating: 5, type: 'bigQuote' },
    { text: "I was very impressed! The herbal teas from Heartful Foods are so authentic and refreshing.", author: "Amit R.", role: "Wellness Enthusiast", image: imgAmit, rating: 4, type: 'standard' },
    { headline: "Good Job!", text: "Puro Nova products are a staple in my household now.", author: "Subba Lakshmi D", role: "Verified Buyer", image: imgElena, rating: 5, type: 'topAvatar' },
    { text: "The transparency in the ingredients is unmatched.", author: "Prerana", role: "Verified Buyer", image: imgMichael, rating: 5, type: 'bigQuote' }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://puronova.onrender.com/api/blogs');
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    document.title = 'Puro Nova | Modern Natural Living';
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

  const getSlug = (name) => name.toLowerCase().replace(/ /g, '-').replace(/[&]/g, 'and');

  const popularCategories = [
    { name: 'Home Care & Hygiene', items: '4 Items', img: imgDishWash },
    { name: 'Personal Care', items: '10 Items', img: imgFaceWash },
    { name: 'Wellness / Traditional', items: '1 Item', img: imgPeetambar },
  ];

  const bestSellers = [
    { id: 1, name: 'Dish Wash', brand: 'NeatCo', price: 215, oldPrice: 215, rating: 4.8, sizes: ['500ml', '1L'], img: imgDishWash, desc: 'Ingredients: Citrus bio-enzyme, xanthan gum, natural surfactant, essential oil' },
    { id: 5, name: 'Rose + Papaya Face Wash', brand: 'TouchCo', price: 225, oldPrice: 225, rating: 4.8, sizes: ['100ml', '200ml'], img: imgFaceWash, desc: 'Ingredients: Rose bio-enzyme, papaya bio-enzyme, xanthan gum, natural surfactant, essential oils, glycerin' },
    { id: 9, name: 'Body Wash', brand: 'TouchCo', price: 235, oldPrice: 235, rating: 4.9, sizes: ['200ml'], img: imgBodyWash, desc: 'Ingredients: Citrus bio-enzyme, raw turmeric, nagarmotha, xanthan gum, natural surfactant, aloe vera gel, glycerin, essential oil' },
    { id: 6, name: 'Herbal Facepack Powder', brand: 'TouchCo', price: 175, oldPrice: 175, rating: 4.9, sizes: ['100g'], img: imgFacePack, desc: 'Ingredients: Moong, Chana dal, Masoor dal, Menthi, Rice, Fenugreek, Rose petal, nagarmotha, Kasturi turmeric, Vetiver, Dry orange peel, Neem leaves, Amla powder, Bhavanchalu, Gandhakachuralu, multani mitti' },
  ];

  const handleProductClick = (product) => {
    // We will navigate programmatically or user can use Link
  };

  return (
    <div className="home-page">
      <SEO 
        title="Puro Nova | Modern Natural Living" 
        description="Discover our range of herbal personal care and eco-friendly home care products, crafted from nature for a healthier lifestyle." 
        url="/"
      />
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
              Modern Natural <br />
              Living for <br />
              <span className="text-leaf" style={{ color: 'var(--puro-green-leaf)' }}>Everyday Homes</span>
            </h1>
            <p className="hero-subtitle">
              Discover our range of natural home care, personal care, wellness, <br />
              and traditional foods, crafted for a healthier lifestyle.
            </p>
            <div className="hero-btns">
              <Link to="/shop" className="btn btn-accent">Shop Now ➔</Link>
              <Link to="/philosophy" className="btn btn-secondary">Learn Our Philosophy</Link>
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
                <h3>Home Care & Hygiene</h3>
                <p>NeatCo by Puro Nova</p>
                <Link to="/shop?category=home-care" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src={categoryOneImg} alt="Home Care" className="cat-img floating-element" />
            </div>
            <div className="cat-card reveal delay-1" style={{ background: '#FFF8E7' }}>
              <div className="cat-info">
                <h3>Personal Care</h3>
                <p>TouchCo by Puro Nova</p>
                <Link to="/shop?category=personal-care" className="cat-link">Shop Now ➔</Link>
              </div>
              <img src={categoryThreeImg} alt="Personal Care" className="cat-img floating-element delay-1" />
            </div>
            <div className="cat-card reveal delay-2" style={{ background: '#FDF2F2' }}>
              <div className="cat-info">
                <h3>Wellness</h3>
                <p>Natural & Traditional</p>
                <Link to="/shop?category=wellness" className="cat-link">Shop Now ➔</Link>
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
              <div key={product.id} className={`product-card reveal delay-${i % 3 + 1}`} onClick={() => navigate(`/products/${getSlug(product.name)}`)} style={{ cursor: 'pointer' }}>
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
                      <span className="old-price">₹{Math.round(product.price * 1.1)}</span>
                      <span className="current-price">₹{product.price}</span>
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
              <h2 className="heading-lg" style={{ marginBottom: '15px' }}>Pure & Natural <br /> Wellness Everyday</h2>
              <p className="promo-text" style={{ fontSize: '1.1rem', margin: '0 0 30px 0', opacity: 0.95, lineHeight: '1.6' }}>
                Experience the difference with our 100% plant-based, thoughtfully formulated care products for your family.
              </p>
              <Link to="/shop" className="btn btn-accent">Shop Now</Link>
            </div>
            <div className="promo-visual">
              <img src={promoImage} alt="Promo" />

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
                <p className="brand-desc">Natural home care products for every surface. Effective, plant-based, and free from harsh additives that linger on hands and surfaces.</p>
                <div className="brand-products">
                  <strong>Products:</strong>
                  <ul>
                    <li>Dish Wash</li>
                    <li>Detergent</li>
                    <li>Floor Cleaner</li>
                    <li>Bio Pitambar</li>
                  </ul>
                </div>
                <Link to="/shop?category=home-care" className="explore-link">Explore range →</Link>
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
                    <li>Shampoo</li>
                    <li>Tooth Powder</li>
                  </ul>
                </div>
                <Link to="/shop?category=personal-care" className="explore-link">Explore range →</Link>
              </div>
            </div>
            <div className="brand-card reveal delay-3">
              <div className="brand-img-wrapper" style={{ background: '#FDF2F2' }}>
                <img src={categoryTwoImg} alt="Heart-full Foods" className="brand-img" style={{ objectFit: 'contain', padding: '20px' }} />
              </div>
              <div className="brand-content-wrapper">
                <h3 className="brand-name">Heart-full Foods</h3>
                <p className="brand-desc">Honest food, made the right way. Dry fruit laddus, protein jawa, A2 cow ghee — whole ingredients, nothing hidden.</p>
                <div className="brand-products">
                  <strong>Products:</strong>
                  <ul>
                    <li>Dry Fruit Laddus</li>
                    <li>Protein Jawa</li>
                    <li>A2 Cow Ghee</li>
                  </ul>
                </div>
                <Link to="/shop?category=heartful-foods" className="explore-link">Explore range →</Link>
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
              <p className="home-stat-label">Products across all ranges</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">4</h3>
              <p className="home-stat-label">Brands under one vision</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">100%</h3>
              <p className="home-stat-label">Natural, herbal, or traditional ingredients</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">6+</h3>
              <p className="home-stat-label">Ingredients documented openly</p>
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
      <section className="testimonials-section section-padding reveal" style={{ background: '#F0F2F5', position: 'relative' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '50px' }}>
            <h2 className="heading-lg" style={{ color: 'var(--puro-charcoal)', marginTop: '10px' }}>What Our Customers Say</h2>
          </div>
          <div className="testimonial-masonry">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-masonry-card type-${t.type}`}>
                {t.type === 'bigQuote' && (
                  <>
                    <div className="big-quote-mark">“</div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-author-box">
                      <img src={t.image} alt={t.author} className="author-avatar" />
                      <div className="author-info">
                        <h5 className="testimonial-author">{t.author}</h5>
                        <span className="author-role">{t.role}</span>
                      </div>
                    </div>
                  </>
                )}

                {t.type === 'highlight' && (
                  <>
                    <div className="testimonial-author-box-top">
                      <img src={t.image} alt={t.author} className="author-avatar" />
                      <div className="author-info">
                        <h5 className="testimonial-author">{t.author}</h5>
                        <span className="author-role">{t.role}</span>
                      </div>
                    </div>
                    <div className="stars">{'★'.repeat(t.rating)}</div>
                    {t.headline && <h4 className="testimonial-headline">{t.headline}</h4>}
                    <p className="testimonial-text">{t.text}</p>
                    <div className="quote-icon-bottom">”</div>
                  </>
                )}

                {t.type === 'topAvatar' && (
                  <>
                    <div className="testimonial-author-center">
                      <img src={t.image} alt={t.author} className="author-avatar" />
                      <h5 className="testimonial-author">{t.author}</h5>
                      <span className="author-role">{t.role}</span>
                    </div>
                    <div className="stars text-center">{'★'.repeat(t.rating)}</div>
                    {t.headline && <h4 className="testimonial-headline text-center">{t.headline}</h4>}
                    <p className="testimonial-text text-center">{t.text}</p>
                  </>
                )}

                {t.type === 'standard' && (
                  <>
                    <div className="stars">{'★'.repeat(t.rating)}</div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-author-box">
                      <img src={t.image} alt={t.author} className="author-avatar" />
                      <div className="author-info">
                        <h5 className="testimonial-author">{t.author}</h5>
                        <span className="author-role">{t.role}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Educational Section */}
      <section className="home-learn-section section-padding reveal" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-subtitle">Learn & Discover</span>
              <h2 className="heading-lg" style={{ color: 'var(--puro-charcoal)' }}>The Botanical Journal</h2>
            </div>
            <Link to="/learn" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View all articles <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-learn-grid">
            {loadingBlogs ? (
              <div style={{ padding: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>Loading articles...</div>
            ) : blogs.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>No articles published yet. Check back soon!</div>
            ) : (
              blogs.slice(0, 3).map((article) => (
                <Link key={article._id} to={`/learn/${article.slug || article._id}`} className="home-learn-card">
                  <div className="learn-img-wrapper">
                    <img src={article.image || imgBlog1} alt={article.title} />
                  </div>
                  <div className="learn-card-content">
                    <span className="learn-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <span className="read-link">Read Article &rarr;</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="home-instagram-section reveal">
        <div className="container text-center" style={{ marginBottom: '40px' }}>
          <i className="fa-brands fa-instagram" style={{ fontSize: '32px', color: 'var(--puro-gold)', marginBottom: '15px' }}></i>
          <h2 className="heading-md">Join Our Community</h2>
          <p style={{ color: 'var(--text-light)' }}>Follow <a href="https://www.instagram.com/puronova.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--puro-charcoal)', fontWeight: '600' }}>@puronova.in</a> for wellness tips & updates</p>
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
