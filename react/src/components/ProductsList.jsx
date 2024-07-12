import React from 'react';
import Product from './Product'

const ProductsList = (props) => {
    return (
        <>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    props.data.map((product) => (
                        <Product key={product._id} data={product} />
                    ))
                }
            </div>
        </>
        
    );
};

export default ProductsList;