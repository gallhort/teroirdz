"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/currency";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const schema = z.object({
  customerName: z.string().min(2, "Nom requis"),
  customerPhone: z.string().min(8, "Téléphone invalide"),
  customerEmail: z.string().email("Email invalide"),
  customerAddress: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

export default function OrderForm({
  batchId,
  onClose,
}: {
  batchId: string;
  onClose: () => void;
}) {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      toast.error("Votre panier est vide.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          batchId,
          items: items.map((i) => ({ productId: i.productId, quantity: i.qty })),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Erreur lors de la commande.");
        return;
      }

      clearCart();
      router.push(`/confirmation?commande=${encodeURIComponent(json.orderNumber)}`);
    } catch {
      toast.error("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto" style={{ background: "#0A0A0A" }}>
      <div className="flex items-center justify-between px-4 py-4 sticky top-0" style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }}>
        <h2 className="font-serif text-lg font-bold" style={{ color: "#F5F0E8" }}>Mon panier</h2>
        <button onClick={onClose} className="p-2" style={{ color: "rgba(245,240,232,0.5)" }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Cart items summary */}
        <div className="rounded-xl p-4 mb-6" style={{ background: "#111", border: "1px solid #1e1e1e" }}>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: "#C9A96E" }}>
            Récapitulatif ({totalItems()} article{totalItems() > 1 ? "s" : ""})
          </h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span style={{ color: "rgba(245,240,232,0.7)" }}>
                  {item.name}{item.flavor ? ` (${item.flavor})` : ""} × {item.qty}
                </span>
                <span className="font-medium" style={{ color: "#F5F0E8" }}>{formatPrice(item.qty * item.unitPrice)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 flex justify-between font-bold" style={{ borderTop: "1px solid #2a2a2a" }}>
            <span style={{ color: "#F5F0E8" }}>Total</span>
            <span className="text-lg" style={{ color: "#C9A96E" }}>{formatPrice(totalPrice())}</span>
          </div>
          <p className="text-xs mt-2" style={{ color: "rgba(245,240,232,0.4)" }}>💰 Paiement à la livraison (espèces)</p>
        </div>

        {/* Customer form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="font-serif font-bold text-lg" style={{ color: "#F5F0E8" }}>Vos coordonnées</h3>

          <Input
            label="Nom complet *"
            placeholder="Prénom Nom"
            error={errors.customerName?.message}
            {...register("customerName")}
          />
          <Input
            label="Téléphone *"
            type="tel"
            placeholder="0555 000 000"
            error={errors.customerPhone?.message}
            {...register("customerPhone")}
          />
          <Input
            label="Email *"
            type="email"
            placeholder="vous@email.com"
            error={errors.customerEmail?.message}
            {...register("customerEmail")}
          />
          <Input
            label="Adresse de livraison"
            placeholder="Rue, quartier, ville…"
            {...register("customerAddress")}
          />
          <Textarea
            label="Notes ou demandes particulières"
            placeholder="Ex : livraison le matin, sans gluten si possible…"
            {...register("notes")}
          />

          <Button type="submit" loading={loading} size="lg" className="w-full mt-6">
            Confirmer la commande
          </Button>
          <p className="text-xs text-center" style={{ color: "rgba(245,240,232,0.4)" }}>
            En confirmant, vous acceptez d&apos;être contacté pour la livraison.
          </p>
        </form>
      </div>
    </div>
  );
}
