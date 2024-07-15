import React from 'react';
import Product from './Product'

const ProductsList = ({ data, addToCart, showAddToCart = true }) => {
    return (
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
    );
};

export default ProductsList;