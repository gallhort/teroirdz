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
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
          ✅
        </div>
        <h1 className="text-3xl font-serif font-bold text-brown">Commande confirmée !</h1>
        <p className="text-brown-light mt-2">Un email de confirmation vous a été envoyé.</p>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-brown-light text-sm">Numéro de commande</span>
          <span className="font-bold text-brown text-lg">{order.orderNumber}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-brown-light text-sm">Fournée</span>
          <span className="text-brown font-medium">{order.batch.name}</span>
        </div>
        {order.batch.deliveryDate && (
          <div className="flex items-center justify-between">
            <span className="text-brown-light text-sm">Livraison prévue</span>
            <span className="text-brown font-medium">{formatDateFr(order.batch.deliveryDate)}</span>
          </div>
        )}
      </div>

      <div className="card p-6 mb-6">
        <h2 className="font-serif font-semibold text-brown mb-4">Votre commande</h2>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-brown">{item.productName} × {item.quantity}</span>
              <span className="font-medium text-brown">{formatPrice(Number(item.unitPrice) * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-cream-dark mt-4 pt-4 flex justify-between font-bold">
          <span className="text-brown">Total</span>
          <span className="text-terracotta text-lg">{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <div className="bg-terracotta/10 border border-terracotta/30 rounded-xl p-4 mb-8">
        <p className="font-semibold text-brown mb-1">💰 Paiement à la livraison</p>
        <p className="text-sm text-brown-light">
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
            <div className="animate-spin h-10 w-10 border-4 border-terracotta border-t-transparent rounded-full" />
          </div>
        }>
          <ConfirmationContent orderNumber={orderNumber} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
