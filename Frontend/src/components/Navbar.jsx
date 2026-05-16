import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories', hasDropdown: true },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

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
              <div className="logo-circle" aria-hidden="true">
                <i className="fa-solid fa-leaf fa-icon" />
              </div>
              <div className="brand-text">
                <span className="brand-name">PURO NOVA</span>
                <span className="brand-tagline">ORGANIC & FRESH</span>
              </div>
            </Link>

            <nav className="nav-menu" aria-label="Primary navigation">
              {navLinks.map((item) => (
                <div key={item.label} className="nav-item-wrapper">
                  <Link to={item.path} className="nav-item">
                    {item.label}
                    {item.hasDropdown && <i className="fa-solid fa-chevron-down nav-caret" aria-hidden="true" />}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="header-right">
              <button type="button" className="icon-btn" aria-label="Search">
                <i className="fa-solid fa-magnifying-glass fa-icon" aria-hidden="true" />
              </button>
              <button type="button" className="icon-btn" aria-label="Wishlist">
                <i className="fa-solid fa-heart fa-icon" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label="Account"
                onClick={() => navigate('/login')}
              >
                <i className="fa-solid fa-user fa-icon" aria-hidden="true" />
              </button>
              <button type="button" className="cart-btn" aria-label="Shopping cart" onClick={() => navigate('/cart')}>
                <i className="fa-solid fa-basket-shopping fa-icon" aria-hidden="true" />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </button>
              <button
                type="button"
                className="mobile-menu-btn"
                aria-label="Toggle menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} fa-icon`} aria-hidden="true" />
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
