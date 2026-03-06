import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-brown/70" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-terracotta-light text-sm font-semibold uppercase tracking-widest mb-4">
            Artisanal · Naturel · Authentique
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream leading-tight text-balance">
            Charcuterie artisanale &amp; saveurs du monde
          </h1>
          <p className="mt-6 text-lg text-sand leading-relaxed max-w-xl">
            Produits fabriqués à la main, en petites fournées, pour vous garantir fraîcheur et qualité. Commandez pendant la fenêtre de la fournée en cours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/commander"
              className="btn-primary text-base px-8 py-4"
            >
              Commander maintenant →
            </Link>
            <Link
              href="/produits"
              className="btn-secondary text-base px-8 py-4"
            >
              Voir nos produits
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sand text-sm">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Paiement à la livraison</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Fait maison</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Sans conservateurs artificiels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
