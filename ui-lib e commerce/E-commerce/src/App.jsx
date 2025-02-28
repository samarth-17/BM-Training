import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CategoryProvider } from "@/context/CategoryContext";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Category from "@/components/Category";
import ProductDetail from "@/components/ProductDetail";
import Cart from "@/components/Cart";

const router = createBrowserRouter([
  { path: "/", element: <><Navbar /><Home /></> },
  { path: "/category/:categoryType", element: <><Navbar /><Category /></> },
  { path: "/product/:id", element: <><Navbar /><ProductDetail /></> },
  { path: "/cart", element: <><Navbar /><Cart /></> }
]);

function App() {
  return (
    <CategoryProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </CategoryProvider>
  );
}

export default App;
