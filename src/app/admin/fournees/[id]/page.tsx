import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { formatDateFr, formatDateTimeFr } from "@/lib/date";
import { formatPrice } from "@/lib/currency";
import { BatchStatusBadge, OrderStatusBadge } from "@/components/ui/Badge";
import BatchActions from "@/components/admin/BatchActions";

export default async function FourneeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const batch = await prisma.batch.findUnique({
    where: { id: params.id },
    include: {
      products: { include: { product: true } },
      orders: {
        include: { items: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!batch) notFound();

  // Production summary
  const productionMap = new Map<string, { productName: string; unit: string; totalQty: number }>();
  for (const order of batch.orders) {
    if (order.status === "cancelled") continue;
    for (const item of order.items) {
      const existing = productionMap.get(item.productId);
      if (existing) {
        existing.totalQty += item.quantity;
      } else {
        productionMap.set(item.productId, {
          productName: item.productName,
          unit: "",
          totalQty: item.quantity,
        });
      }
    }
  }
  for (const bp of batch.products) {
    const entry = productionMap.get(bp.productId);
    if (entry) entry.unit = bp.product.unit;
  }
  const productionSummary = Array.from(productionMap.values()).sort((a, b) =>
    a.productName.localeCompare(b.productName)
  );

  const totalRevenue = batch.orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.totalPrice), 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-serif font-bold text-brown">{batch.name}</h1>
            <BatchStatusBadge status={batch.status} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-brown-light">
            {batch.orderOpenAt && <span>Ouvert le {formatDateFr(batch.orderOpenAt)}</span>}
            {batch.orderCloseAt && <span>· Ferme le {formatDateFr(batch.orderCloseAt)}</span>}
            {batch.deliveryDate && <span>· Livraison le {formatDateFr(batch.deliveryDate)}</span>}
          </div>
        </div>
        <BatchActions batchId={batch.id} currentStatus={batch.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-xs text-brown-light uppercase tracking-wider">Commandes</p>
          <p className="text-3xl font-bold text-brown mt-1">{batch.orders.length}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-brown-light uppercase tracking-wider">CA total</p>
          <p className="text-2xl font-bold text-terracotta mt-1">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-brown-light uppercase tracking-wider">Produits</p>
          <p className="text-3xl font-bold text-brown mt-1">{batch.products.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Production summary */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4 no-print">
            <h2 className="font-serif font-bold text-brown">Résumé de production</h2>
            <button
              onClick={() => window.print()}
              className="text-sm text-terracotta hover:underline"
            >
              🖨️ Imprimer
            </button>
          </div>
          <div className="print-only mb-4">
            <h2 className="font-serif font-bold text-brown text-xl">{batch.name} — Résumé de production</h2>
            <p className="text-sm text-gray-600">Livraison : {formatDateFr(batch.deliveryDate)}</p>
          </div>
          {productionSummary.length === 0 ? (
            <p className="text-brown-light text-sm">Aucune commande validée.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left py-2 text-brown-light font-medium">Produit</th>
                  <th className="text-right py-2 text-brown-light font-medium">Quantité</th>
                </tr>
              </thead>
              <tbody>
                {productionSummary.map((item) => (
                  <tr key={item.productName} className="border-b border-cream-dark/50">
                    <td className="py-2 text-brown">{item.productName}</td>
                    <td className="py-2 text-right font-bold text-brown">
                      {item.totalQty} {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Products in batch */}
        <div className="card p-6">
          <h2 className="font-serif font-bold text-brown mb-4">Produits ({batch.products.length})</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {batch.products.map((bp) => (
              <div key={bp.id} className="flex justify-between text-sm">
                <span className="text-brown">
                  {bp.product.name}{bp.product.flavor ? ` (${bp.product.flavor})` : ""}
                </span>
                <span className="text-brown-light">{formatPrice(bp.product.pricePerUnit)} / {bp.product.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-bold text-brown">Commandes ({batch.orders.length})</h2>
          <Link href={`/admin/commandes?batchId=${batch.id}`} className="text-sm text-terracotta hover:underline">
            Filtrer dans commandes →
          </Link>
        </div>
        {batch.orders.length === 0 ? (
          <p className="text-brown-light text-sm">Aucune commande reçue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark text-left">
                  <th className="pb-3 text-brown-light font-medium">N°</th>
                  <th className="pb-3 text-brown-light font-medium">Client</th>
                  <th className="pb-3 text-brown-light font-medium">Téléphone</th>
                  <th className="pb-3 text-brown-light font-medium text-right">Total</th>
                  <th className="pb-3 text-brown-light font-medium">Statut</th>
                  <th className="pb-3 text-brown-light font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {batch.orders.map((order) => (
                  <tr key={order.id} className="border-b border-cream-dark/50 hover:bg-cream-light">
                    <td className="py-3">
                      <Link href={`/admin/commandes/${order.id}`} className="text-terracotta hover:underline font-medium">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 text-brown">{order.customerName}</td>
                    <td className="py-3 text-brown-light">{order.customerPhone}</td>
                    <td className="py-3 text-right font-bold text-brown">{formatPrice(order.totalPrice)}</td>
                    <td className="py-3"><OrderStatusBadge status={order.status} /></td>
                    <td className="py-3 text-brown-light">{formatDateTimeFr(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
