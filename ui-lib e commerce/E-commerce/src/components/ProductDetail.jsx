import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const { handleAddToCart } = useContext(CartContext);
    const product = products.find((p) => p.id === parseInt(id));
    const navigate=useNavigate()

    
    const handleAddCart = async (productId) => {
      const success = await handleAddToCart(productId);
      if (success) {
          navigate("/cart");
      }
  };

    if (!product) return <p className="text-center text-xl text-red-500">Product not found.</p>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex gap-x-8 bg-white p-6 border rounded-lg shadow-lg">
                <div className="w-70 max-w-sm p-6 border rounded-lg shadow-lg bg-white">
                    <h2 className="text-lg font-semibold text-center mb-4">{product.title}</h2>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-50 object-contain rounded-md mb-4"
                    />
                    <p className="text-xl font-bold text-center">Price: ₹{(product.price * 80).toFixed(2)}</p>
                    <Button className="mt-4 w-full" onClick={() => handleAddCart(product.id)}>
                        Add to Cart
                    </Button>
                </div>
                <div className="w-70 max-w-sm p-6 border rounded-lg shadow-lg bg-white">
                    <h2 className="text-lg font-semibold mb-4">Description</h2>
                    <p className="text-gray-700">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
