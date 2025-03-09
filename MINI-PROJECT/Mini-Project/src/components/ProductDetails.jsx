import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";

const fetchProductDetails = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};

const ProductDetails = () => {
  const { id } = useParams(); 
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
  });

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-contain rounded-md my-4"
      />
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-bold text-green-600">${product.price}</p>
      <Button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 text-white rounded"
      >
        Back
      </Button>
    </div>
  );
};

export default ProductDetails;
