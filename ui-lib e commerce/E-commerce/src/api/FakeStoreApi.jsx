export const fetchProducts=async ()=>{
    try{
        const response=await fetch("https://fakestoreapi.com/products");
        if(!response.ok){
            throw new Error("failed");
        }

        return await response.json();
    } catch(error){
        console.log(error);
        
    }

};


export const fetchCategory=async ()=>{
    try{
        const response=await fetch("https://fakestoreapi.com/products/categories");
        if(!response.ok){
            throw new Error("failed");
        }

        return await response.json();
    } catch(error){
        console.log(error);
        
    }

};

const API_URL = "https://fakestoreapi.com";
const USER_ID = 1; // Example user ID

// Fetch user cart
export const fetchCart = async () => {
  try {
    const response = await fetch(`${API_URL}/carts/user/${USER_ID}`);
    if (!response.ok) throw new Error("Failed to fetch cart");
    const data = await response.json();
    return data.length > 0 ? data[0].products : [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// Add a product to the cart
export const addToCart = async (productId) => {
  try {
    const currentCart = await fetchCart();
    const existingProduct = currentCart.find((item) => item.productId === productId);

    let updatedCart;
    if (existingProduct) {
      updatedCart = currentCart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...currentCart, { productId, quantity: 1 }];
    }

    const response = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: USER_ID,
        date: new Date().toISOString(),
        products: updatedCart,
      }),
    });

    if (!response.ok) throw new Error("Failed to add to cart");
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

// Remove a product from the cart
export const removeFromCart = async (cartId) => {
    try {
      const response = await fetch(`${API_URL}/carts/${cartId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to remove from cart");
  
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      return false;
    }
  };
  