import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { formatDateFr } from "@/lib/date";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";

async function ConfirmationContent({ orderNumber }: { orderNumber: string }) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      batch: { select: { name: true, deliveryDate: true } },
    },
  });

  if (!order) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">❓</div>
        <h1 className="section-title">Commande introuvable</h1>
        <p className="section-subtitle">Le numéro de commande &ldquo;{orderNumber}&rdquo; n&apos;existe pas.</p>
        <Link href="/" className="btn-primary mt-6 inline-block">Retour à l&apos;accueil</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl" style={{ background: "rgba(201,169,110,0.15)" }}>
          ✅
        </div>
        <h1 className="text-3xl font-serif font-bold" style={{ color: "#F5F0E8" }}>Commande confirmée !</h1>
        <p className="mt-2" style={{ color: "rgba(245,240,232,0.5)" }}>Un email de confirmation vous a été envoyé.</p>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Numéro de commande</span>
          <span className="font-bold text-lg" style={{ color: "#C9A96E" }}>{order.orderNumber}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Fournée</span>
          <span className="font-medium" style={{ color: "#F5F0E8" }}>{order.batch.name}</span>
        </div>
        {order.batch.deliveryDate && (
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Livraison prévue</span>
            <span className="font-medium" style={{ color: "#F5F0E8" }}>{formatDateFr(order.batch.deliveryDate)}</span>
          </div>
        )}
      </div>

      <div className="card p-6 mb-6">
        <h2 className="font-serif font-semibold mb-4" style={{ color: "#F5F0E8" }}>Votre commande</h2>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span style={{ color: "rgba(245,240,232,0.7)" }}>{item.productName} × {item.quantity}</span>
              <span className="font-medium" style={{ color: "#F5F0E8" }}>{formatPrice(Number(item.unitPrice) * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 flex justify-between font-bold" style={{ borderTop: "1px solid #2a2a2a" }}>
          <span style={{ color: "#F5F0E8" }}>Total</span>
          <span className="text-lg" style={{ color: "#C9A96E" }}>{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <div className="rounded-xl p-4 mb-8" style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
        <p className="font-semibold mb-1" style={{ color: "#C9A96E" }}>💰 Paiement à la livraison</p>
        <p className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
          Merci de prévoir le montant exact en espèces. Vous serez contacté par téléphone ou email pour organiser la livraison.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-secondary flex-1 text-center">
          Retour à l&apos;accueil
        </Link>
        <Link href="/produits" className="btn-primary flex-1 text-center">
          Découvrir d&apos;autres produits
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { commande?: string };
}) {
  const orderNumber = searchParams.commande ?? "";

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full" style={{ borderColor: "#C9A96E", borderTopColor: "transparent" }} />
          </div>
        }>
          <ConfirmationContent orderNumber={orderNumber} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
