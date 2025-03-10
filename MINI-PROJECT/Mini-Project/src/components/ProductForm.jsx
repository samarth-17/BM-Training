import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, updateProduct, fetchProductsById } from "../api/ProductApi";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const ProductForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing product if in edit mode
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductsById(id),
    enabled: !!id, // Only fetch if id exists
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("thumbnail", product.thumbnail);
    }
  }, [product, setValue]);



  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product added successfully!");
      navigate("/products");
    },
    onError: () => {
      toast.error("Failed to add product!");
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: (updatedData) => updateProduct({ id, updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product updated successfully!");
      navigate("/products");
    },
    onError: () => {
      toast.error("Failed to update product!");
    },
  });

  const onSubmit = (data) => {
    if (id) {
      updateMutation.mutate(data); 
    } else {
      addMutation.mutate(data); 
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit" : "Add"} Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required", min: 1 })}
            className="w-full border p-2 rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            {...register("thumbnail", { required: "Image URL is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
        </div>

        <Button type="submit" className="w-full">
          {id ? "Update" : "Add"} Product
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
