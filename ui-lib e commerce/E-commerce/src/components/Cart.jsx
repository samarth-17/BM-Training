import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { ProductContext } from "@/context/ProductContext";

const Cart = () => {
  const { cart, loading, error, handleClearCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const product = getProductDetails(item.productId);
        return total + (product ? product.price * item.quantity * 80 : 0);
      }, 0)
      .toFixed(2);
  };

  if (loading) return <p className="text-center text-xl">Loading cart...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cart.map((item) => {
              const product = getProductDetails(item.productId);
              return product ? (
                <div key={item.productId} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-contain mr-4" />
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-gray-600">₹{(product.price * 80).toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold mr-4">₹{(product.price * item.quantity * 80).toFixed(2)}</p>
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
            <div className="flex flex-col gap-4">
              <Button className="w-full">Proceed to Checkout</Button>
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white" 
                onClick={handleClearCart}
                >
                Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;