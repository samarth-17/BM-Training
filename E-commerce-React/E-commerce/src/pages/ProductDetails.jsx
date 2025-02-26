import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { state, dispatch } = useAppContext();
  const { id } = useParams();
  const product = state.products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container py-4"><h2>Product not found.</h2></div>;
  }

  return (
    <div className="container py-4">
      <div className="card p-4 w-200">
        <img src={product.image} className="mx-auto d-block" style={{ width: "150px" }} alt={product.title} />
        <h2 className="fw-bold text-dark">₹{(product.price * 80)}</h2>
        <p className="mt-3">{product.title}</p>
        <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })} className="btn btn-success w-70">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
