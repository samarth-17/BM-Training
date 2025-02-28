import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { CartContext } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export function Home() {
    const { products, loading, error } = useContext(ProductContext);
    const { handleAddToCart } = useContext(CartContext);
    const navigate = useNavigate();


    const handleAddCart = async (productId) => {
      const success = await handleAddToCart(productId);
      if (success) {
          navigate("/cart");
      }
  };

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
                <Card key={product.id} className="w-full">
                    <CardHeader>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain rounded-md"
                        />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-lg font-semibold truncate">{product.title}</CardTitle>
                        <p className="text-xl font-bold mt-2">₹{(product.price * 80).toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full gap-x-4">
                            <Button className="w-full" onClick={() => handleAddCart(product.id)}>
                                Add to Cart
                            </Button>
                            <Button className="w-full"onClick={() => navigate(`/product/${product.id}`)}>
                                Buy Now
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default Home;