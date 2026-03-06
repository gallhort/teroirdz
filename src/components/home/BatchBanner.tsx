"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateFr } from "@/lib/date";
import { ActiveBatch } from "@/types";

export default function BatchBanner() {
  const [batch, setBatch] = useState<ActiveBatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fournees/active")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setBatch(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!batch) {
    return (
      <section className="bg-cream-dark py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-brown font-medium">
            🕒 Pas de fournée en cours — inscrivez-vous par email pour être notifié de la prochaine.
          </p>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "contact@terodz.dz"}?subject=Notification fournée`}
            className="mt-3 inline-block text-sm text-terracotta underline"
          >
            M&apos;inscrire pour la prochaine fournée →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-terracotta text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-terracotta-light text-xs font-semibold uppercase tracking-widest mb-1">
            🔥 Fournée en cours
          </p>
          <h2 className="text-xl md:text-2xl font-serif font-bold">{batch.name}</h2>
          <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-90">
            {batch.orderCloseAt && (
              <span>Commandes jusqu&apos;au {formatDateFr(batch.orderCloseAt)}</span>
            )}
            {batch.deliveryDate && (
              <span>• Livraison le {formatDateFr(batch.deliveryDate)}</span>
            )}
          </div>
        </div>
        <Link
          href="/commander"
          className="whitespace-nowrap bg-white text-terracotta font-bold px-6 py-3 rounded-xl hover:bg-cream transition-colors text-sm"
        >
          Commander maintenant →
        </Link>
      </div>
    </section>
  );
}
