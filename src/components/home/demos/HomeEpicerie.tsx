"use client";

import Link from "next/link";
import { useState } from "react";
import BatchBanner from "@/components/home/BatchBanner";
import Footer from "@/components/layout/Footer";

const tabs = [
  {
    id: "charcuterie",
    label: "Charcuterie",
    emoji: "🥩",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1400&q=80",
    tagline: "Boeuf & Volaille",
    desc: "Saucissons, chorizo, dinde fumee — fabriques a la main selon des recettes traditionnelles.",
    produits: [
      { name: "Saucisson de boeuf seche", price: "890 DA / 200g", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", cat: "Charcuterie bœuf" },
      { name: "Chorizo de boeuf maison", price: "950 DA / 200g", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80", cat: "Charcuterie bœuf" },
      { name: "Dinde fumee classique", price: "750 DA / 200g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80", cat: "Charcuterie volaille" },
      { name: "Bacon de dinde fume", price: "820 DA / 200g", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", cat: "Charcuterie volaille" },
    ],
    slug: "Charcuterie bœuf",
  },
  {
    id: "asie-afrique",
    label: "Asie & Afrique",
    emoji: "🍱",
    image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=1400&q=80",
    tagline: "Saveurs du monde",
    desc: "Une invitation au voyage gastronomique — sushi, nems, yassa, brochettes… des saveurs uniques.",
    produits: [
      { name: "Assortiment Asie", price: "1 400 DA / box", image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80", cat: "Asie / Afrique" },
      { name: "Plat Yassa poulet", price: "1 100 DA", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", cat: "Asie / Afrique" },
      { name: "Brochettes africaines", price: "900 DA / 6pcs", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", cat: "Asie / Afrique" },
      { name: "Box fusion Asie", price: "1 600 DA", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80", cat: "Asie / Afrique" },
    ],
    slug: "Asie / Afrique",
  },
  {
    id: "mer",
    label: "Produits de la mer",
    emoji: "🐟",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&q=80",
    tagline: "Poissons & Fruits de mer",
    desc: "Saumon fume, truite, maquereau — fumes lentement au bois de hetre pour une texture parfaite.",
    produits: [
      { name: "Saumon fume tranche", price: "1 200 DA / 200g", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", cat: "Poisson fumé" },
      { name: "Truite fumee maison", price: "1 050 DA / 200g", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80", cat: "Poisson fumé" },
      { name: "Maquereau fume", price: "890 DA / 200g", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80", cat: "Poisson fumé" },
      { name: "Assortiment poissons fumes", price: "1 800 DA / box", image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=400&q=80", cat: "Poisson fumé" },
    ],
    slug: "Poisson fumé",
  },
] as const;

export default function HomeEpicerie() {
  const [activeTab, setActiveTab] = useState<"charcuterie" | "asie-afrique" | "mer">("charcuterie");
  const tab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      {/* Hero avec onglets */}
      <section className="relative flex flex-col" style={{ minHeight: "100svh" }}>
        {/* Background image — change selon onglet */}
        <div className="absolute inset-0 overflow-hidden">
          {tabs.map((t) => (
            <div
              key={t.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${t.id === activeTab ? "opacity-25" : "opacity-0"}`}
              style={{ backgroundImage: `url('${t.image}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/50 to-[#0A0A0A]" />
        </div>

        {/* Contenu hero — prend tout l'espace entre header et onglets */}
        <div className="relative z-10 flex-1 flex items-center px-4">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 pt-6">
            <div>
              <p className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.3em] mb-1">
                Epicerie fine · Artisanal
              </p>
              <p className="text-[#C9A96E]/60 text-xs uppercase tracking-widest mb-3">
                {tab.tagline}
              </p>
              <h1 className="font-serif font-bold leading-tight mb-3" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
                <span className="text-[#C9A96E]">Terodz</span><br />
                <span className="text-[#F5F0E8]">{tab.label}</span>
              </h1>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                {tab.desc}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/commander"
                  className="bg-[#C9A96E] text-[#0A0A0A] px-5 py-3 font-semibold text-xs uppercase tracking-widest hover:bg-[#B8955A] transition-colors"
                >
                  Commander
                </Link>
                <Link
                  href={`/produits?categorie=${encodeURIComponent(tab.slug)}`}
                  className="border border-[#C9A96E]/40 text-[#C9A96E] px-5 py-3 font-semibold text-xs uppercase tracking-widest hover:border-[#C9A96E] transition-colors"
                >
                  Voir la selection
                </Link>
              </div>
            </div>

            {/* Image desktop */}
            <div className="hidden lg:block">
              <div className="relative">
                <div
                  key={activeTab}
                  className="h-[460px] bg-cover bg-center"
                  style={{ backgroundImage: `url('${tab.produits[0].image}')` }}
                />
                <div className="absolute -bottom-5 -right-5 border border-[#C9A96E]/30 h-full w-full pointer-events-none" />
                <div className="absolute bottom-5 left-5 bg-[#0A0A0A]/80 border border-[#C9A96E]/20 p-4 backdrop-blur-sm">
                  <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-1">{tab.produits[0].cat}</p>
                  <p className="font-serif text-[#F5F0E8] font-semibold text-sm">{tab.produits[0].name}</p>
                  <p className="text-[#F5F0E8]/40 text-xs mt-1">{tab.produits[0].price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets collés en bas du hero */}
        <div className="relative z-10 px-4 pb-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-[#111]/90 backdrop-blur-sm border border-[#2a2a2a]">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 text-[10px] md:text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeTab === t.id
                      ? "bg-[#C9A96E] text-[#0A0A0A]"
                      : "text-[#F5F0E8]/40 hover:text-[#F5F0E8] hover:bg-[#1a1a1a]"
                  }`}
                >
                  <span className="text-lg leading-none">{t.emoji}</span>
                  <span className="text-center leading-tight mt-0.5">{t.label}</span>
                </button>
              ))}
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
          <Link
            href="/commander"
            className="whitespace-nowrap bg-[#0A0A0A] text-[#C9A96E] px-6 py-3 font-semibold text-sm uppercase tracking-widest hover:bg-[#111] transition-colors"
          >
            Commander →
          </Link>
        </div>
      </div>

      {/* Produits de la categorie selectionnee */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-2">
                {tab.emoji} {tab.tagline}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F5F0E8]">
                {tab.label}
              </h2>
            </div>
            <Link
              href={`/produits?categorie=${encodeURIComponent(tab.slug)}`}
              className="text-[#C9A96E] text-sm uppercase tracking-widest hover:underline"
            >
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {tab.produits.map((p) => (
              <Link
                key={p.name}
                href="/produits"
                className="group block bg-[#111] border border-[#222] hover:border-[#C9A96E]/40 transition-colors"
              >
                <div className="relative h-40 md:h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-70"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                </div>
                <div className="p-3 md:p-5">
                  <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-1">{p.cat}</p>
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#F5F0E8] mb-1 md:mb-2 leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[#F5F0E8]/40 text-xs md:text-sm">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Onglet switcher inline (rappel) */}
          <div className="mt-10 flex gap-3 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 border text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === t.id
                    ? "bg-[#C9A96E] border-[#C9A96E] text-[#0A0A0A]"
                    : "border-[#333] text-[#F5F0E8]/50 hover:border-[#C9A96E]/50 hover:text-[#F5F0E8]"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section className="py-20 px-4 bg-[#C9A96E]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0A0A0A]/60 text-xs uppercase tracking-widest mb-4">Notre promesse</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-8">
            L&apos;experience Terodz
          </h2>
          <p className="text-[#0A0A0A]/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Chaque produit est cree avec une exigence absolue : les meilleures matieres premieres, un savoir-faire artisanal, une fraicheur garantie par le systeme de fournee.
          </p>
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {[
              { n: "100%", l: "Fait main" },
              { n: "0", l: "Conservateur" },
              { n: "24h", l: "Fraicheur garantie" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#0A0A0A]">{s.n}</p>
                <p className="text-[#0A0A0A]/60 text-xs md:text-sm mt-1 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[#C9A96E] text-xs uppercase tracking-widest mb-4">Rejoignez la fournee</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6">
            Pret a commander ?
          </h2>
          <p className="text-[#F5F0E8]/50 mb-10">Places limitees par fournee. Paiement a la livraison.</p>
          <Link
            href="/commander"
            className="bg-[#C9A96E] text-[#0A0A0A] px-10 py-5 font-semibold text-sm uppercase tracking-widest hover:bg-[#B8955A] transition-colors inline-block"
          >
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
