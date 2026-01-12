import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

import { CartProvider } from './context/CartContext';
import { initializeAnalytics, trackPageView } from './services/analyticsService';

function App() {
  const { pathname } = useLocation();

  // Initialize analytics on app load
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views and scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    // Track page view with location
    const pageName = pathname === '/' ? 'Home' : pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2);
    trackPageView(pageName);
  }, [pathname]);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Placeholder for other routes */}
        <Route path="*" element={<Home />} />
      </Routes>
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '15px',
        fontSize: '0.75rem',
        color: 'var(--color-text-light)', // uses theme var
        opacity: 0.7,
        zIndex: 9999,
        background: 'rgba(255,255,255,0.7)',
        padding: '2px 8px',
        borderRadius: '12px',
        backdropFilter: 'blur(4px)',
        pointerEvents: 'none',
        fontWeight: 500
      }}>
        developed by <a href="https://instagram.com/amjid_afri" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>@amjid_afri</a> & <a href="https://instagram.com/amo_u" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>@amo_u</a> with love ❤️
      </div>
    </CartProvider>
  );
}

export default App;
