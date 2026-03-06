"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/currency";
import { CATEGORIES } from "@/types";
import type { ActiveBatch } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BatchInfo from "@/components/commander/BatchInfo";
import QuantitySelector from "@/components/commander/QuantitySelector";
import CartBar from "@/components/commander/CartBar";
import OrderForm from "@/components/commander/OrderForm";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";

export default function CommanderPage() {
  const [batch, setBatch] = useState<ActiveBatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { items, addItem, updateQty } = useCart();

  useEffect(() => {
    fetch("/api/fournees/active")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setBatch(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </>
    );
  }

  if (!batch) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">😴</div>
            <h1 className="section-title">Pas de fournée en cours</h1>
            <p className="section-subtitle mt-3">
              Les commandes ne sont pas ouvertes actuellement. Revenez bientôt ou inscrivez-vous pour être notifié.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryImages: Record<string, string> = {
    "Charcuterie bœuf": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&q=60",
    "Charcuterie volaille": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=60",
    "Poisson fumé": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&q=60",
    "Asie / Afrique": "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=200&q=60",
  };

  const getCartQty = (productId: string) =>
    items.find((i) => i.productId === productId)?.qty ?? 0;

  const handleQtyChange = (product: ActiveBatch["products"][number], qty: number) => {
    if (qty === 0) {
      updateQty(product.id, 0);
    } else {
      const currentQty = getCartQty(product.id);
      if (currentQty === 0) {
        addItem(
          {
            productId: product.id,
            name: product.name,
            flavor: product.flavor,
            unit: product.unit,
            qty,
            unitPrice: product.pricePerUnit,
          },
          batch.id
        );
      } else {
        updateQty(product.id, qty);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <h1 className="section-title mb-2">Commander</h1>
        <BatchInfo
          name={batch.name}
          orderCloseAt={batch.orderCloseAt}
          deliveryDate={batch.deliveryDate}
          notes={batch.notes}
        />

        {CATEGORIES.map((category) => {
          const categoryProducts = batch.products.filter((p) => p.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <h2 className="font-serif font-bold text-xl mb-4 pb-2" style={{ color: "#F5F0E8", borderBottom: "1px solid #1e1e1e" }}>
                {category}
              </h2>
              <div className="space-y-3">
                {categoryProducts.map((product) => {
                  const isSoldOut = product.maxQty !== null && product.orderedQty >= product.maxQty;
                  const available = product.maxQty !== null ? product.maxQty - product.orderedQty : undefined;
                  const qty = getCartQty(product.id);

                  return (
                    <div
                      key={product.id}
                      className={`flex items-center gap-4 rounded-xl p-4 border ${isSoldOut ? "opacity-60" : ""}`}
                      style={{ background: "#111", borderColor: isSoldOut ? "#3a1a1a" : "#1e1e1e" }}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image ?? categoryImages[product.category] ?? ""}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-snug" style={{ color: "#F5F0E8" }}>
                          {product.name}
                          {product.flavor && (
                            <span className="font-normal" style={{ color: "#C9A96E" }}> — {product.flavor}</span>
                          )}
                        </p>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(245,240,232,0.5)" }}>
                          {formatPrice(product.pricePerUnit)} / {product.unit}
                        </p>
                        {available !== undefined && !isSoldOut && (
                          <p className="text-xs text-orange-600 mt-0.5">
                            Plus que {available} {product.unit} disponible{available > 1 ? "s" : ""}
                          </p>
                        )}
                        {isSoldOut && (
                          <p className="text-xs text-red-600 font-medium mt-0.5">
                            Épuisé pour cette fournée
                          </p>
                        )}
                      </div>
                      {!isSoldOut ? (
                        <QuantitySelector
                          value={qty}
                          min={0}
                          max={available}
                          onChange={(newQty) => handleQtyChange(product, newQty)}
                        />
                      ) : (
                        <span className="text-xs text-red-500 flex-shrink-0">Épuisé</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
      <Footer />

      <CartBar onOpen={() => setDrawerOpen(true)} />
      {drawerOpen && (
        <OrderForm batchId={batch.id} onClose={() => setDrawerOpen(false)} />
      )}
    </>
  );
}
