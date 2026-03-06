const steps = [
  {
    num: "01",
    icon: "🛒",
    title: "Parcourez le catalogue",
    desc: "Consultez nos produits artisanaux et choisissez vos favoris pendant la fenêtre de commande.",
  },
  {
    num: "02",
    icon: "📝",
    title: "Passez votre commande",
    desc: "Remplissez le formulaire avec vos coordonnées. Aucun compte requis, paiement à la livraison.",
  },
  {
    num: "03",
    icon: "👨‍🍳",
    title: "Nous préparons",
    desc: "On fabrique exactement ce que vous avez commandé, en petite quantité, pour une fraîcheur maximale.",
  },
  {
    num: "04",
    icon: "🚚",
    title: "Vous recevez",
    desc: "Livraison ou retrait à la date annoncée. Vous réglez en espèces à la réception.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle mx-auto text-center">
            Un système simple et transparent. Vous commandez, on produit pour vous.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative text-center">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-sand" />
              )}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream border-2 border-sand text-3xl mb-4">
                {step.icon}
                <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <h3 className="font-serif font-semibold text-brown text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-brown-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
