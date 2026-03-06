import Link from "next/link";
import Footer from "@/components/layout/Footer";

const meilleuresVentes = [
  { name: "Saucisson de boeuf seche", cat: "Boeuf", price: "890 DA", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
  { name: "Dinde fumee classic", cat: "Volaille", price: "750 DA", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80" },
  { name: "Saumon fume tranche", cat: "Poisson", price: "1 200 DA", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" },
  { name: "Assortiment Asie", cat: "Asie / Afrique", price: "1 400 DA", image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80" },
];

const specialites = [
  { emoji: "🥩", title: "Charcuterie de boeuf", desc: "Saucissons, chorizo, salami — elabores selon des recettes traditionnelles revisitees." },
  { emoji: "🍗", title: "Charcuterie de volaille", desc: "Dinde fumee, magret, bacon halal — des alternatives legeres et savoureuses." },
  { emoji: "🐟", title: "Poissons fumes", desc: "Saumon Atlantique, truite, maquereau — fumes lentement pour une texture parfaite." },
];

export default function HomeMaisonVerot() {
  return (
    <div className="bg-white font-sans">
      {/* Hero slider-style (static avec overlay peche) */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#ecc3b2]/80 via-[#ecc3b2]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-xl">
            <p className="text-[#8B4513] text-xs font-semibold uppercase tracking-[0.4em] mb-4">Charcuterie artisanale</p>
            <h1 className="text-6xl md:text-7xl font-bold text-[#222] leading-tight mb-6" style={{ fontWeight: 800 }}>
              La charcuterie<br />
              comme elle<br />
              <span className="text-[#8B4513]">doit etre.</span>
            </h1>
            <p className="text-[#444] text-lg leading-relaxed mb-10">
              Fabriquee a la main, par fournee, livree chez vous. Aucun compromis sur la qualite.
            </p>
            <div className="flex gap-4">
              <Link href="/commander" className="bg-[#222] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#333] transition-colors">
                Commander
              </Link>
              <Link href="/produits" className="border-2 border-[#222] text-[#222] px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#222] hover:text-white transition-colors">
                Catalogue
              </Link>
            </div>
          </div>
        </div>
        {/* Slide indicators decoratifs */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i === 0 ? "w-8 bg-[#8B4513]" : "w-4 bg-[#8B4513]/30"}`} />
          ))}
        </div>
      </section>

      {/* Bandeau fournee */}
      <div className="bg-[#ecc3b2] py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <p className="text-[#8B4513] font-semibold text-sm">
            Fournee Printemps 2026 ouverte — Commandez avant le 15 mars
          </p>
          <Link href="/commander" className="bg-[#8B4513] text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#7a3b0f] transition-colors whitespace-nowrap">
            Commander →
          </Link>
        </div>
      </div>

      {/* Meilleures ventes */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#222] mb-3" style={{ fontWeight: 800 }}>Nos meilleures ventes</h2>
            <p className="text-gray-400">Les preferes de nos clients</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meilleuresVentes.map((p) => (
              <Link key={p.name} href="/produits" className="group block">
                <div className="relative overflow-hidden mb-4 aspect-square bg-[#f5f0eb]">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                  <div className="absolute top-3 left-3 bg-[#ecc3b2] text-[#8B4513] text-xs font-semibold px-2 py-1">
                    {p.cat}
                  </div>
                </div>
                <h3 className="font-semibold text-[#222] text-sm mb-1">{p.name}</h3>
                <p className="text-[#8B4513] font-bold text-sm">{p.price}</p>
                <p className="text-gray-400 text-xs group-hover:text-[#8B4513] transition-colors mt-1">Commander →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialites */}
      <section className="py-20 px-4 bg-[#faf7f4]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#222] mb-3" style={{ fontWeight: 800 }}>Nos specialites</h2>
            <p className="text-gray-400">Un univers de saveurs artisanales</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialites.map((s) => (
              <div key={s.title} className="text-center p-8 bg-white border border-[#ecc3b2]/50">
                <div className="text-5xl mb-5">{s.emoji}</div>
                <h3 className="font-bold text-[#222] text-base mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing artisanal */}
      <section className="py-20 px-4 bg-[#222] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#ecc3b2] text-xs font-semibold uppercase tracking-widest mb-4">Notre philosophie</p>
            <h2 className="text-4xl font-bold text-white mb-6" style={{ fontWeight: 800 }}>
              Artisanal de A a Z
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Chez Terodz, rien n&apos;est laisse au hasard. Chaque etape — de la selection des matieres premieres a la livraison — est maitrisee pour vous offrir une qualite constante et exceptionnelle.
            </p>
            <div className="space-y-4">
              {["Matieres premieres selectionnees", "Preparation artisanale sans conservateur", "Systeme fournee pour fraicheur maximale", "Livraison directe chez vous"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ecc3b2] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="h-80 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80')" }}
          />
        </div>
      </section>

      {/* Newsletter-like CTA */}
      <section className="py-20 px-4 bg-[#ecc3b2] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-[#222] mb-4" style={{ fontWeight: 800 }}>Rejoignez la prochaine fournee</h2>
          <p className="text-[#8B4513] mb-8">Commandes limitees — places disponibles maintenant</p>
          <Link href="/commander" className="bg-[#222] text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-[#333] transition-colors inline-block text-sm">
            Commander maintenant
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
