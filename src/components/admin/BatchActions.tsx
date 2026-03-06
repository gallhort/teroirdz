"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { BatchStatus, BATCH_STATUS_LABELS } from "@/types";
import Link from "next/link";

const TRANSITIONS: Record<BatchStatus, { to: BatchStatus; label: string }[]> = {
  draft: [{ to: "open", label: "Ouvrir" }],
  open: [{ to: "closed", label: "Fermer les commandes" }],
  closed: [
    { to: "open", label: "Rouvrir" },
    { to: "delivered", label: "Marquer livré" },
  ],
  delivered: [],
};

export default function BatchActions({
  batchId,
  currentStatus,
}: {
  batchId: string;
  currentStatus: BatchStatus;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const handleTransition = async (to: BatchStatus) => {
    setLoading(to);
    try {
      const res = await fetch(`/api/fournees/${batchId}/statut`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: to }),
      });
      if (!res.ok) {
        const j = await res.json();
        toast.error(j.error ?? "Erreur");
      } else {
        toast.success(`Statut mis à jour : ${BATCH_STATUS_LABELS[to]}`);
        router.refresh();
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(null);
    }
  };

  const actions = TRANSITIONS[currentStatus] ?? [];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Link
        href={`/admin/fournees/${batchId}`}
        className="btn-secondary text-sm py-1.5 px-3"
      >
        Détails
      </Link>
      {actions.map((action) => (
        <button
          key={action.to}
          onClick={() => handleTransition(action.to)}
          disabled={loading !== null}
          className={`text-sm py-1.5 px-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
            action.to === "open"
              ? "bg-green-600 text-white hover:bg-green-700"
              : action.to === "closed"
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading === action.to ? "…" : action.label}
        </button>
      ))}
    </div>
  );
}
