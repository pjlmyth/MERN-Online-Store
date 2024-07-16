import React, { useState, useEffect } from 'react';
import CartProduct from './CartProduct'
import Payment from './Payment'

const ProductsInCart = (props) => {
    console.log(JSON.stringify(props))

    return (
        <div>
            <h1 style={{padding:20}}>My Cart</h1>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    props.cart.map((product) => (
                        <CartProduct key={product._id} data={product} />
                    ))
                }
            </div>
            <h2 style={{padding:40}}>Cart Total: ${props.total}</h2>
            <hr></hr>
            <h3>Payment Information:</h3>
            <Payment />
            <div>
            <button className="btn btn-sm btn-dark" >Place Order</button>
            </div>
        </div>
    );
};

export default ProductsInCart;
