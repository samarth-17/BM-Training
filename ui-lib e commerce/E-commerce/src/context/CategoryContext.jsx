import React, { createContext, useState, useEffect } from "react";
import { fetchCategory } from "@/api/FakeStoreApi";

export const CategoryContext=createContext();

export const CategoryProvider=({children})=>{
    const[categories , setCategories]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(()=>{
        const getcat=async ()=>{
            setLoading(true);
            const data=await fetchCategory();
            if(data.length>0){
                setCategories(data);
            }
            else{
                setError("failed")
            }
            setLoading(false);
        };
        getcat();
    },[]);


    return(
        <CategoryContext.Provider value={{categories , loading , error}}>
            {children}
        </CategoryContext.Provider>
    );


};