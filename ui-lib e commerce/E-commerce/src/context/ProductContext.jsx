import React, { createContext, useState, useEffect } from "react";
import {fetchProducts } from "@/api/FakeStoreApi";

export const ProductContext=createContext();

export const ProductProvider=({children})=>{
    const[products , setProducts]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(()=>{
        const getcat=async ()=>{
            setLoading(true);
            const data=await fetchProducts();
            if(data.length>0){
                setProducts(data);
            }
            else{
                setError("failed")
            }
            setLoading(false);
        };
        getcat();
    },[]);


    return(
        <ProductContext.Provider value={{products , loading , error}}>
            {children}
        </ProductContext.Provider>
    );


};