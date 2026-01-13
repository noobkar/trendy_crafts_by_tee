import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import trayImg from '../assets/tray.png';
import vaseImg from '../assets/vase.png';
import candleImg from '../assets/candle.png';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
    // Extended product list
    const allProducts = [
        { id: 1, title: 'Marble Oval Tray', category: 'Trays', price: 29.99, image: trayImg },
        { id: 2, title: 'Sage Geo Vase', category: 'Vases', price: 34.50, image: vaseImg },
        { id: 3, title: 'Cozy Candle Set', category: 'Candle Holders', price: 24.00, image: candleImg },
        { id: 4, title: 'Minimalist Incense Holder', category: 'Decor', price: 18.00, image: trayImg },
        { id: 5, title: 'Round Trinket Dish', category: 'Trays', price: 15.00, image: trayImg },
        { id: 6, title: 'Tall Ribbed Vase', category: 'Vases', price: 42.00, image: vaseImg },
    ];

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Trays', 'Vases', 'Candle Holders', 'Decor'];

    // Reset filter to 'All' if a new search is performed (optional but good UX)
    useEffect(() => {
        if (searchQuery) {
            setFilter('All');
        }
    }, [searchQuery]);

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = filter === 'All' || product.category === filter;
        const matchesSearch = searchQuery
            ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="shop-page" style={{ paddingBottom: '3rem', paddingTop: '80px' }}>
            <Navbar />

            <div className="container">
                <div className="shop-header flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 className="shop-title" style={{ margin: 0 }}>Shop All</h1>

                    <div className="filter-tabs" style={{
                        display: 'flex',
                        gap: '0.75rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className="filter-btn"
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '50px',
                                    backgroundColor: filter === cat ? 'var(--color-primary)' : 'transparent',
                                    color: filter === cat ? 'white' : 'var(--color-text-main)',
                                    border: `1px solid ${filter === cat ? 'var(--color-primary)' : '#ddd'}`,
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    minHeight: '44px',
                                    flexShrink: 0
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid-products">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>

            {/* Mobile Responsive Styles */}
            <style>{`
                .filter-tabs::-webkit-scrollbar {
                    display: none;
                }
                
                @media (max-width: 768px) {
                    .shop-page {
                        padding-top: 70px !important;
                    }
                    .shop-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    .shop-title {
                        font-size: 1.75rem !important;
                    }
                    .filter-tabs {
                        width: 100%;
                        padding-left: 0.25rem;
                    }
                    .filter-btn {
                        padding: 8px 16px !important;
                        font-size: 0.9rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .shop-page {
                        padding-top: 60px !important;
                    }
                    .shop-title {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Shop;

