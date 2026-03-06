import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { formatPrice } from "@/lib/currency";
import { formatDateTimeFr, formatDateFr } from "@/lib/date";
import { OrderStatusBadge } from "@/components/ui/Badge";
import OrderStatusChanger from "@/components/admin/OrderStatusChanger";
import Link from "next/link";

export default async function CommandeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { product: { select: { unit: true } } } },
      batch: true,
    },
  });

  if (!order) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Link href="/admin/commandes" className="text-sm text-brown-light hover:text-brown">
          ← Commandes
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-serif font-bold text-brown">{order.orderNumber}</h1>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Customer info */}
        <div className="card p-6">
          <h2 className="font-serif font-bold text-brown mb-4">Informations client</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-brown-light w-24">Nom</dt>
              <dd className="font-medium text-brown">{order.customerName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-brown-light w-24">Téléphone</dt>
              <dd>
                <a href={`tel:${order.customerPhone}`} className="text-terracotta font-medium">
                  {order.customerPhone}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-brown-light w-24">Email</dt>
              <dd>
                <a href={`mailto:${order.customerEmail}`} className="text-terracotta break-all">
                  {order.customerEmail}
                </a>
              </dd>
            </div>
            {order.customerAddress && (
              <div className="flex gap-2">
                <dt className="text-brown-light w-24">Adresse</dt>
                <dd className="text-brown">{order.customerAddress}</dd>
              </div>
            )}
            {order.notes && (
              <div className="flex gap-2">
                <dt className="text-brown-light w-24">Notes</dt>
                <dd className="text-orange-700 italic">{order.notes}</dd>
              </div>
            )}
          </dl>
          <div className="mt-4 pt-4 border-t border-cream-dark">
            <Link
              href={`/admin/clients/${encodeURIComponent(order.customerEmail)}`}
              className="text-sm text-terracotta hover:underline"
            >
              Voir historique client →
            </Link>
          </div>
        </div>

        {/* Order info */}
        <div className="card p-6">
          <h2 className="font-serif font-bold text-brown mb-4">Détails de la commande</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-brown-light w-24">Fournée</dt>
              <dd>
                <Link href={`/admin/fournees/${order.batchId}`} className="text-terracotta hover:underline">
                  {order.batch.name}
                </Link>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-brown-light w-24">Passée le</dt>
              <dd className="text-brown">{formatDateTimeFr(order.createdAt)}</dd>
            </div>
            {order.batch.deliveryDate && (
              <div className="flex gap-2">
                <dt className="text-brown-light w-24">Livraison</dt>
                <dd className="text-brown font-medium">{formatDateFr(order.batch.deliveryDate)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-4 pt-4 border-t border-cream-dark">
            <p className="text-xs text-brown-light uppercase tracking-wider mb-2">Changer le statut</p>
            <OrderStatusChanger orderId={order.id} currentStatus={order.status} />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="card p-6">
        <h2 className="font-serif font-bold text-brown mb-4">Articles commandés</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cream-dark text-left">
              <th className="pb-2 text-brown-light font-medium">Produit</th>
              <th className="pb-2 text-center text-brown-light font-medium">Qté</th>
              <th className="pb-2 text-right text-brown-light font-medium">Prix unitaire</th>
              <th className="pb-2 text-right text-brown-light font-medium">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-cream-dark/50 py-2">
                <td className="py-3 text-brown">{item.productName}</td>
                <td className="py-3 text-center text-brown">
                  {item.quantity} {item.product?.unit}
                </td>
                <td className="py-3 text-right text-brown-light">{formatPrice(item.unitPrice)}</td>
                <td className="py-3 text-right font-bold text-brown">
                  {formatPrice(Number(item.unitPrice) * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4 text-right font-bold text-brown">Total</td>
              <td className="pt-4 text-right font-bold text-terracotta text-lg">
                {formatPrice(order.totalPrice)}
              </td>
            </tr>
          </tfoot>
        </table>
        <p className="text-xs text-brown-light mt-4">💰 Paiement à la livraison (espèces)</p>
      </div>
    </div>
  );
}
