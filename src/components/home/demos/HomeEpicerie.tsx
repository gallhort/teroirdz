import Link from "next/link";
import BatchBanner from "@/components/home/BatchBanner";
import Footer from "@/components/layout/Footer";

const signature = [
  { name: "Saucisson de boeuf sele", cat: "Charcuterie bœuf", price: "890 DA / 200g", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
  { name: "Saumon fume maison", cat: "Poisson fume", price: "1 200 DA / 200g", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" },
  { name: "Dinde fumee aux epices", cat: "Charcuterie volaille", price: "750 DA / 200g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80" },
  { name: "Assortiment Asie-Afrique", cat: "Asie / Afrique", price: "1 400 DA / box", image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80" },
];

export default function HomeEpicerie() {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            <p className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.4em] mb-6">Epicerie fine · Artisanal</p>
            <h1 className="font-serif text-6xl md:text-7xl font-bold leading-none mb-6">
              <span className="text-[#C9A96E]">Terodz</span><br />
              <span className="text-[#F5F0E8]">Collection</span><br />
              <span className="text-[#F5F0E8]/50">Prestige</span>
            </h1>
            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-10 max-w-md">
              Une selection d&apos;exception, fabriquee artisanalement pour les palais les plus exigeants.
            </p>
            <div className="flex gap-4">
              <Link href="/commander" className="bg-[#C9A96E] text-[#0A0A0A] px-8 py-4 font-semibold text-sm uppercase tracking-widest hover:bg-[#B8955A] transition-colors">
                Commander
              </Link>
              <Link href="/produits" className="border border-[#C9A96E]/40 text-[#C9A96E] px-8 py-4 font-semibold text-sm uppercase tracking-widest hover:border-[#C9A96E] transition-colors">
                Catalogue
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="h-[500px] bg-cover bg-center rounded-none"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80')" }}
              />
              <div className="absolute -bottom-6 -right-6 border border-[#C9A96E]/30 h-full w-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* BatchBanner dark */}
      <div className="bg-[#C9A96E] text-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-70">Fournee en cours</p>
            <p className="font-serif text-xl font-bold">Fournee Printemps 2026 — Commandes ouvertes</p>
          </div>
          <Link href="/commander" className="whitespace-nowrap bg-[#0A0A0A] text-[#C9A96E] px-6 py-3 font-semibold text-sm uppercase tracking-widest hover:bg-[#111] transition-colors">
            Commander →
          </Link>
        </div>
      </div>

      {/* Produits signature */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-2">Selection exclusive</p>
              <h2 className="font-serif text-4xl font-bold text-[#F5F0E8]">Produits signature</h2>
            </div>
            <Link href="/produits" className="text-[#C9A96E] text-sm uppercase tracking-widest hover:underline">Voir tout →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signature.map((p) => (
              <Link key={p.name} href="/produits" className="group block bg-[#111] border border-[#222] hover:border-[#C9A96E]/40 transition-colors">
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-70"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                </div>
                <div className="p-5">
                  <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-1">{p.cat}</p>
                  <h3 className="font-serif text-base font-semibold text-[#F5F0E8] mb-2">{p.name}</h3>
                  <p className="text-[#F5F0E8]/40 text-sm">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section className="py-24 px-4 bg-[#C9A96E]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0A0A0A]/60 text-xs uppercase tracking-widest mb-4">Notre promesse</p>
          <h2 className="font-serif text-5xl font-bold text-[#0A0A0A] mb-8">L&apos;experience Terodz</h2>
          <p className="text-[#0A0A0A]/70 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Chaque produit est cree avec une exigence absolue : les meilleures matieres premieres, un savoir-faire artisanal, une fraicheur garantie par le systeme de fournee.
          </p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { n: "100%", l: "Fait main" },
              { n: "0", l: "Conservateur" },
              { n: "24h", l: "Fraicheur garantie" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-4xl font-bold text-[#0A0A0A]">{s.n}</p>
                <p className="text-[#0A0A0A]/60 text-sm mt-1 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-4">Rejoignez la fournee</p>
          <h2 className="font-serif text-5xl font-bold text-[#F5F0E8] mb-6">Pret a commander ?</h2>
          <p className="text-[#F5F0E8]/50 mb-10">Places limitees par fournee. Paiement a la livraison.</p>
          <Link href="/commander" className="bg-[#C9A96E] text-[#0A0A0A] px-10 py-5 font-semibold text-sm uppercase tracking-widest hover:bg-[#B8955A] transition-colors inline-block">
            Acceder a la boutique
          </Link>
        </div>
      </section>

      <div className="bg-[#0A0A0A] border-t border-[#222]">
        <Footer />
      </div>
    </div>
  );
}
