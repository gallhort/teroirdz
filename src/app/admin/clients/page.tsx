import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import { formatDateFr } from "@/lib/date";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const where: Record<string, unknown> = {};
  if (searchParams.q) {
    where.OR = [
      { customerName: { contains: searchParams.q, mode: "insensitive" } },
      { customerPhone: { contains: searchParams.q } },
      { customerEmail: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    select: {
      customerEmail: true,
      customerName: true,
      customerPhone: true,
      totalPrice: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Deduplicate
  const clientMap = new Map<string, {
    email: string;
    name: string;
    phone: string;
    orderCount: number;
    totalSpent: number;
    lastOrderAt: Date;
  }>();

  for (const order of orders) {
    const key = order.customerEmail.toLowerCase();
    const ex = clientMap.get(key);
    if (ex) {
      ex.orderCount++;
      ex.totalSpent += Number(order.totalPrice);
      if (order.createdAt > ex.lastOrderAt) ex.lastOrderAt = order.createdAt;
    } else {
      clientMap.set(key, {
        email: order.customerEmail,
        name: order.customerName,
        phone: order.customerPhone,
        orderCount: 1,
        totalSpent: Number(order.totalPrice),
        lastOrderAt: order.createdAt,
      });
    }
  }

  const clients = Array.from(clientMap.values()).sort(
    (a, b) => b.lastOrderAt.getTime() - a.lastOrderAt.getTime()
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown">Clients</h1>
          <p className="text-brown-light text-sm">{clients.length} client{clients.length !== 1 ? "s" : ""} unique{clients.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Search */}
      <form className="card p-4 mb-6 flex gap-3">
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Rechercher par nom, email, téléphone…"
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary px-5">Rechercher</button>
        {searchParams.q && <Link href="/admin/clients" className="btn-secondary px-5">Effacer</Link>}
      </form>

      <div className="card overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-brown-light">Aucun client trouvé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-cream-dark">
                <tr>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Client</th>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Téléphone</th>
                  <th className="px-4 py-3 text-center text-brown-light font-medium">Commandes</th>
                  <th className="px-4 py-3 text-right text-brown-light font-medium">Total dépensé</th>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Dernière commande</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.email} className="border-b border-cream-dark/50 hover:bg-cream-light/50">
                    <td className="px-4 py-3">
                      <div>
                        <Link
                          href={`/admin/clients/${encodeURIComponent(client.email)}`}
                          className="font-medium text-brown hover:text-terracotta"
                        >
                          {client.name}
                        </Link>
                        <p className="text-xs text-brown-light">{client.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brown-light">{client.phone}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-brown">{client.orderCount}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-terracotta">
                      {formatPrice(client.totalSpent)}
                    </td>
                    <td className="px-4 py-3 text-brown-light text-xs">
                      {formatDateFr(client.lastOrderAt)}
                    </td>
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
