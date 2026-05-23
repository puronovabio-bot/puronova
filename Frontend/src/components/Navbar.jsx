import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, Leaf } from 'lucide-react';
import './Navbar.css';
import originalLogo from '../assets/logoo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Philosophy', path: '/philosophy' },
    { label: 'About', path: '/about' },
    { label: 'Learn', path: '/learn' },
    { label: 'Ingredients', path: '/ingredients' },
    { label: 'Contact', path: '/contact' }
  ];

  if (user && user.role === 'admin') {
    navLinks.push({ label: 'Admin Panel', path: '/admin' });
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-shell">
          <div className="navbar-pill glass-nav">
            <Link to="/" className="brand-logo">
              <img src={originalLogo} alt="Puro Nova" className="navbar-logo-img" />
            </Link>

            <nav className="nav-menu" aria-label="Primary navigation">
              {navLinks.map((item) => (
                <div key={item.label} className="nav-item-wrapper">
                  <Link to={item.path} className="nav-item">
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="nav-caret" size={14} strokeWidth={1.5} />}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="header-right">
              {isSearchOpen && (
                <form className="nav-search-form" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </form>
              )}
              <button 
                type="button" 
                className="icon-btn" 
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X size={22} strokeWidth={1.5} /> : <Search size={22} strokeWidth={1.5} />}
              </button>
              <button type="button" className="icon-btn" aria-label="Wishlist" onClick={() => navigate('/wishlist')}>
                <Heart size={22} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label="Account"
                onClick={() => navigate(user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login')}
              >
                <User size={22} strokeWidth={1.5} />
              </button>
              <button type="button" className="cart-btn" aria-label="Shopping cart" onClick={() => navigate('/cart')}>
                <ShoppingBag size={20} strokeWidth={2} />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </button>
              <button
                type="button"
                className="mobile-menu-btn"
                aria-label="Toggle menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            {navLinks.map((item) => (
              <Link
                to={item.path}
                key={item.label}
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
