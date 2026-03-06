import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { formatDateTimeFr } from "@/lib/date";
import { OrderStatusBadge } from "@/components/ui/Badge";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const email = decodeURIComponent(params.id);

  const orders = await prisma.order.findMany({
    where: { customerEmail: { equals: email, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      batch: { select: { name: true } },
    },
  });

  if (orders.length === 0) notFound();

  const customer = orders[0];
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.totalPrice), 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Link href="/admin/clients" className="text-sm text-brown-light hover:text-brown">
          ← Clients
        </Link>
        <h1 className="text-2xl font-serif font-bold text-brown">{customer.customerName}</h1>
      </div>

      {/* Customer info */}
      <div className="card p-6 mb-6">
        <h2 className="font-serif font-bold text-brown mb-4">Informations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-brown-light mb-1">Email</p>
            <a href={`mailto:${customer.customerEmail}`} className="text-terracotta hover:underline break-all">
              {customer.customerEmail}
            </a>
          </div>
          <div>
            <p className="text-brown-light mb-1">Téléphone</p>
            <a href={`tel:${customer.customerPhone}`} className="text-terracotta font-medium">
              {customer.customerPhone}
            </a>
          </div>
          <div>
            <p className="text-brown-light mb-1">Commandes</p>
            <p className="font-bold text-brown text-lg">{orders.length}</p>
          </div>
          <div>
            <p className="text-brown-light mb-1">Total dépensé</p>
            <p className="font-bold text-terracotta text-lg">{formatPrice(totalSpent)}</p>
          </div>
        </div>
        {customer.customerAddress && (
          <div className="mt-4 pt-4 border-t border-cream-dark text-sm">
            <p className="text-brown-light mb-1">Adresse</p>
            <p className="text-brown">{customer.customerAddress}</p>
          </div>
        )}
      </div>

      {/* Order history */}
      <div className="card p-6">
        <h2 className="font-serif font-bold text-brown mb-4">Historique des commandes</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-cream-dark rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/commandes/${order.id}`}
                    className="font-bold text-terracotta hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="text-right">
                  <p className="font-bold text-brown">{formatPrice(order.totalPrice)}</p>
                  <p className="text-xs text-brown-light">{formatDateTimeFr(order.createdAt)}</p>
                </div>
              </div>
              <p className="text-xs text-brown-light mb-2">{order.batch.name}</p>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-brown-light">
                    <span>{item.productName} × {item.quantity}</span>
                    <span>{formatPrice(Number(item.unitPrice) * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
