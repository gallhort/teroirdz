import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";
import Image from "next/image";
import ProductToggle from "@/components/admin/ProductToggle";

export default async function ProduitsAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }, { flavor: "asc" }],
  });

  const grouped = products.reduce<Record<string, typeof products>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-brown">Produits</h1>
          <p className="text-brown-light text-sm">{products.length} produit{products.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/produits/nouveau" className="btn-primary">
          + Nouveau produit
        </Link>
      </div>

      {Object.entries(grouped).map(([category, prods]) => (
        <div key={category} className="mb-8">
          <h2 className="font-serif font-semibold text-brown text-lg mb-3 border-b border-cream-dark pb-2">
            {category}
          </h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-cream-dark">
                <tr>
                  <th className="px-4 py-3 text-left text-brown-light font-medium">Produit</th>
                  <th className="px-4 py-3 text-right text-brown-light font-medium">Prix</th>
                  <th className="px-4 py-3 text-center text-brown-light font-medium">Dispo</th>
                  <th className="px-4 py-3 text-center text-brown-light font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prods.map((p) => (
                  <tr key={p.id} className={`border-b border-cream-dark/50 ${!p.isAvailable ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image && (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-brown">{p.name}{p.flavor ? ` (${p.flavor})` : ""}</p>
                          <p className="text-xs text-brown-light">/ {p.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-brown">{formatPrice(p.pricePerUnit)}</td>
                    <td className="px-4 py-3 text-center">
                      <ProductToggle productId={p.id} isAvailable={p.isAvailable} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/admin/produits/${p.id}`}
                        className="text-sm text-terracotta hover:underline"
                      >
                        Modifier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
