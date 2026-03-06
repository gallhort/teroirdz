import Link from "next/link";
import BatchBanner from "@/components/home/BatchBanner";
import Footer from "@/components/layout/Footer";

const produits = [
  { name: "Saucisson de boeuf", desc: "Un classique reinterprete avec du boeuf premium, seche lentement pendant 3 semaines.", price: "890 DA", unit: "200g", emoji: "🥩" },
  { name: "Dinde fumee aux herbes", desc: "Une dinde marinee 24h dans nos epices secretes, puis fumee au bois de hetre.", price: "750 DA", unit: "200g", emoji: "🍗" },
  { name: "Saumon fume artisanal", desc: "Un saumon Atlantique fume selon notre methode traditionnelle, tranche a la main.", price: "1 200 DA", unit: "200g", emoji: "🐟" },
];

export default function HomeMaison() {
  return (
    <div className="bg-[#F5EDD6]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F0E]/90 via-[#3B1F0E]/40 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <p className="text-terracotta text-xs font-semibold uppercase tracking-[0.3em] mb-4">Fondee en 2020</p>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-cream leading-none mb-6">
              La Maison<br />Terodz
            </h1>
            <p className="text-sand text-xl leading-relaxed mb-10 max-w-lg">
              Une histoire de passion, de savoir-faire transmis et d&apos;amour pour les produits authentiques. Bienvenue dans notre maison.
            </p>
            <Link href="/commander" className="inline-flex items-center gap-3 bg-terracotta text-white px-8 py-4 font-medium hover:bg-terracotta-dark transition-colors">
              Entrer dans la maison
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-24 px-4 bg-[#F5EDD6]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">Notre histoire</p>
              <h2 className="font-serif text-4xl font-bold text-brown mb-6">Une passion transmise</h2>
              <p className="text-brown-light leading-relaxed mb-6 text-lg">
                Tout a commence dans une petite cuisine, avec des recettes familiares et une obsession pour la qualite. Terodz est nee de la conviction que la vraie charcuterie artisanale merite d&apos;etre accessible a tous.
              </p>
              <blockquote className="border-l-4 border-terracotta pl-6 italic text-brown font-serif text-lg">
                &ldquo;Chaque produit que je fabrique, je le fais comme si c&apos;etait pour ma propre table.&rdquo;
              </blockquote>
              <p className="text-brown-light text-sm mt-3">— Le fondateur de Terodz</p>
            </div>
            <div className="space-y-4">
              {[
                { year: "2020", event: "Premiers essais dans la cuisine familiale" },
                { year: "2021", event: "Premiere fournee officielle — 20 clients" },
                { year: "2022", event: "Expansion a la charcuterie de volaille et poisson" },
                { year: "2023", event: "Lancement des saveurs Asie & Afrique" },
                { year: "2026", event: "Plus de 500 clients fideles dans Alger" },
              ].map((item, i) => (
                <div key={item.year} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 text-right">
                    <p className="font-serif font-bold text-terracotta text-sm">{item.year}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-terracotta mt-1.5 flex-shrink-0" />
                    <p className="text-brown-light text-sm">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BatchBanner */}
      <BatchBanner />

      {/* Nos recettes */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-3">Le meilleur de notre atelier</p>
            <h2 className="font-serif text-4xl font-bold text-brown">Nos recettes phares</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {produits.map((p) => (
              <div key={p.name} className="bg-[#FAF6ED] rounded-2xl overflow-hidden border border-cream">
                <div className="h-48 bg-gradient-to-br from-brown/10 to-terracotta/10 flex items-center justify-center text-7xl">
                  {p.emoji}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-brown mb-2">{p.name}</h3>
                  <p className="text-brown-light text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-terracotta">{p.price}</p>
                      <p className="text-brown-light text-xs">{p.unit}</p>
                    </div>
                    <Link href="/commander" className="bg-brown text-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-brown/80 transition-colors">
                      Commander
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* La region */}
      <section className="py-24 px-4 bg-brown text-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className="h-72 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80')" }}
          />
          <div>
            <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">Made in Algeria</p>
            <h2 className="font-serif text-4xl font-bold text-cream mb-6">Racines locales, saveurs universelles</h2>
            <p className="text-sand leading-relaxed mb-6">
              Terodz puise ses inspirations dans les traditions culinaires algeriennes et les enrichit d&apos;influences internationales — Asie, Afrique, Europe — pour creer une charcuterie unique en son genre.
            </p>
            <div className="flex gap-6 text-center">
              <div>
                <p className="font-serif text-3xl font-bold text-terracotta">Alger</p>
                <p className="text-sand text-xs">Zone de livraison</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-terracotta">4</p>
                <p className="text-sand text-xs">Univers culinaires</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#F5EDD6] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-brown mb-4">Rejoignez la famille Terodz</h2>
          <p className="text-brown-light mb-8">Commandez pour la prochaine fournee et decouvrez la difference.</p>
          <Link href="/commander" className="bg-terracotta text-white px-10 py-4 rounded-xl font-semibold hover:bg-terracotta-dark transition-colors inline-block">
            Commander maintenant
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
