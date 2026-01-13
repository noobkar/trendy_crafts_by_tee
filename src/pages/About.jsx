import React from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';

const About = () => {
    return (
        <div className="about-page" style={{ paddingBottom: '3rem', paddingTop: '80px' }}>
            <Navbar />
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 className="about-title" style={{ marginBottom: '1rem' }}>About Trendy Crafts</h1>
                    <p className="about-subtitle" style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        Handcrafted with love, bringing elegance and warmth to your home.
                    </p>
                </div>

                <div className="story-section" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap-reverse',
                    marginBottom: '3rem'
                }}>
                    <div className="story-content" style={{ flex: 1, minWidth: '280px' }}>
                        <h2 className="story-title" style={{
                            fontFamily: 'var(--font-accent)',
                            marginBottom: '1.5rem',
                            color: 'var(--color-primary)'
                        }}>
                            Our Story
                        </h2>
                        <p style={{ marginBottom: '1.25rem', fontSize: '1rem', lineHeight: 1.7 }}>
                            Trendy Crafts by Tee started with a passion for creating beautiful, functional art.
                            We believe that home decor should not only look good but feel good too. That's why we work with
                            high-quality gypsum to create sustainable, durable, and uniquely handcrafted pieces.
                        </p>
                        <p style={{ marginBottom: '1.25rem', fontSize: '1rem', lineHeight: 1.7 }}>
                            Every tray, vase, and candle holder is mixed, poured, sanded, and sealed by hand.
                            The imperfections in the material are what make each piece truly one-of-a-kind.
                        </p>
                    </div>
                    <div className="story-image" style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '350px',
                            aspectRatio: '1/1',
                            borderRadius: '50% 50% 0 0',
                            background: '#F3E5D8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img src={logo} alt="About Us" style={{ width: '75%', height: 'auto', opacity: 0.9 }} />
                        </div>
                    </div>
                </div>

                <div className="values-section" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: 'var(--color-bg)', borderRadius: '16px' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Why Support Handmade?</h2>
                    <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <h3 style={{ color: 'var(--color-primary)' }}>Unique</h3>
                            <p>No two pieces are exactly alike.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--color-primary)' }}>Quality</h3>
                            <p>Attention to detail you won't find in mass production.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--color-primary)' }}>Heart</h3>
                            <p>Every purchase supports a dream and a maker.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .about-page {
                        padding-top: 70px !important;
                    }
                    .about-title {
                        font-size: 2rem !important;
                    }
                    .about-subtitle {
                        font-size: 1rem !important;
                    }
                    .story-section {
                        gap: 2rem !important;
                    }
                    .story-title {
                        font-size: 1.75rem !important;
                    }
                    .values-section {
                        padding: 2rem 1rem !important;
                    }
                    .values-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .about-page {
                        padding-top: 60px !important;
                    }
                    .about-title {
                        font-size: 1.75rem !important;
                    }
                    .story-content, .story-image {
                        min-width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default About;

