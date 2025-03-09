import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useSearchStore from "../store/useSearchStore"; 
import useCartStore from "../store/useCartStore";

const AllProducts = () => {
  const { products, isLoading, error } = useContext(ProductContext);
  const navigate = useNavigate();
  const { sortOrder, setSortOrder, searchQuery } = useSearchStore();
  const { addToCart, cart } = useCartStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-4">All Products</h2>

      <div className="flex justify-end mb-4">
        <Button onClick={() => setSortOrder("asc")} className="mr-2">
          Sort by Price: Low to High
        </Button>
        <Button onClick={() => setSortOrder("desc")}>
          Sort by Price: High to Low
        </Button>
      </div>

      <ul className="grid grid-cols-3 gap-4 mt-4">
        {sortedProducts.map((prod) => (
          <li key={prod.id} className="border p-4 rounded-lg shadow-md">
            <strong>{prod.title}</strong>
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="w-full h-48 object-contain rounded-md mt-2"
            />
            <strong>${prod.price}</strong>
            <div className="flex gap-2">
            <Button className="p-2 m-4" onClick={() => navigate(`/product/${prod.id}`)}>
            View Product
            </Button>
            <Button className="p-2 m-4"    onClick={() => {
            addToCart(1, [{ id: prod.id, quantity: 1 }]); 
            navigate("/cart"); 
            }}
            >
            Add To Cart
            </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
