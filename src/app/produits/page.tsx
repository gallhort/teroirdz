import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/produits/ProductCard";
import CategoryFilter from "@/components/produits/CategoryFilter";
import Spinner from "@/components/ui/Spinner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos produits",
  description:
    "Découvrez toute notre gamme de charcuteries artisanales, poissons fumés et spécialités du monde.",
};

async function ProductGrid({ categorie }: { categorie?: string }) {
  const products = await prisma.product.findMany({
    where: {
      isAvailable: true,
      ...(categorie ? { category: categorie } : {}),
    },
    orderBy: [{ category: "asc" }, { name: "asc" }, { flavor: "asc" }],
  });

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <p className="text-brown-light">Aucun produit dans cette catégorie.</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            pricePerUnit: Number(product.pricePerUnit),
          }}
        />
      ))}
    </>
  );
}

export default function ProduitsPage({
  searchParams,
}: {
  searchParams: { categorie?: string };
}) {
  const categorie = searchParams.categorie;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="section-title">Nos produits</h1>
          <p className="section-subtitle">
            Tous nos produits sont fabriqués artisanalement, en petites fournées.
          </p>
        </div>

        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Suspense
            fallback={
              <div className="col-span-full flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            }
          >
            <ProductGrid categorie={categorie} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
