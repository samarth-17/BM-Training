import axios from "axios";

// Fetch all products
export const fetchProducts = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
};

// Fetch product by ID
export const fetchProductsById = async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
};

// Add a new product
export const addProduct = async (product) => {
    const response = await axios.post("https://dummyjson.com/products/add", product, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

// Update a product
export const updateProduct = async ({ id, updatedData }) => {
    const response = await axios.put(`https://dummyjson.com/products/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    return id;
};
