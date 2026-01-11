import React from 'react';
import heroBg from '../assets/hero_bg.png';

const HeroSection = () => {
    return (
        <section style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
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

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <p className="text-accent animate-fade-in" style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    Handcrafted Elegance
                </p>
                <h1 className="animate-fade-in" style={{
                    fontSize: '4.5rem',
                    color: 'white',
                    marginBottom: '2rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    animationDelay: '0.2s'
                }}>
                    Best Ever Crafts
                </h1>
                <p className="animate-fade-in" style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '3rem',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    animationDelay: '0.4s'
                }}>
                    Discover our premium collection of gypsum trays, vases, and home decor that brings warmth and style to your space.
                </p>
                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <button className="btn-primary" style={{ border: '2px solid white', background: 'white', color: 'var(--color-primary)' }}>
                        Shop Collection
                    </button>
                    {/* <button className="btn-secondary" style={{ marginLeft: '1rem', borderColor: 'white', color: 'white' }}>
                        View Gallery
                    </button> */}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
