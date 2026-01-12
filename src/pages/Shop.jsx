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
        <div style={{ paddingBottom: '4rem', paddingTop: '100px' }}>
            <Navbar />

            <div className="container">
                <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Shop All</h1>

                    <div className="filter-tabs" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '8px 24px',
                                    borderRadius: '50px',
                                    backgroundColor: filter === cat ? 'var(--color-primary)' : 'transparent',
                                    color: filter === cat ? 'white' : 'var(--color-text-main)',
                                    border: `1px solid ${filter === cat ? 'var(--color-primary)' : '#ddd'}`,
                                    transition: 'all 0.3s ease'
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
        </div>
    );
};

export default Shop;
