"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

export default function ProductToggle({
  productId,
  isAvailable,
}: {
  productId: string;
  isAvailable: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(isAvailable);
  const router = useRouter();
  const toast = useToast();

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produits/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !current }),
      });
      if (res.ok) {
        setCurrent(!current);
        router.refresh();
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
        current ? "bg-green-500" : "bg-gray-300"
      }`}
      title={current ? "Désactiver" : "Activer"}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          current ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
