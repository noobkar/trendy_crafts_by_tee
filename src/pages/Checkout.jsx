import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Send, CreditCard, Landmark, Loader2, CheckCircle } from 'lucide-react';
import { sendOrderEmail } from '../services/emailService';

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
            <div style={{ paddingBottom: '4rem', paddingTop: '100px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ background: '#d4edda', padding: '3rem', borderRadius: '16px', maxWidth: '500px' }}>
                    <CheckCircle size={64} color="#155724" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#155724' }}>Order Placed!</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Thank you for your order, {formData.name}. We have received your request and will contact you shortly via email regarding payment and shipping.
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/shop')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '60vh' }}>
                <Navbar />
                <h1>Your cart is empty</h1>
                <button className="btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '1rem' }}>
                    Go Shopping
                </button>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '4rem', paddingTop: '100px' }}>
            <Navbar />
            <div className="container">
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>

                <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                    {/* Order Summary */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Your Order</h2>
                        <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '12px' }}>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex-between" style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600 }}>{item.quantity}x</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #ddd', marginTop: '1rem', paddingTop: '1rem', fontWeight: 'bold', fontSize: '1.25rem' }} className="flex-between">
                                <span>Total</span>
                                <span style={{ color: 'var(--color-primary)' }}>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div style={{ marginTop: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Payment Method</h2>
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                                    <Landmark /> <strong>Manual Bank Transfer</strong>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    Please transfer the total amount to the following account. Your order will be processed once payment is confirmed.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                    Bank: Example Bank<br />
                                    Account Name: Trendy Crafts<br />
                                    Account No: 1234-5678-90<br />
                                    Reference: Use your Name
                                </div>
                                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
                                    * Online Payment Gateway Coming Soon
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details Form */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Shipping Details</h2>
                        <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
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
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
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
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
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
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Special Instructions</label>
                                <textarea
                                    name="instructions"
                                    rows="3"
                                    value={formData.instructions}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            {status === 'error' && (
                                <div style={{ padding: '10px', background: '#fff3cd', color: '#856404', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>
                                    Opening your email app to complete the order...
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{
                                    marginTop: '1rem',
                                    width: '100%',
                                    padding: '1rem',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
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
        </div>
    );
};

export default Checkout;
