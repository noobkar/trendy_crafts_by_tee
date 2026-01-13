import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { trackSearch } from '../services/analyticsService';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  /* Search Logic */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      navigate(`/shop?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
      trackSearch(query);
    } else {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  return (
    <>
      <nav
        className="main-navbar"
        style={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 1000,
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <div className="nav-container" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isScrolled ? '0.75rem 1.5rem' : '1rem 1.5rem',
          transition: 'padding 0.3s ease'
        }}>
          {/* Logo */}
          <Link to="/" className="nav-logo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1001,
            textDecoration: 'none'
          }}>
            <img src={logo} alt="Trendy Crafts" className="logo-img" style={{ height: '45px', width: 'auto' }} />
            <span className="brand-name" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              fontStyle: 'italic',
              letterSpacing: '0.5px'
            }}>
              Trendy Crafts by Tee
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="nav-links-desktop" style={{
            display: 'flex',
            gap: '2.5rem',
          }}>
            {['Home', 'Shop', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                style={{
                  fontWeight: 500,
                  fontSize: '1rem',
                  position: 'relative',
                  color: 'var(--color-text-main)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1001 }}>
            {/* Search Bar - Desktop Only */}
            <div className="search-desktop" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: isSearchOpen ? '180px' : '0',
                opacity: isSearchOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                marginRight: isSearchOpen ? '8px' : '0'
              }}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '1px solid #e0e0e0',
                    outline: 'none',
                    fontSize: '0.9rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <button
                aria-label="Search"
                onClick={handleSearchSubmit}
                style={{
                  transition: 'transform 0.2s',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Search size={20} color="var(--color-text-main)" />
              </button>
            </div>

            {/* Cart */}
            <div style={{ position: 'relative' }}>
              <button
                aria-label="Cart"
                onClick={() => setIsCartOpen(true)}
                style={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBag size={20} color="var(--color-text-main)" />
              </button>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'var(--color-primary)',
                  color: 'white',
                  fontSize: '0.65rem',
                  height: '16px',
                  width: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>{cartCount}</span>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                padding: '8px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          paddingTop: '80px'
        }}
      >
        {['Home', 'Shop', 'About', 'Contact'].map((item, index) => (
          <Link
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontWeight: 500,
              fontSize: '1.75rem',
              color: 'var(--color-text-main)',
              textDecoration: 'none',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`
            }}
          >
            {item}
          </Link>
        ))}
      </div>

      <CartDrawer />

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .search-desktop {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .nav-container {
            padding: 0.75rem 1rem !important;
          }
          .logo-img {
            height: 35px !important;
          }
          .brand-name {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .nav-container {
            padding: 0.5rem 0.75rem !important;
          }
          .logo-img {
            height: 30px !important;
          }
          .brand-name {
            font-size: 0.85rem !important;
            max-width: 140px;
            line-height: 1.2;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

