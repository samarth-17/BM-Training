import axios from "axios";

export const fetchCart = async (userId) => {
  try {
    const response = await axios.get(`https://dummyjson.com/carts/user/${userId}`);
    console.log("Cart Response:", response.data);

    const cartItems = response.data.carts?.[0]?.products || [];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { cartItems, total };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { cartItems: [], total: 0 };
  }
};

export const addToCart = async (userId, products) => {
  try {
    const response = await axios.post("https://dummyjson.com/carts/add", {
      userId,
      products,
    });

    return response.data.products || [];
  } catch (error) {
    console.error("Error adding to cart:", error);
    return [];
  }
};

export const deleteCart = async (userId) => {
  try {
    const response = await axios.delete(`https://dummyjson.com/carts/${userId}`);

    if (response.status === 200) {
      console.log("Cart deleted successfully:", response.data);
      return true;
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
  }
  return false;
};
