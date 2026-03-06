"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  batchId: string | null;
  addItem: (item: CartItem, batchId: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      batchId: null,

      addItem: (item, batchId) => {
        set((state) => {
          if (state.batchId && state.batchId !== batchId) {
            // Different batch — reset cart
            return { items: [item], batchId };
          }
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, qty: i.qty + item.qty } : i
              ),
              batchId,
            };
          }
          return { items: [...state.items, item], batchId };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], batchId: null }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0),
    }),
    {
      name: "terodz-cart",
    }
  )
);
