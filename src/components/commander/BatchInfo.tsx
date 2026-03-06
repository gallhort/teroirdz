import { formatDateFr } from "@/lib/date";

interface BatchInfoProps {
  name: string;
  orderCloseAt?: string | Date | null;
  deliveryDate?: string | Date | null;
  notes?: string | null;
}

export default function BatchInfo({ name, orderCloseAt, deliveryDate, notes }: BatchInfoProps) {
  return (
    <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">🔥</span>
        <div>
          <h2 className="font-serif font-bold" style={{ color: "#F5F0E8" }}>{name}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
            {orderCloseAt && (
              <span>Commandes jusqu&apos;au <strong style={{ color: "#C9A96E" }}>{formatDateFr(orderCloseAt)}</strong></span>
            )}
            {deliveryDate && (
              <span>Livraison le <strong style={{ color: "#C9A96E" }}>{formatDateFr(deliveryDate)}</strong></span>
            )}
          </div>
          {notes && <p className="mt-2 text-sm italic" style={{ color: "rgba(245,240,232,0.4)" }}>{notes}</p>}
        </div>
      </div>
    </div>
  );
}
