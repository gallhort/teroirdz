import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function NouveauProduitPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif font-bold text-brown mb-6">Nouveau produit</h1>
      <div className="card p-6">
        <ProductForm />
      </div>
    </div>
  );
}
