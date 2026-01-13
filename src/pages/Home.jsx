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
        <div style={{ paddingBottom: '3rem' }}>
            <Navbar />
            <HeroSection />

            {/* Featured Collection */}
            <section className="container featured-section" style={{ marginTop: 'var(--spacing-xl)' }}>
                <div className="text-center" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <span className="text-accent" style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>New Arrivals</span>
                    <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Trending Now</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>Handpicked favorites just for you.</p>
                </div>

                <div className="grid-products">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                <div className="flex-center" style={{ marginTop: '2.5rem' }}>
                    <button className="btn-secondary">View All Products</button>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="features-section" style={{
                background: '#EAE0D5',
                marginTop: 'var(--spacing-xl)',
                padding: 'var(--spacing-lg) 0',
                borderRadius: '0'
            }}>
                <div className="container features-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div className="feature-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>Eco-Friendly</h3>
                        <p>Made from natural gypsum and eco-safe pigments.</p>
                    </div>
                    <div className="feature-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>Handcrafted</h3>
                        <p>Each piece is poured, sanded, and sealed by hand.</p>
                    </div>
                    <div className="feature-item" style={{ textAlign: 'center', padding: '1.5rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>Custom Design</h3>
                        <p>Unique patterns and colors for every order.</p>
                    </div>
                </div>
            </section>

            {/* Mobile Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .featured-section {
                        margin-top: 2.5rem !important;
                    }
                    .features-section {
                        margin-top: 2.5rem !important;
                        padding: 2rem 0 !important;
                    }
                    .features-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                    .feature-item {
                        padding: 1rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .featured-section {
                        margin-top: 2rem !important;
                    }
                    .section-title {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;

