import React from 'react';
import heroBg from '../assets/hero_bg.png';

const HeroSection = () => {
    return (
        <section className="hero-section" style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingTop: '60px'
        }}>
            {/* Background Image with Parallax-like feel */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.9)',
                zIndex: -1
            }}></div>

            <div className="container hero-content" style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                padding: '2rem 1rem'
            }}>
                <p className="text-accent animate-fade-in hero-subtitle" style={{
                    fontSize: '1.25rem',
                    marginBottom: '1rem',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    Handcrafted Elegance
                </p>
                <h1 className="animate-fade-in hero-title" style={{
                    fontSize: '3.5rem',
                    color: 'white',
                    marginBottom: '1.5rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    animationDelay: '0.2s',
                    lineHeight: 1.1
                }}>
                    Best Ever Crafts
                </h1>
                <p className="animate-fade-in hero-description" style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    animationDelay: '0.4s',
                    lineHeight: 1.6
                }}>
                    Discover our premium collection of gypsum trays, vases, and home decor that brings warmth and style to your space.
                </p>
                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <button className="btn-primary hero-btn" style={{
                        border: '2px solid white',
                        background: 'white',
                        color: 'var(--color-primary)',
                        minHeight: '48px',
                        padding: '14px 32px'
                    }}>
                        Shop Collection
                    </button>
                </div>
            </div>

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .hero-section {
                        min-height: 85vh !important;
                        padding-top: 70px !important;
                    }
                    .hero-title {
                        font-size: 2.5rem !important;
                    }
                    .hero-subtitle {
                        font-size: 1rem !important;
                    }
                    .hero-description {
                        font-size: 1rem !important;
                        padding: 0 0.5rem;
                    }
                    .hero-content {
                        padding: 1.5rem 1rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .hero-section {
                        min-height: 80vh !important;
                        padding-top: 60px !important;
                    }
                    .hero-title {
                        font-size: 2rem !important;
                        margin-bottom: 1rem !important;
                    }
                    .hero-subtitle {
                        font-size: 0.9rem !important;
                    }
                    .hero-description {
                        font-size: 0.95rem !important;
                        margin-bottom: 1.5rem !important;
                    }
                    .hero-btn {
                        width: 100%;
                        max-width: 280px;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;

