"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import type { IProduct } from "@/lib/db/models/Product";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async (name?: string) => {
    const query = name ? `?name=${encodeURIComponent(name)}` : "";
    const response = await fetch(`/api/products/search${query}`);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ara
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">Ürün bulunamadı.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id as string} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
