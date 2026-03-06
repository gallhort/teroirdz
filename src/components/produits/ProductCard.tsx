"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/currency";

type ProductCardProduct = {
  id: string;
  name: string;
  flavor?: string | null;
  category: string;
  pricePerUnit: number;
  unit: string;
  image?: string | null;
  description?: string | null;
  maxQty?: number | null;
  orderedQty?: number;
};

interface ProductCardProps {
  product: ProductCardProduct;
  batchOpen?: boolean;
  onAdd?: (product: ProductCardProduct) => void;
}

export default function ProductCard({ product, batchOpen, onAdd }: ProductCardProps) {
  const isSoldOut =
    product.maxQty !== null &&
    product.maxQty !== undefined &&
    product.orderedQty !== undefined &&
    product.orderedQty >= product.maxQty;

  const categoryImages: Record<string, string> = {
    "Charcuterie bœuf": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80",
    "Charcuterie volaille": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80",
    "Poisson fumé": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
    "Asie / Afrique": "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80",
  };

  const imgSrc = product.image ?? categoryImages[product.category] ?? "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80";

  return (
    <div className="card flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Épuisé pour cette fournée
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#C9A96E" }}>{product.category}</p>
          <h3 className="font-serif font-semibold text-base leading-snug" style={{ color: "#F5F0E8" }}>
            {product.name}
            {product.flavor && (
              <span className="font-sans font-normal text-sm ml-1" style={{ color: "rgba(245,240,232,0.5)" }}>— {product.flavor}</span>
            )}
          </h3>
          {product.description && (
            <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "rgba(245,240,232,0.4)" }}>{product.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold" style={{ color: "#F5F0E8" }}>{formatPrice(product.pricePerUnit)}</span>
            <span className="text-xs ml-1" style={{ color: "rgba(245,240,232,0.4)" }}>/ {product.unit}</span>
          </div>
          {batchOpen !== undefined && (
            isSoldOut ? (
              <span className="text-xs text-red-500 font-medium">Épuisé</span>
            ) : batchOpen ? (
              <button
                onClick={() => onAdd?.(product)}
                className="btn-primary py-2 px-4 text-sm"
              >
                + Ajouter
              </button>
            ) : (
              <span className="text-xs italic" style={{ color: "rgba(245,240,232,0.4)" }}>Prochaine fournée</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
