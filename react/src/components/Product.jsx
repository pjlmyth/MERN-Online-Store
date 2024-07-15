import React from 'react';

const Product = (props) => {
    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title"></h5>
                <div className="card-text">{props.data.name}</div>
                <div className="card-text">Category: {props.data.category}</div>
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-sm btn-dark">Add To Cart</button>
            </div>
        </div>
    );
};

export default Product;
