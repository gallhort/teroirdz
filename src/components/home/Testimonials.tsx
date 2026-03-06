const testimonials = [
  {
    name: "Karima B.",
    text: "La dinde fumée au miel-moutarde est absolument délicieuse. Je recommande à toute ma famille !",
    stars: 5,
  },
  {
    name: "Mehdi A.",
    text: "Le système de fournée est super pratique. On commande, on attend avec impatience, et c'est toujours frais à la livraison.",
    stars: 5,
  },
  {
    name: "Sarah L.",
    text: "Le saumon fumé citron-poivre est un régal. Et le thiéboudiène maison, un vrai voyage gustatif !",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-brown px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream">Ce que disent nos clients</h2>
          <p className="text-sand mt-3">Des produits qui parlent d&apos;eux-mêmes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-brown-light rounded-2xl p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-terracotta text-lg">★</span>
                ))}
              </div>
              <p className="text-sand text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-cream font-medium text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
