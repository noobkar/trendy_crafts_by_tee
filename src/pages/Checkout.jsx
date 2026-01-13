import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Send, CreditCard, Landmark, Loader2, CheckCircle } from 'lucide-react';
import { sendOrderEmail } from '../services/emailService';
import { trackBeginCheckout, trackPurchase } from '../services/analyticsService';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        email: '',
        instructions: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    // Track checkout initiation on component mount
    useEffect(() => {
        if (cartItems.length > 0) {
            trackBeginCheckout(cartItems, getCartTotal());
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        setStatus('sending');

        const orderData = {
            items: cartItems,
            total: getCartTotal().toFixed(2),
            customer: formData
        };

        const result = await sendOrderEmail(orderData);

        if (result.success) {
            setStatus('success');
            clearCart();

            // Track purchase analytics
            trackPurchase(orderData);
        } else {
            console.error("EmailJS failed:", result.error);
            // Graceful fallback to mailto
            setStatus('error');

            let itemsList = cartItems.map(item => `- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`).join('%0D%0A');
            const total = getCartTotal().toFixed(2);

            const subject = `New Order from ${formData.name}`;
            const body = `ORDER DETAILS:%0D%0A----------------%0D%0A${itemsList}%0D%0A----------------%0D%0ATOTAL: $${total}%0D%0A%0D%0ACUSTOMER INFO:%0D%0AName: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AAddress: ${formData.address}, ${formData.city}%0D%0AInstructions: ${formData.instructions}`;

            // Small delay to allow UI update then open mail
            setTimeout(() => {
                window.location.href = `mailto:aneestaqa@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            }, 500);
        }
    };

    if (status === 'success') {
        return (
            <div className="checkout-success" style={{ paddingBottom: '3rem', paddingTop: '80px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <Navbar />
                <div className="success-box" style={{ background: '#d4edda', padding: '2.5rem 1.5rem', borderRadius: '16px', maxWidth: '500px', margin: '0 1rem' }}>
                    <CheckCircle size={56} color="#155724" style={{ marginBottom: '1rem' }} />
                    <h1 className="success-title" style={{ marginBottom: '1rem', color: '#155724' }}>Order Placed!</h1>
                    <p className="success-text" style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                        Thank you for your order, {formData.name}. We have received your request and will contact you shortly via email regarding payment and shipping.
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/shop')}>
                        Continue Shopping
                    </button>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .checkout-success { padding-top: 70px !important; }
                        .success-box { padding: 2rem 1.25rem !important; }
                        .success-title { font-size: 1.75rem !important; }
                        .success-text { font-size: 1rem !important; }
                    }
                `}</style>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="checkout-empty" style={{ paddingTop: '80px', textAlign: 'center', minHeight: '60vh', padding: '1rem' }}>
                <Navbar />
                <h1 className="empty-title">Your cart is empty</h1>
                <button className="btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '1rem' }}>
                    Go Shopping
                </button>

                <style>{`
                    @media (max-width: 768px) {
                        .checkout-empty { padding-top: 70px !important; }
                        .empty-title { font-size: 1.75rem !important; }
                    }
                `}</style>
            </div>
        );
    }

    const inputStyle = {
        width: '100%',
        padding: '14px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        minHeight: '48px'
    };

    return (
        <div className="checkout-page" style={{ paddingBottom: '3rem', paddingTop: '80px' }}>
            <Navbar />
            <div className="container">
                <h1 className="checkout-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Checkout</h1>

                <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2 className="section-heading" style={{ marginBottom: '1.25rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Your Order</h2>
                        <div style={{ background: '#f9f9f9', padding: '1.25rem', borderRadius: '12px' }}>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex-between cart-item" style={{ marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600 }}>{item.quantity}x</span>
                                        <span className="item-title">{item.title}</span>
                                    </div>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #ddd', marginTop: '0.75rem', paddingTop: '0.75rem', fontWeight: 'bold', fontSize: '1.15rem' }} className="flex-between">
                                <span>Total</span>
                                <span style={{ color: 'var(--color-primary)' }}>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <h2 className="section-heading" style={{ marginBottom: '1.25rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Payment Method</h2>
                            <div className="glass-panel payment-info" style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                                    <Landmark size={20} /> <strong>Manual Bank Transfer</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                    Please transfer the total amount to the following account. Your order will be processed once payment is confirmed.
                                </p>
                                <div className="bank-details" style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                                    Bank: Example Bank<br />
                                    Account Name: Trendy Crafts<br />
                                    Account No: 1234-5678-90<br />
                                    Reference: Use your Name
                                </div>
                                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                                    * Online Payment Gateway Coming Soon
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details Form */}
                    <div className="shipping-form">
                        <h2 className="section-heading" style={{ marginBottom: '1.25rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Shipping Details</h2>
                        <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Special Instructions</label>
                                <textarea
                                    name="instructions"
                                    rows="3"
                                    value={formData.instructions}
                                    onChange={handleChange}
                                    style={{ ...inputStyle, minHeight: 'auto' }}
                                />
                            </div>

                            {status === 'error' && (
                                <div style={{ padding: '12px', background: '#fff3cd', color: '#856404', borderRadius: '8px', textAlign: 'center' }}>
                                    Opening your email app to complete the order...
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary checkout-btn"
                                style={{
                                    marginTop: '0.75rem',
                                    width: '100%',
                                    padding: '1rem',
                                    justifyContent: 'center',
                                    fontSize: '1.1rem',
                                    minHeight: '52px'
                                }}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? (
                                    <>Processing <Loader2 className="animate-spin" size={20} style={{ marginLeft: '10px' }} /></>
                                ) : (
                                    <>Place Order <Send size={20} style={{ marginLeft: '10px' }} /></>
                                )}
                            </button>
                            <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#666' }}>
                                Secure order placement via Email
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Mobile Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .checkout-page {
                        padding-top: 70px !important;
                    }
                    .checkout-title {
                        font-size: 1.75rem !important;
                    }
                    .checkout-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    .section-heading {
                        font-size: 1.25rem !important;
                    }
                    .item-title {
                        font-size: 0.95rem;
                    }
                    .payment-info {
                        padding: 1rem !important;
                    }
                    .bank-details {
                        font-size: 0.8rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .checkout-page {
                        padding-top: 60px !important;
                    }
                    .checkout-title {
                        font-size: 1.5rem !important;
                    }
                    .checkout-btn {
                        font-size: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Checkout;

