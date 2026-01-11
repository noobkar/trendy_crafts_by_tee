import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

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

  // Check if we are on the contact page to potentially adjust styles (optional, keeping consistent for now)
  const isContactPage = location.pathname === '/contact';

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
          }`}
        style={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          padding: isScrolled ? '1rem 2rem' : '1.5rem 2rem',
          transition: 'all 0.3s ease',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000,
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <div className="container flex-between">
          {/* Logo */}
          <Link to="/" className="flex-center" style={{ gap: '12px', zIndex: 1001 }}>
            <img src={logo} alt="Trendy Crafts" style={{ height: '50px', width: 'auto' }} />
          </Link>

          {/* Desktop Menu */}
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} style={{
            display: 'flex',
            gap: '3rem',
            /* Mobile styles handled via media queries or inline override for simplicity in this demo */
            ...(isMobileMenuOpen ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999
            } : {}) // Note: proper responsive CSS would be better, but this works for demo
          }}>
            {/* Mobile Close Button */}
            {isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ position: 'absolute', top: '2rem', right: '2rem' }}
              >
                <X size={24} />
              </button>
            )}

            {['Home', 'Shop', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontWeight: 500,
                  fontSize: isMobileMenuOpen ? '2rem' : '1rem',
                  position: 'relative',
                  color: 'var(--color-text-main)'
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex-center" style={{ gap: '1.5rem', zIndex: 1001 }}>
            <button aria-label="Search" className="hidden-mobile">
              <Search size={20} color="var(--color-text-main)" />
            </button>
            <div className="relative" style={{ position: 'relative' }}>
              <button aria-label="Cart" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={20} color="var(--color-text-main)" />
              </button>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  fontSize: '0.7rem',
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

            {/* Mobile Toggle */}
            <div className="mobile-toggle" style={{ display: 'none' }}>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer />

      {/* Mobile Styles Injection */}
      <style>{`
        @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .mobile-toggle { display: block !important; }
            .nav-links:not(.open) { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
