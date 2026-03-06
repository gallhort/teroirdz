"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { CATEGORIES } from "@/types";
import Image from "next/image";

type ProductData = {
  id?: string;
  name?: string;
  category?: string;
  flavor?: string | null;
  description?: string | null;
  pricePerUnit?: number;
  unit?: string;
  image?: string | null;
  isAvailable?: boolean;
  maxQuantityPerBatch?: number | null;
};

export default function ProductForm({ product }: { product?: ProductData }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image ?? null);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    category: product?.category ?? CATEGORIES[0],
    flavor: product?.flavor ?? "",
    description: product?.description ?? "",
    pricePerUnit: product?.pricePerUnit ?? "",
    unit: product?.unit ?? "100g",
    isAvailable: product?.isAvailable ?? true,
    maxQuantityPerBatch: product?.maxQuantityPerBatch ?? "",
    image: product?.image ?? "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (res.ok) {
        setForm((f) => ({ ...f, image: json.url }));
        setImagePreview(json.url);
        toast.success("Image uploadée !");
      } else {
        toast.error(json.error ?? "Erreur upload");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      pricePerUnit: parseFloat(String(form.pricePerUnit)),
      maxQuantityPerBatch: form.maxQuantityPerBatch ? parseInt(String(form.maxQuantityPerBatch)) : null,
      flavor: form.flavor || undefined,
      description: form.description || undefined,
    };

    const method = product?.id ? "PATCH" : "POST";
    const url = product?.id ? `/api/produits/${product.id}` : "/api/produits";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(product?.id ? "Produit mis à jour !" : "Produit créé !");
        router.push("/admin/produits");
        router.refresh();
      } else {
        const j = await res.json();
        toast.error(j.error ?? "Erreur");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nom du produit *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Variante / saveur (optionnel)"
          placeholder="ex: Miel-moutarde, Citron-poivre"
          value={form.flavor}
          onChange={(e) => setForm({ ...form, flavor: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Catégorie *</label>
        <select
          className="input-field"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <Textarea
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Prix *"
          type="number"
          step="0.01"
          min="0"
          value={form.pricePerUnit}
          onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value as unknown as number })}
          required
        />
        <Input
          label="Unité *"
          placeholder="100g, pièce, plateau"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          required
        />
        <Input
          label="Max par fournée"
          type="number"
          min="1"
          placeholder="Illimité"
          value={form.maxQuantityPerBatch ?? ""}
          onChange={(e) => setForm({ ...form, maxQuantityPerBatch: e.target.value as unknown as number })}
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="label">Photo du produit</label>
        <div className="flex items-start gap-4">
          {imagePreview && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={imagePreview} alt="Aperçu" fill className="object-cover" sizes="96px" />
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="block text-sm text-brown-light file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cream-dark file:text-brown file:font-medium hover:file:bg-sand"
            />
            {uploading && <p className="text-xs text-brown-light mt-1">Upload en cours…</p>}
            <p className="text-xs text-brown-light mt-1">JPEG, PNG ou WebP — max 5 Mo</p>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.isAvailable}
          onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
          className="accent-terracotta w-4 h-4"
        />
        <span className="text-sm text-brown font-medium">Produit disponible</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">
          Annuler
        </button>
        <Button type="submit" loading={loading} className="flex-1">
          {product?.id ? "Mettre à jour" : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
