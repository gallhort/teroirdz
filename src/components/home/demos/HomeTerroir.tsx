import Link from "next/link";
import BatchBanner from "@/components/home/BatchBanner";
import Footer from "@/components/layout/Footer";

const categories = [
  { name: "Charcuterie boeuf", slug: "Charcuterie bœuf", emoji: "🥩", desc: "Seche, salami, chorizo, pastrami…", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80" },
  { name: "Charcuterie volaille", slug: "Charcuterie volaille", emoji: "🍗", desc: "Dinde fumee, magret, bacon…", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&q=80" },
  { name: "Poisson fume", slug: "Poisson fumé", emoji: "🐟", desc: "Saumon, truite, maquereau…", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80" },
  { name: "Asie & Afrique", slug: "Asie / Afrique", emoji: "🍱", desc: "Sushi, nems, yassa, tajine…", image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=500&q=80" },
];

const testimonials = [
  { name: "Amina B.", text: "Une qualite exceptionnelle, les produits sont frais et savoureux. Je recommande vivement !", stars: 5 },
  { name: "Karim D.", text: "Livraison rapide et produits conformes a la description. La charcuterie de boeuf est excellente.", stars: 5 },
  { name: "Sarah M.", text: "Le saumon fume est divin. Une vraie decouverte gastronomique a Alger.", stars: 5 },
];

export default function HomeTerroir() {
  return (
    <div className="bg-[#FAF6ED]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/70 via-brown/60 to-brown/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-terracotta text-xs font-semibold uppercase tracking-[0.3em] mb-4">Artisan depuis 2020</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-cream leading-tight mb-6">
            L&apos;Art de la<br />Charcuterie
          </h1>
          <p className="text-sand text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Fait a la main, livre chez vous. Des produits d&apos;exception fabriques en petites quantites pour vous garantir fraicheur et authenticite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/commander" className="bg-terracotta text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-terracotta-dark transition-colors">
              Commander maintenant
            </Link>
            <Link href="/produits" className="border border-cream/40 text-cream px-8 py-4 rounded-xl font-semibold text-sm hover:bg-cream/10 transition-colors">
              Decouvrir nos produits
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-cream/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* BatchBanner */}
      <BatchBanner />

      {/* Savoir-faire */}
      <section className="py-24 px-4 bg-[#FAF6ED]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-brown mb-4">Notre savoir-faire</h2>
            <p className="text-brown-light max-w-xl mx-auto">Chaque produit est le fruit d&apos;un travail minutieux, du choix des matieres premieres jusqu&apos;a la livraison.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🌿", title: "Selection", desc: "Nous selectionnons uniquement les meilleures matieres premieres, issues d&apos;elevages respectueux." },
              { icon: "🔪", title: "Fabrication", desc: "Chaque piece est preparea la main, selon des recettes transmises et perfectionnees avec passion." },
              { icon: "📦", title: "Livraison", desc: "Vos commandes sont preparees par fournee et livrees fraiches, directement chez vous." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-cream">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-brown mb-3">{item.title}</h3>
                <p className="text-brown-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-brown text-center mb-14">Nos categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produits?categorie=${encodeURIComponent(cat.slug)}`}
                className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  <div className="absolute inset-0 bg-brown/40 group-hover:bg-brown/25 transition-colors" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-3xl">{cat.emoji}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-semibold text-brown text-base mb-1">{cat.name}</h3>
                  <p className="text-sm text-brown-light">{cat.desc}</p>
                  <span className="mt-2 inline-block text-terracotta text-sm font-medium group-hover:underline">Voir →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Origin section */}
      <section className="py-20 px-4 bg-[#FAF6ED]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-3">Notre histoire</p>
            <h2 className="font-serif text-4xl font-bold text-brown mb-6">Origine & authenticite</h2>
            <p className="text-brown-light leading-relaxed mb-6">
              Nee de la passion pour les saveurs authentiques, Terodz est une aventure artisanale qui celebre le meilleur de la charcuterie traditionnelle. Chaque recette est le fruit d&apos;annees d&apos;experimentation et d&apos;un amour profond pour les produits de qualite.
            </p>
            <p className="text-brown-light leading-relaxed mb-8">
              Nous travaillons en petites quantites, par fournee, pour vous garantir la fraicheur et l&apos;excellence que vous meritez. Pas de stock, pas de compromis.
            </p>
            <Link href="/produits" className="inline-flex items-center gap-2 bg-brown text-cream px-6 py-3 rounded-xl font-medium text-sm hover:bg-brown/90 transition-colors">
              Decouvrir nos produits
            </Link>
          </div>
          <div className="relative">
            <div
              className="h-80 lg:h-96 rounded-2xl bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559181567-c3190aae2b2d?w=600&q=80')" }}
            />
            <div className="absolute -bottom-4 -left-4 bg-terracotta text-white p-4 rounded-xl shadow-lg">
              <p className="font-serif font-bold text-2xl">100%</p>
              <p className="text-xs text-terracotta-light">Fait main</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-brown text-center mb-14">Ce que disent nos clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-cream">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-terracotta text-sm">★</span>
                  ))}
                </div>
                <p className="text-brown-light text-sm leading-relaxed italic mb-4">&quot;{t.text}&quot;</p>
                <p className="font-semibold text-brown text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brown text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-cream mb-4">Pret a commander ?</h2>
          <p className="text-sand mb-8">Rejoignez la prochaine fournee et decouvrez nos produits d&apos;exception.</p>
          <Link href="/commander" className="bg-terracotta text-white px-10 py-4 rounded-xl font-semibold hover:bg-terracotta-dark transition-colors inline-block">
            Commander maintenant
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
