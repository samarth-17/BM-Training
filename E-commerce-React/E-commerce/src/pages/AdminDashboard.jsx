import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AdminDashboard = () => {
  const { state, dispatch } = useAppContext();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  // Add a new product
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    dispatch({
      type: "SET_PRODUCTS",
      payload: [...state.products, { id: Date.now(), ...newProduct }],
    });
    setNewProduct({ name: "", price: "", image: "" });
  };

  // Edit product price
  const updatePrice = (id) => {
    if (!newPrice) return;
    dispatch({
      type: "SET_PRODUCTS",
      payload: state.products.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      ),
    });
    setEditingProductId(null);
    setNewPrice("");
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* Add Product Section */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Product Name"
          className="form-control my-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control my-2"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="form-control my-2"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button className="btn btn-success" onClick={addProduct}>
          Add Product
        </button>
      </div>

      {/* Product List */}
      <h3>Products</h3>
      <ul className="list-group">
        {state.products.map((product) => (
          <li key={product.id} className="list-group-item d-flex align-items-center">
            <img src={product.image} alt={product.name} width="50" height="50" className="me-3" />
            <span>{product.name} - ₹{product.price}</span>
            {editingProductId === product.id ? (
              <>
                <input
                  type="number"
                  className="form-control mx-2"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  style={{ width: "80px" }}
                />
                <button className="btn btn-primary btn-sm mx-1" onClick={() => updatePrice(product.id)}>
                  Save
                </button>
              </>
            ) : (
              <button className="btn btn-warning btn-sm mx-2" onClick={() => setEditingProductId(product.id)}>
                Edit Price
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
