import React from 'react';
import ProductsInCart from './ProductsInCart'

const Cart = (props) => {
    return (
        <>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    props.data.map((product) => (
                        <ProductsInCart key={product._id} data={product}/>
                    ))
                }
            </div>
        </>
    );
};

export default Cart;