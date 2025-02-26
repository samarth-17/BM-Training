import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">
        {state.selectedCategory ? `Category: ${state.selectedCategory}` : "All Products"}
      </h2>
      <div className="row">
        {state.products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          state.products.map(product => (
            <div key={product.id} className="col-md-3 mb-5">
                <img src={product.image} className="card-img-top p-4" alt={product.title} />
                  <h5 className="card-title">{product.title}</h5>
                  <p className="fw-bold text-danger">₹{(product.price * 80).toFixed(2)}</p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/product/${product.id}`} className="btn btn-dark w-50 me-1">View Details</Link>
                    <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })} className="btn btn-dark w-50 ms-1">Add to Cart</button>
                  </div>
                </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
