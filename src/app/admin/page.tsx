import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { formatDateFr } from "@/lib/date";
import { BatchStatusBadge, OrderStatusBadge } from "@/components/ui/Badge";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [activeBatch, todayOrders, recentOrders, pendingCount] =
    await Promise.all([
      prisma.batch.findFirst({
        where: { status: "open" },
        include: { _count: { select: { orders: true } } },
      }),
      prisma.order.findMany({
        where: { createdAt: { gte: today } },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { batch: { select: { name: true } } },
      }),
      prisma.order.count({ where: { status: "pending" } }),
    ]);

  const todayRevenue = todayOrders.reduce(
    (sum, o) => sum + Number(o.totalPrice),
    0
  );

  const batchRevenue = activeBatch
    ? await prisma.order
        .aggregate({
          where: { batchId: activeBatch.id, status: { notIn: ["cancelled"] } },
          _sum: { totalPrice: true },
        })
        .then((r) => Number(r._sum.totalPrice ?? 0))
    : 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-xs text-brown-light uppercase tracking-wider">Commandes aujourd&apos;hui</p>
          <p className="text-3xl font-bold text-brown mt-1">{todayOrders.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-brown-light uppercase tracking-wider">CA aujourd&apos;hui</p>
          <p className="text-2xl font-bold text-terracotta mt-1">{formatPrice(todayRevenue)}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-brown-light uppercase tracking-wider">En attente</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">{pendingCount}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-brown-light uppercase tracking-wider">CA fournée actuelle</p>
          <p className="text-2xl font-bold text-terracotta mt-1">{formatPrice(batchRevenue)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active batch */}
        <div className="card p-6">
          <h2 className="font-serif font-bold text-brown mb-4">Fournée en cours</h2>
          {activeBatch ? (
            <div>
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-brown">{activeBatch.name}</p>
                <BatchStatusBadge status={activeBatch.status} />
              </div>
              <p className="text-sm text-brown-light mt-2">
                {activeBatch._count.orders} commande{activeBatch._count.orders !== 1 ? "s" : ""}
              </p>
              {activeBatch.orderCloseAt && (
                <p className="text-sm text-brown-light">
                  Ferme le {formatDateFr(activeBatch.orderCloseAt)}
                </p>
              )}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/admin/fournees/${activeBatch.id}`}
                  className="btn-secondary text-center text-sm py-2"
                >
                  Voir les commandes
                </Link>
                <form action={`/api/fournees/${activeBatch.id}/statut`} method="POST">
                  <Link
                    href={`/admin/fournees/${activeBatch.id}`}
                    className="block btn-secondary text-center text-sm py-2 border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    Fermer la fournée
                  </Link>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-brown-light text-sm mb-4">Aucune fournée ouverte</p>
              <Link href="/admin/fournees/nouvelle" className="btn-primary text-sm">
                + Créer une fournée
              </Link>
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-brown">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-sm text-terracotta hover:underline">
              Toutes →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-brown-light text-sm text-center py-4">Aucune commande</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/commandes/${order.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-cream-light transition-colors"
                >
                  <div>
                    <p className="font-medium text-brown text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-brown-light">{order.customerName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-brown">{formatPrice(order.totalPrice)}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          { href: "/admin/fournees/nouvelle", label: "+ Nouvelle fournée", icon: "🗓️" },
          { href: "/admin/commandes", label: "Commandes", icon: "📋" },
          { href: "/admin/produits", label: "Produits", icon: "🥩" },
          { href: "/admin/clients", label: "Clients", icon: "👥" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="card p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-1">{link.icon}</div>
            <p className="text-sm font-medium text-brown">{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
