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
    <div className="fixed bottom-0 inset-x-0 z-30 p-4 shadow-lg animate-slide-up" style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-between rounded-xl px-5 py-4 transition-colors"
        style={{ background: "#C9A96E", color: "#0A0A0A" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.2)", color: "#0A0A0A" }}>
            {totalItems}
          </span>
          <span className="font-medium text-sm">Voir mon panier</span>
        </div>
        <span className="font-bold">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
}
