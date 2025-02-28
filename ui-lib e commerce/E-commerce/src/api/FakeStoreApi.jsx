export const USER_ID = 1;

export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCart = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/user/${USER_ID}`);
    if (!response.ok) throw new Error("Failed to fetch cart");

    const data = await response.json();
    
    return data.length > 0
      ? data[0].products.map(item => ({
          id: item.productId,
          productId: item.productId,
          quantity: item.quantity
        }))
      : [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const fetchCategory = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addToCart = async (productId) => {
  try {
    const newCartItem = {
      userId: USER_ID,
      products: [{ id: productId, quantity: 1 }],
    };

    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCartItem),
    });

    if (!response.ok) throw new Error("Failed to add to cart");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const clearCart = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${USER_ID}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to clear cart");

    return [];
  } catch (error) {
    console.error("Error clearing cart:", error);
    return null;
  }
};
