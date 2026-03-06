"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { OrderStatus, ORDER_STATUS_LABELS } from "@/types";

const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["ready", "cancelled"],
  ready: ["delivered"],
  delivered: [],
  cancelled: [],
};

export default function OrderStatusChanger({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const nextStatuses = NEXT_STATUSES[currentStatus] ?? [];

  const handleChange = async (status: OrderStatus) => {
    setLoading(status);
    try {
      const res = await fetch(`/api/commandes/${orderId}/statut`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const j = await res.json();
        toast.error(j.error ?? "Erreur");
      } else {
        toast.success(`Commande marquée : ${ORDER_STATUS_LABELS[status]}`);
        router.refresh();
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(null);
    }
  };

  if (nextStatuses.length === 0) {
    return (
      <p className="text-sm text-brown-light italic">Aucune action disponible.</p>
    );
  }

  const buttonColors: Partial<Record<OrderStatus, string>> = {
    confirmed: "bg-blue-600 hover:bg-blue-700",
    ready: "bg-green-600 hover:bg-green-700",
    delivered: "bg-gray-600 hover:bg-gray-700",
    cancelled: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {nextStatuses.map((status) => (
        <button
          key={status}
          onClick={() => handleChange(status)}
          disabled={loading !== null}
          className={`text-sm px-4 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 ${buttonColors[status] ?? "bg-brown hover:bg-brown-light"}`}
        >
          {loading === status ? "…" : ORDER_STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
