import React, { useContext, useReducer } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useSearchStore from "../store/useSearchStore";
import useCartStore from "../store/useCartStore";

const sortReducer = (state, action) => {
  switch (action.type) {
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
};

const AllProducts = () => {
  const { products, isLoading, error } = useContext(ProductContext);
  const navigate = useNavigate();
  const { searchQuery } = useSearchStore();
  const { addToCart } = useCartStore();

  const [state, dispatch] = useReducer(sortReducer, { sortOrder: "asc" });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) =>
    state.sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-4">All Products</h2>

      <div className="flex justify-end mb-4">
        <Button onClick={() => dispatch({ type: "SET_SORT_ORDER", payload: "asc" })} className="mr-2">
          Sort by Price: Low to High
        </Button>
        <Button onClick={() => dispatch({ type: "SET_SORT_ORDER", payload: "desc" })}>
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
              <Button
                className="p-2 m-4"
                onClick={() => {
                  addToCart(1, [{ id: prod.id, quantity: 1 }]);
                  navigate("/cart");
                }}
              >
                Add To Cart
              </Button>
              <Button  className="p-2 m-4 " onClick={() => navigate(`/edit-product/${prod.id}`)}>
              Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;