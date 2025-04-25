"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBasket, Star } from "lucide-react";
import type { IProduct } from "@/lib/db/models/Product";

type Props = {
  product: IProduct;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="flex flex-col w-[250px] h-fit items-center p-4 bg-gray-50 rounded-xl border border-gray-200 gap-2">
      <div className="w-full">
        <img
          className="rounded-lg w-full h-40 object-cover"
          src="https://www.notebookcheck-tr.com/fileadmin/Notebooks/Apple/MacBook_Pro_14_2024_M4/IMG_7747.JPG"
          alt={product.name}
        />
      </div>
      <div className="w-full text-center">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} color="#ffd500" />
        ))}
        <p className="text-xs text-gray-500 ml-1">48 reviews</p>
      </div>
      <div className="flex w-full justify-center mt-3">
        <Button className="cursor-pointer" variant="outline">
          <ShoppingBasket className="mr-1" size={16} /> Buy
        </Button>
      </div>
    </div>
  );
}
