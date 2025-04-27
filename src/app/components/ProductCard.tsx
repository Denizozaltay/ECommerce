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
      {/* Resim kısmı */}
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ürün bilgileri */}
      <div className="w-full text-center">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </div>

      {/* Rating kısmı */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} color="#ffd500" />
        ))}
        <p className="text-xs text-gray-500 ml-1">48 reviews</p>
      </div>

      {/* Buy butonu */}
      <div className="flex w-full justify-center mt-3">
        <Button className="cursor-pointer" variant="outline">
          <ShoppingBasket className="mr-1" size={16} /> Buy
        </Button>
      </div>
    </div>
  );
}
