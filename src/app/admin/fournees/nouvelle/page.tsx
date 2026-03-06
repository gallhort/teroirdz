import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BatchForm from "@/components/admin/BatchForm";

export default async function NouvelleFourneePage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif font-bold text-brown mb-6">Nouvelle fournée</h1>
      <div className="card p-6">
        <BatchForm products={products.map((p) => ({ ...p, pricePerUnit: Number(p.pricePerUnit) }))} />
      </div>
    </div>
  );
}
