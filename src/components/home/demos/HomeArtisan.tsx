import Link from "next/link";
import BatchBanner from "@/components/home/BatchBanner";
import Footer from "@/components/layout/Footer";

const categories = [
  { name: "Charcuterie boeuf", slug: "Charcuterie bœuf", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80", count: "12 produits" },
  { name: "Charcuterie volaille", slug: "Charcuterie volaille", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80", count: "8 produits" },
  { name: "Poisson fume", slug: "Poisson fumé", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", count: "5 produits" },
  { name: "Asie & Afrique", slug: "Asie / Afrique", image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80", count: "4 produits" },
];

const avantages = [
  { icon: "🛡️", title: "Qualite garantie", desc: "Matieres premieres selectionnees, sans conservateur, sans additif." },
  { icon: "🕒", title: "Fournee par fournee", desc: "Commandes ouvertes par periode limitee pour une fraicheur maximale." },
  { icon: "🏠", title: "Livraison a domicile", desc: "Reception confortable chez vous, paiement a la livraison en especes." },
];

export default function HomeArtisan() {
  return (
    <div className="bg-white">
      {/* Hero split */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-white order-2 lg:order-1">
          <span className="inline-block bg-terracotta/10 text-terracotta text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6 w-fit">
            Artisan algerien
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            La charcuterie<br />
            <span className="text-terracotta">autrement.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
            Terodz repense la charcuterie artisanale : des produits fabriques a la commande, livres frais, payes a la reception. Simple, honnete, excellent.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/commander" className="bg-terracotta text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-terracotta-dark transition-colors">
              Commander maintenant
            </Link>
            <Link href="/produits" className="text-gray-900 px-8 py-4 rounded-xl font-semibold text-sm border border-gray-200 hover:border-gray-400 transition-colors">
              Voir le catalogue
            </Link>
          </div>
          <div className="mt-12 flex gap-8 text-sm text-gray-500">
            <div><span className="font-bold text-2xl text-gray-900 block">29+</span>Produits</div>
            <div><span className="font-bold text-2xl text-gray-900 block">100%</span>Artisanal</div>
            <div><span className="font-bold text-2xl text-gray-900 block">0</span>Conservateurs</div>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 min-h-[50vh] lg:min-h-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/5" />
          <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-lg p-4 text-sm">
            <p className="font-semibold text-gray-900">Fournee #12 — ouverte</p>
            <p className="text-gray-400 text-xs mt-0.5">Commandes jusqu&apos;au 15 mars</p>
          </div>
        </div>
      </section>

      {/* BatchBanner */}
      <BatchBanner />

      {/* Avantages */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avantages.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="font-semibold text-gray-900 text-base mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-gray-900">Nos categories</h2>
              <p className="text-gray-500 mt-2">Du terroir a l&apos;international</p>
            </div>
            <Link href="/produits" className="text-terracotta font-medium text-sm hover:underline">Voir tout →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produits?categorie=${encodeURIComponent(cat.slug)}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-white/60 text-xs">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ca marche */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Comment ca marche ?</h2>
          <p className="text-gray-500 mb-14">Simple comme bonjour</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Choisissez", desc: "Parcourez notre catalogue et selectionnez vos produits" },
              { step: "02", title: "Commandez", desc: "Remplissez le formulaire et validez votre panier" },
              { step: "03", title: "On prepare", desc: "Votre commande est preparee frais pour la prochaine fournee" },
              { step: "04", title: "Livraison", desc: "Reception a domicile, paiement en especes a la porte" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta font-bold text-sm flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-terracotta text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Commencez maintenant</h2>
          <p className="text-white/80 mb-8">Paiement a la livraison — aucun risque</p>
          <Link href="/commander" className="bg-white text-terracotta px-10 py-4 rounded-xl font-bold hover:bg-cream transition-colors inline-block">
            Voir la fournee en cours →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
