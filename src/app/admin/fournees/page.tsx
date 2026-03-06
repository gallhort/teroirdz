import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDateFr } from "@/lib/date";
import { BatchStatusBadge } from "@/components/ui/Badge";
import BatchActions from "@/components/admin/BatchActions";

export default async function FourneesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const batches = await prisma.batch.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true, products: true } } },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown">Fournées</h1>
          <p className="text-brown-light text-sm mt-1">{batches.length} fournée{batches.length !== 1 ? "s" : ""} au total</p>
        </div>
        <Link href="/admin/fournees/nouvelle" className="btn-primary">
          + Nouvelle fournée
        </Link>
      </div>

      {batches.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🗓️</div>
          <p className="text-brown font-medium">Aucune fournée pour l&apos;instant</p>
          <Link href="/admin/fournees/nouvelle" className="btn-primary mt-4 inline-block">
            Créer la première fournée
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {batches.map((batch) => (
            <div key={batch.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href={`/admin/fournees/${batch.id}`}
                      className="font-serif font-bold text-brown hover:text-terracotta transition-colors"
                    >
                      {batch.name}
                    </Link>
                    <BatchStatusBadge status={batch.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-brown-light">
                    <span>{batch._count.orders} commande{batch._count.orders !== 1 ? "s" : ""}</span>
                    <span>·</span>
                    <span>{batch._count.products} produit{batch._count.products !== 1 ? "s" : ""}</span>
                    {batch.orderCloseAt && <span>· Ferme le {formatDateFr(batch.orderCloseAt)}</span>}
                    {batch.deliveryDate && <span>· Livraison le {formatDateFr(batch.deliveryDate)}</span>}
                  </div>
                </div>
                <BatchActions batchId={batch.id} currentStatus={batch.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
