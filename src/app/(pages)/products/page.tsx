"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import type { IProduct } from "@/lib/db/models/Product";

export default function CsrFetchPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
