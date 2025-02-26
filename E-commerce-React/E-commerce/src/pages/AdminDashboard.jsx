import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AdminDashboard = () => {
  const { state, dispatch } = useAppContext();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [newPrice, setNewPrice] = useState("");

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    dispatch({
      type: "SET_PRODUCTS",
      payload: [...state.products, { id: Date.now(), ...newProduct }],
    });

    setNewProduct({ name: "", price: "", image: "" });
  };


  const updatePrice = (id) => {
    if (!newPrice) return;

    dispatch({
      type: "SET_PRODUCTS",
      payload: state.products.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      ),
    });

    setNewPrice("");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <h3>Products</h3>
      <ul>
        {state.products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            <span>{product.name} - ₹{product.price}</span>
            

            <input
              type="number"
              placeholder="New Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button onClick={() => updatePrice(product.id)}>Update Price</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
