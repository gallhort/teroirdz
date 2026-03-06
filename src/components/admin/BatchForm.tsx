"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { CATEGORIES } from "@/types";

type Product = {
  id: string;
  name: string;
  flavor?: string | null;
  category: string;
  pricePerUnit: number;
  unit: string;
};

export default function BatchForm({ products }: { products: Product[] }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(products.map((p) => p.id))
  );

  const [form, setForm] = useState({
    name: "",
    orderOpenAt: "",
    orderCloseAt: "",
    deliveryDate: "",
    notes: "",
  });

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.size === 0) {
      toast.error("Sélectionnez au moins un produit.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/fournees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          orderOpenAt: form.orderOpenAt ? new Date(form.orderOpenAt).toISOString() : null,
          orderCloseAt: form.orderCloseAt ? new Date(form.orderCloseAt).toISOString() : null,
          deliveryDate: form.deliveryDate ? new Date(form.deliveryDate).toISOString() : null,
          productIds: Array.from(selectedProducts),
        }),
      });
      if (!res.ok) {
        const j = await res.json();
        toast.error(j.error ?? "Erreur lors de la création");
      } else {
        toast.success("Fournée créée avec succès !");
        router.push("/admin/fournees");
        router.refresh();
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nom de la fournée *"
        placeholder="ex: Fournée #2 — Été 2026"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Ouverture commandes</label>
          <input
            type="datetime-local"
            className="input-field"
            value={form.orderOpenAt}
            onChange={(e) => setForm({ ...form, orderOpenAt: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Fermeture commandes</label>
          <input
            type="datetime-local"
            className="input-field"
            value={form.orderCloseAt}
            onChange={(e) => setForm({ ...form, orderCloseAt: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Date de livraison</label>
          <input
            type="datetime-local"
            className="input-field"
            value={form.deliveryDate}
            onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
          />
        </div>
      </div>

      <Textarea
        label="Notes (optionnel)"
        placeholder="Informations supplémentaires pour cette fournée…"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label mb-0">Produits disponibles dans cette fournée *</label>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedProducts(new Set(products.map((p) => p.id)))}
              className="text-terracotta hover:underline"
            >
              Tout sélectionner
            </button>
            <span className="text-sand">|</span>
            <button
              type="button"
              onClick={() => setSelectedProducts(new Set())}
              className="text-brown-light hover:underline"
            >
              Tout désélectionner
            </button>
          </div>
        </div>

        {CATEGORIES.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat);
          if (catProducts.length === 0) return null;
          return (
            <div key={cat} className="mb-4">
              <p className="text-xs font-semibold text-brown-light uppercase tracking-wider mb-2">{cat}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {catProducts.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProducts.has(p.id)
                        ? "bg-cream border-terracotta"
                        : "bg-white border-sand hover:border-brown-light"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(p.id)}
                      onChange={() => toggleProduct(p.id)}
                      className="accent-terracotta"
                    />
                    <span className="text-sm text-brown flex-1">
                      {p.name}{p.flavor ? ` (${p.flavor})` : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex-1"
        >
          Annuler
        </button>
        <Button type="submit" loading={loading} className="flex-1">
          Créer la fournée
        </Button>
      </div>
    </form>
  );
}
