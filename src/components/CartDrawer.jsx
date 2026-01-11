import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            display: 'flex',
            justifyContent: 'flex-end',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            transition: 'opacity 0.3s ease'
        }}
            onClick={() => setIsCartOpen(false)}
        >
            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '100%',
                backgroundColor: 'white',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideIn 0.3s ease-out'
            }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-between" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Your Cart <ShoppingBag size={20} />
                    </h2>
                    <button onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)' }}>
                        <ShoppingBag size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>Your cart is empty.</p>
                        <button
                            className="btn-primary"
                            style={{ marginTop: '1.5rem' }}
                            onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', background: '#f5f5f5' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                                            <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>{item.title}</h3>
                                            <button onClick={() => removeFromCart(item.id)} style={{ color: '#999' }}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <p style={{ color: 'var(--color-primary)', fontWeight: 500, marginBottom: '0.5rem' }}>
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #eee', width: 'fit-content', borderRadius: '4px', padding: '2px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                style={{ padding: '4px 8px' }}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                style={{ padding: '4px 8px' }}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                            <div className="flex-between" style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                                <span>Total</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <button
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                                onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default CartDrawer;
