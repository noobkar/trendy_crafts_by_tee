import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Instagram, Send, Loader2 } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const result = await sendContactEmail(formData);

        if (result.success) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
            // Fallback to mailto if EmailJS fails (e.g. valid keys not set)
            setTimeout(() => {
                alert("Email service is not fully configured yet. Opening your default mail app instead.");
                const subject = `Inquiry from Website: ${formData.name}`;
                const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage:%0D%0A${formData.message}`;
                window.location.href = `mailto:aneestaqa@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            }, 1000);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ paddingBottom: '4rem', paddingTop: '100px' }}>
            <Navbar />
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                            Have a custom order request or a question? We'd love to hear from you.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                        {/* Contact Form */}
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-border)',
                                            fontFamily: 'var(--font-body)'
                                        }}
                                        placeholder="Your Name"
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
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-border)',
                                            fontFamily: 'var(--font-body)'
                                        }}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-border)',
                                            fontFamily: 'var(--font-body)',
                                            resize: 'vertical'
                                        }}
                                        placeholder="Tell us about your custom order idea..."
                                    ></textarea>
                                </div>

                                {status === 'success' && (
                                    <div style={{ padding: '10px', background: '#d4edda', color: '#155724', borderRadius: '8px', textAlign: 'center' }}>
                                        Message sent successfully!
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '8px', textAlign: 'center' }}>
                                        Failed to send automatically. Opening mail app...
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ justifyContent: 'center' }}
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? (
                                        <>Sending... <Loader2 className="animate-spin" size={18} /></>
                                    ) : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Social Links */}
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Follow Us</h3>
                            <a
                                href="https://www.instagram.com/trendy_crafts_by_tee/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '1.2rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: 600
                                }}
                            >
                                <Instagram size={24} /> trendy_crafts_by_tee
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
