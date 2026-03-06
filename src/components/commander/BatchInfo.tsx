import { formatDateFr } from "@/lib/date";

interface BatchInfoProps {
  name: string;
  orderCloseAt?: string | Date | null;
  deliveryDate?: string | Date | null;
  notes?: string | null;
}

export default function BatchInfo({ name, orderCloseAt, deliveryDate, notes }: BatchInfoProps) {
  return (
    <div className="bg-terracotta/10 border border-terracotta/30 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🔥</span>
        <div>
          <h2 className="font-serif font-bold text-brown">{name}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-brown-light">
            {orderCloseAt && (
              <span>Commandes jusqu&apos;au <strong className="text-brown">{formatDateFr(orderCloseAt)}</strong></span>
            )}
            {deliveryDate && (
              <span>Livraison le <strong className="text-brown">{formatDateFr(deliveryDate)}</strong></span>
            )}
          </div>
          {notes && <p className="mt-2 text-sm text-brown-light italic">{notes}</p>}
        </div>
      </div>
    </div>
  );
}
