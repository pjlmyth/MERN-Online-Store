import React from 'react';

const Product = (props) => {
    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title"></h5>
                <div className="card-text">{props.data.name}</div>
                <div className="card-text">Category: {props.data.category}</div>
            </div>
            <div className="card-body">
                
            </div>
        </div>
    );
};

export default Product;
