import React from 'react';

const Product = (props) => {

    const handleAddToCart = async (e) => {
        e.preventDefault();
        // Add the current timestamp
        const submission = props.data
      
        try {
            // TODO: Make a POST request to the API to add the sock
            const response = await fetch(`http://localhost:3000/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submission),
            });
      
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            console.log(data);
            // Handle post submission logic (like showing a success message)
        } catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }
      };

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
