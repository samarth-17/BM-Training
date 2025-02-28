// First, let's update the Cart component to display cart items and handle cart operations

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { fetchCart, removeFromCart } from "@/api/FakeStoreApi";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        setLoading(true);
        const cart = await fetchCart();
        setCartItems(cart);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cart items");
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  const handleRemoveFromCart = async (cartId) => {
    const success = await removeFromCart(cartId);
    if (success) {
      setCartItems(cartItems.filter(item => item.id !== cartId));
    } else {
      setError("Failed to remove item from cart");
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product ? product.price * item.quantity * 80 : 0);
    }, 0).toFixed(2);
  };

  if (loading) return <p className="text-center text-xl">Loading cart...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => {
              const product = getProductDetails(item.productId);
              return product ? (
                <div key={item.productId} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-gray-600">₹{(product.price * 80).toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold mr-4">₹{(product.price * item.quantity * 80).toFixed(2)}</p>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">₹{calculateTotalPrice()}</span>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;