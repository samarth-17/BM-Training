import React from "react";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className="container py-4">
      {state.cart.length === 0 ? (
        <h1 className="text-center">Your cart is empty.</h1>
      ) : (
        state.cart.map(item => (
          <div key={item.id} className="card p-4 mb-4 d-flex">
            <img src={item.image} className="me-5" style={{ width: "50px" }} alt={item.title} />
            <h5 className="flex-grow-1">{item.title}</h5>
            <p className="fw-bold text-primary me-2">₹{(item.price * 80)}</p>
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })} className="btn btn-danger w-50">Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
