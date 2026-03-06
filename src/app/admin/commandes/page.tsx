import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { formatDateTimeFr } from "@/lib/date";
import { OrderStatusBadge } from "@/components/ui/Badge";
import { ORDER_STATUS_LABELS, OrderStatus } from "@/types";

export default async function CommandesPage({
  searchParams,
}: {
  searchParams: { batchId?: string; status?: string; q?: string; page?: string };
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const page = parseInt(searchParams.page ?? "1");
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (searchParams.batchId) where.batchId = searchParams.batchId;
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.q) {
    where.OR = [
      { customerName: { contains: searchParams.q, mode: "insensitive" } },
      { customerPhone: { contains: searchParams.q } },
      { orderNumber: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const [orders, total, batches] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { batch: { select: { name: true } } },
    }),
    prisma.order.count({ where }),
    prisma.batch.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, name: true } }),
  ]);

  const statuses: OrderStatus[] = ["pending", "confirmed", "ready", "delivered", "cancelled"];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown">Commandes</h1>
          <p className="text-brown-light text-sm">{total} commande{total !== 1 ? "s" : ""} au total</p>
        </div>
      </div>

      {/* Filters */}
      <form className="card p-4 mb-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Rechercher par nom, tél, n° commande…"
          className="input-field flex-1 min-w-48"
        />
        <select name="batchId" defaultValue={searchParams.batchId ?? ""} className="input-field w-auto">
          <option value="">Toutes les fournées</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <select name="status" defaultValue={searchParams.status ?? ""} className="input-field w-auto">
          <option value="">Tous les statuts</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary px-5">Filtrer</button>
        <Link href="/admin/commandes" className="btn-secondary px-5">Réinitialiser</Link>
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-brown-light">Aucune commande trouvée.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-cream-dark">
                <tr>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">N°</th>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Client</th>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Téléphone</th>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Fournée</th>
                  <th className="px-4 py-3 text-right text-brown-light font-medium">Total</th>
                  <th className="px-4 py-3 text-center text-brown-light font-medium">Statut</th>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-cream-dark/50 hover:bg-cream-light/50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/commandes/${order.id}`} className="text-terracotta hover:underline font-medium">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-brown font-medium">{order.customerName}</td>
                    <td className="px-4 py-3 text-brown-light">{order.customerPhone}</td>
                    <td className="px-4 py-3 text-brown-light text-xs">{order.batch.name}</td>
                    <td className="px-4 py-3 text-right font-bold text-brown">{formatPrice(order.totalPrice)}</td>
                    <td className="px-4 py-3 text-center">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-brown-light text-xs whitespace-nowrap">
                      {formatDateTimeFr(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="flex items-center justify-between p-4 border-t border-cream-dark">
            <p className="text-sm text-brown-light">
              {(page - 1) * limit + 1}–{Math.min(page * limit, total)} sur {total}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/commandes?page=${page - 1}&${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                  className="btn-secondary text-sm py-1.5 px-3"
                >
                  ← Précédent
                </Link>
              )}
              {page * limit < total && (
                <Link
                  href={`/admin/commandes?page=${page + 1}&${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                  className="btn-secondary text-sm py-1.5 px-3"
                >
                  Suivant →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
