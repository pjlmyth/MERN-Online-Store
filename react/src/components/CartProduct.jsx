import React, { useState, useEffect } from 'react';

const CartProduct = (props) => {
    const [imagePath, setImagePath] = useState(null);

    useEffect(() => {
        // Construct the image filename based on data.name
        let imageName = `${props.data.name.toLowerCase().replace(/\s+/g, '-')}.jpg`; // Normalize image name, replace spaces with dashes
        let url = `../images/${imageName}`
        // Dynamic import of the image
        import(url)
            .then((image) => {
                setImagePath(image.default); // Set the image path in state
            })
            .catch((err) => {
                console.error(`Error importing image: ${err}`);
            });
    }, [props.data.name]); // Run effect whenever props.data.name changes

    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <img src={imagePath} className="card-img-top" alt={props.data.name} style={{ height: '200px', objectFit: 'cover' }} />
                <h5 className="card-title">{props.data.name}</h5>
                <div className="card-text">Category: {props.data.category}</div>
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="card-text">Price: ${props.data.price}</div>
                <button 
                    onClick={props.onRemove} 
                    className="btn btn-danger btn-sm"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartProduct;
