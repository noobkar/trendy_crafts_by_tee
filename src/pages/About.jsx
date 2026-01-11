import React from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';

const About = () => {
    return (
        <div style={{ paddingBottom: '4rem', paddingTop: '100px' }}>
            <Navbar />
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>About Trendy Crafts</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        Handcrafted with love, bringing elegance and warmth to your home.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4rem',
                    flexWrap: 'wrap-reverse',
                    marginBottom: '4rem'
                }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ fontFamily: 'var(--font-accent)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                            Our Story
                        </h2>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            Trendy Crafts by Tee started with a passion for creating beautiful, functional art.
                            We believe that home decor should not only look good but feel good too. That's why we work with
                            high-quality gypsum to create sustainable, durable, and uniquely handcrafted pieces.
                        </p>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            Every tray, vase, and candle holder is mixed, poured, sanded, and sealed by hand.
                            The imperfections in the material are what make each piece truly one-of-a-kind.
                        </p>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '400px',
                            aspectRatio: '1/1',
                            borderRadius: '50% 50% 0 0',
                            background: '#F3E5D8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {/* Placeholder for About Image - could use logo or product shot */}
                            <img src={logo} alt="About Us" style={{ width: '80%', height: 'auto', opacity: 0.9 }} />
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-bg)', borderRadius: '16px' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Why Support Handmade?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
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
        </div>
    );
};

export default About;
