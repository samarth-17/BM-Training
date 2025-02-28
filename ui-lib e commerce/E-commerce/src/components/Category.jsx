import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { categoryType } = useParams(); 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Category: {categoryType}</h1>
      <p className="text-gray-500">Display products for {categoryType} here...</p>
    </div>
  );
}