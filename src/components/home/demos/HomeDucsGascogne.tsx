import Link from "next/link";
import Footer from "@/components/layout/Footer";

const categories = [
  { name: "Charcuterie boeuf", slug: "Charcuterie bœuf", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80" },
  { name: "Charcuterie volaille", slug: "Charcuterie volaille", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80" },
  { name: "Poisson fume", slug: "Poisson fumé", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" },
  { name: "Asie & Afrique", slug: "Asie / Afrique", image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80" },
];

const avis = [
  { nom: "Leila K.", note: 5, texte: "Des produits d&apos;une qualite irreprochable. Je commande a chaque fournee !" },
  { nom: "Mourad S.", note: 5, texte: "Le saumon fume est exceptionnel. Meilleur que tout ce que j&apos;ai goute." },
  { nom: "Farida B.", note: 5, texte: "Livraison ponctuelle, produits frais. Je recommande sans hesitation." },
];

export default function HomeDucsGascogne() {
  return (
    <div className="bg-white">
      {/* Bandeau heritage */}
      <div className="bg-[#2fb5d2] text-white text-center py-2.5 text-xs font-medium tracking-widest uppercase">
        Artisan algerien depuis 2020 — Paiement a la livraison
      </div>

      {/* Hero */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2fb5d2]/10 text-[#2fb5d2] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              <span className="text-base">🏆</span> Charcuterie artisanale premium
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Celebrez le meilleur<br />
              <span className="text-[#2fb5d2]">du terroir</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
              Des produits d&apos;exception fabriques artisanalement, livres frais a votre porte. La gastronomie algerienne dans toute sa splendeur.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/commander" className="bg-[#2fb5d2] text-white px-8 py-4 rounded-lg font-semibold text-sm hover:bg-[#25a2bd] transition-colors">
                Decouvrir nos produits
              </Link>
              <Link href="/produits" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold text-sm hover:border-gray-400 transition-colors">
                Voir le catalogue
              </Link>
            </div>
          </div>
          <div className="relative">
            <div
              className="h-[450px] bg-cover bg-center rounded-2xl shadow-xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80')" }}
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Coffrets disponibles</p>
                  <p className="text-gray-400 text-xs">Idees cadeaux gastronomiques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau fournee */}
      <section className="bg-[#2fb5d2] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Fournee en cours</p>
            <h2 className="text-xl font-bold">Fournee Printemps 2026 — Commandes ouvertes</h2>
          </div>
          <Link href="/commander" className="bg-white text-[#2fb5d2] font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm whitespace-nowrap">
            Commander maintenant →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2fb5d2] text-xs font-semibold uppercase tracking-widest mb-2">Notre selection</p>
            <h2 className="font-serif text-4xl font-bold text-gray-900">Nos univers gastronomiques</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produits?categorie=${encodeURIComponent(cat.slug)}`}
                className="group block"
              >
                <div className="relative h-52 overflow-hidden rounded-xl mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/20 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#2fb5d2] transition-colors">{cat.name}</h3>
                <p className="text-[#2fb5d2] text-xs mt-1">Decouvrir →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Badges confiance */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🔒", title: "Paiement securise", desc: "Especes a la livraison uniquement" },
            { icon: "🚚", title: "Livraison domicile", desc: "Sur tout Alger" },
            { icon: "✅", title: "Qualite garantie", desc: "Produits frais et artisanaux" },
            { icon: "📞", title: "Service client", desc: "Disponible par telephone" },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <div className="text-3xl mb-2">{b.icon}</div>
              <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Avis */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-900">Avis de nos clients</h2>
            <p className="text-gray-400 mt-2">Ils ont commande, ils en parlent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avis.map((a) => (
              <div key={a.nom} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: a.note }).map((_, i) => (
                    <span key={i} className="text-[#2fb5d2] text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-4" dangerouslySetInnerHTML={{ __html: `&ldquo;${a.texte}&rdquo;` }} />
                <p className="font-semibold text-gray-900 text-sm">{a.nom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage badge */}
      <section className="py-16 px-4 bg-[#2fb5d2] text-white text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-3">Notre engagement</p>
          <h2 className="font-serif text-3xl font-bold mb-4">Artisan depuis 2020</h2>
          <p className="text-white/80 mb-8">Terodz est ne de la passion pour les saveurs authentiques. Chaque fournee est une promesse de qualite.</p>
          <Link href="/commander" className="bg-white text-[#2fb5d2] font-bold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors inline-block">
            Commander maintenant
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
