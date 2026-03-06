"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/currency";

interface CartBarProps {
  onOpen: () => void;
}

export default function CartBar({ onOpen }: CartBarProps) {
  const totalItems = useCart((s) => s.totalItems());
  const totalPrice = useCart((s) => s.totalPrice());

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 p-4 bg-white border-t border-cream-dark shadow-lg animate-slide-up">
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-between bg-brown text-cream rounded-xl px-5 py-4 hover:bg-brown-light transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="bg-terracotta text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
          <span className="font-medium text-sm">Voir mon panier</span>
        </div>
        <span className="font-bold">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
}
