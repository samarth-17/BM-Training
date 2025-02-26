import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
  selectedCategory: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = state.selectedCategory
          ? `https://fakestoreapi.com/products/category/${state.selectedCategory}`
          : "https://fakestoreapi.com/products";
        const productsRes = await axios.get(url);
        dispatch({ type: "SET_PRODUCTS", payload: productsRes.data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [state.selectedCategory]);

  return (
    <AppContext.Provider value={{ state, dispatch, categories }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
