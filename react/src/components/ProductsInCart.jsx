import React, { useState, useEffect } from 'react';
import CartProduct from './CartProduct'

const ProductsInCart = (props) => {
    console.log(JSON.stringify(props))

    return (
        <div>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    props.cart.map((product) => (
                        <CartProduct key={product._id} data={product} />
                    ))
                }
            </div>
        </div>
    );
};

export default ProductsInCart;
