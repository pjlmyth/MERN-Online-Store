import React from 'react';
import bannerImage from '../images/LouisTrav.jpg';
import Product from './Product';

const ProductsList = ({ data, addToCart, showAddToCart = true }) => {
    return (
        <div className="products-section">
            <div className="banner-image">
                <img src={bannerImage} alt="Collection Banner" />
            </div>
            <h2 className="collection-title">Explore The Travelers Collection</h2>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    data.map((product) => (
                        <Product 
                            key={product._id} 
                            data={product} 
                            addToCart={addToCart}
                            showAddToCart={showAddToCart}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ProductsList;