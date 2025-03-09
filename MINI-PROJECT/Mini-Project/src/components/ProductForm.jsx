import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ProductForm = ({ product, onSubmit, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("title", { required: true })} placeholder="Product Title" className="border p-2 w-full" />
      <input type="number" {...register("price", { required: true })} placeholder="Price" className="border p-2 w-full" />

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {product ? "Update Product" : "Add Product"}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
