import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

import { CartProvider } from './context/CartContext';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
        developed by amjid_afri & amo_u with love ❤️
      </div>
    </CartProvider>
  );
}

export default App;
