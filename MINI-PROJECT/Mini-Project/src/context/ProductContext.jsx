import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/ProductApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });


  return (
    <ProductContext.Provider value={{ products: data, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
