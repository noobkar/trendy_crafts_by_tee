import React from 'react';
import { ShoppingCart } from 'lucide-react';

import { useCart } from '../context/CartContext';

const ProductCard = ({ id, image, title, price, category }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card group" style={{ position: 'relative', cursor: 'pointer' }}>
            <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '1rem',
                aspectRatio: '1/1',
                backgroundColor: '#f5f5f5'
            }}>
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Overlay Action */}
                <button style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'white',
                    borderRadius: '50%',
                    padding: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                }}
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ id, image, title, price });
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.querySelector('svg').style.stroke = 'white'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'white'; e.currentTarget.querySelector('svg').style.stroke = 'var(--color-text-main)'; }}
                >
                    <ShoppingCart size={20} color="var(--color-text-main)" />
                </button>
            </div>

            <div className="product-info">
                <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '4px'
                }}>
                    {category}
                </span>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-heading)'
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: 'var(--color-primary)'
                }}>
                    ${price.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
