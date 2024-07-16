import React, { useState } from 'react';
import CartProduct from './CartProduct';
import { useAuth } from '../hooks/AuthContext';

const ProductsInCart = ({ cart, removeFromCart, clearCart }) => {
    const { user } = useAuth();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            alert('Please log in to place an order.');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const orderPromises = cart.map(product => 
                fetch('http://localhost:3000/place-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.userid,
                        user_name: user.username,
                        product_id: product.productID,
                        product_name: product.name,
                        product_category: product.category
                    }),
                }).then(async response => {
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.message || 'Failed to place order');
                    return data;
                })
            );

            const results = await Promise.all(orderPromises);
            
            console.log('Order placement results:', results);
            alert('Orders placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert(`Failed to place order: ${error.message}`);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>My Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {cart.map((product) => (
                            <CartProduct 
                                key={product._id} 
                                data={product} 
                                onRemove={() => removeFromCart(product._id)}
                            />
                        ))}
                    </div>
                    <h2 className="mt-4">Cart Total: ${calculateTotal()}</h2>
                    <button 
                        onClick={handlePlaceOrder} 
                        disabled={isPlacingOrder}
                        className="btn btn-primary mt-3"
                    >
                        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                    </button>
                </>
            )}
        </div>
    );
};

export default ProductsInCart;