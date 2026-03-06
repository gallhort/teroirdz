import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProduitPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif font-bold text-brown mb-6">Modifier le produit</h1>
      <div className="card p-6">
        <ProductForm
          product={{
            ...product,
            pricePerUnit: Number(product.pricePerUnit),
          }}
        />
      </div>
    </div>
  );
}
