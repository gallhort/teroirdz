import Link from "next/link";

const categories = [
  {
    name: "Charcuterie bœuf",
    slug: "Charcuterie bœuf",
    emoji: "🥩",
    desc: "Séché, salami, chorizo, pastrami…",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80",
  },
  {
    name: "Charcuterie volaille",
    slug: "Charcuterie volaille",
    emoji: "🍗",
    desc: "Dinde fumée, magret, bacon…",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80",
  },
  {
    name: "Poisson fumé",
    slug: "Poisson fumé",
    emoji: "🐟",
    desc: "Saumon, truite, maquereau…",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
  },
  {
    name: "Asie & Afrique",
    slug: "Asie / Afrique",
    emoji: "🍱",
    desc: "Sushi, nems, yassa, tajine…",
    image:
      "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-cream px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-title">Nos catégories</h2>
          <p className="section-subtitle mx-auto text-center">
            Du terroir à l&apos;international, tous nos produits sont fabriqués avec soin.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/produits?categorie=${encodeURIComponent(cat.slug)}`}
              className="group card hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="absolute inset-0 bg-brown/40 group-hover:bg-brown/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  {cat.emoji}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif font-semibold text-brown text-base">{cat.name}</h3>
                <p className="text-sm text-brown-light mt-1">{cat.desc}</p>
                <span className="mt-3 inline-block text-terracotta text-sm font-medium group-hover:underline">
                  Voir les produits →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
