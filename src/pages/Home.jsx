import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';

// Import images
import trayImg from '../assets/tray.png';
import vaseImg from '../assets/vase.png';
import candleImg from '../assets/candle.png';

const Home = () => {
    const featuredProducts = [
        { id: 1, title: 'Marble Oval Tray', category: 'Trays', price: 29.99, image: trayImg },
        { id: 2, title: 'Sage Geo Vase', category: 'Vases', price: 34.50, image: vaseImg },
        { id: 3, title: 'Cozy Candle Set', category: 'Candle Holders', price: 24.00, image: candleImg },
        { id: 4, title: 'Minimalist Incense Holder', category: 'Decor', price: 18.00, image: trayImg }, // Reusing image for demo
    ];

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <Navbar />
            <HeroSection />

            {/* Featured Collection */}
            <section className="container" style={{ marginTop: 'var(--spacing-xl)' }}>
                <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span className="text-accent" style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>New Arrivals</span>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Trending Now</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>Handpicked favorites just for you.</p>
                </div>

                <div className="grid-products">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                <div className="flex-center" style={{ marginTop: '3rem' }}>
                    <button className="btn-secondary">View All Products</button>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{
                background: '#EAE0D5',
                marginTop: 'var(--spacing-xl)',
                padding: 'var(--spacing-xl) 0',
                borderRadius: '0'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="feature-item" style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>Eco-Friendly</h3>
                        <p>Made from natural gypsum and eco-safe pigments.</p>
                    </div>
                    <div className="feature-item" style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>Handcrafted</h3>
                        <p>Each piece is poured, sanded, and sealed by hand.</p>
                    </div>
                    <div className="feature-item" style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>Custom Design</h3>
                        <p>Unique patterns and colors for every order.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
