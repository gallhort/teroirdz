"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import BatchBanner from "@/components/home/BatchBanner";
import Footer from "@/components/layout/Footer";

const tabs = [
  {
    id: "viandes",
    label: "Viandes fumees",
    emoji: "🥩",
    images: [
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1400&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400&q=80",
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=1400&q=80",
    ],
    tagline: "Boeuf · Volaille · Artisanal",
    desc: "Charcuteries artisanales fabriquees en petites quantites — boeuf, dinde et volaille selectionnes avec soin, sans conservateur.",
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
    images: [
      "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=1400&q=80",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1400&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80",
    ],
    tagline: "Voyage · Fusion · Saveurs",
    desc: "Une invitation au voyage — plats prepares, assortiments et saveurs d'Asie et d'Afrique, prepares avec les memes exigences artisanales.",
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
    images: [
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1400&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1400&q=80",
    ],
    tagline: "Saumon · Truite · Maquereau",
    desc: "Poissons fumes a froid selon nos methodes artisanales — saumon Atlantique, truite et maquereau, livres frais a chaque fournee.",
    produits: [
      { name: "Saumon fume tranche", price: "1 200 DA / 200g", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", cat: "Poisson fumé" },
      { name: "Truite fumee maison", price: "1 050 DA / 200g", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80", cat: "Poisson fumé" },
      { name: "Maquereau fume", price: "890 DA / 200g", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80", cat: "Poisson fumé" },
      { name: "Assortiment poissons fumes", price: "1 800 DA / box", image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=400&q=80", cat: "Poisson fumé" },
    ],
    slug: "Poisson fumé",
  },
] as const;

type TabId = "viandes" | "asie-afrique" | "mer";

export default function HomeEpicerie() {
  const [activeTab, setActiveTab] = useState<TabId>("viandes");
  const [slideIndex, setSlideIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tab = tabs.find((t) => t.id === activeTab)!;

  // Auto-slide: avance dans les images du tab actif
  function startSlider() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlideIndex((i) => (i + 1) % 3);
    }, 3500);
  }

  useEffect(() => {
    setSlideIndex(0);
    startSlider();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeTab]);

  function handleTabChange(id: TabId) {
    setActiveTab(id);
    setSlideIndex(0);
  }

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      {/* Hero avec onglets */}
      <section className="relative flex flex-col" style={{ minHeight: "100svh" }}>

        {/* Slides de fond — toutes les images de tous les tabs, fade selon activeTab+slideIndex */}
        <div className="absolute inset-0 overflow-hidden">
          {tabs.map((t) =>
            t.images.map((img, i) => (
              <div
                key={`${t.id}-${i}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${img}')`,
                  opacity: t.id === activeTab && i === slideIndex ? 0.28 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
              />
            ))
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/55 via-[#0A0A0A]/45 to-[#0A0A0A]" />
        </div>

        {/* Indicateurs de slide */}
        <div className="absolute top-4 right-4 z-20 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-0.5 rounded-full transition-all duration-700"
              style={{
                width: i === slideIndex ? "20px" : "8px",
                backgroundColor: i === slideIndex ? "#C9A96E" : "rgba(201,169,110,0.3)",
              }}
            />
          ))}
        </div>

        {/* Contenu hero */}
        <div className="relative z-10 flex-1 flex items-center px-5">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-6">
            <div>
              <p className="text-[#C9A96E] text-[10px] font-semibold uppercase tracking-[0.35em] mb-1">
                Epicerie fine · Artisanal · Alger
              </p>
              <p className="text-[#C9A96E]/55 text-[10px] uppercase tracking-widest mb-2.5">
                {tab.tagline}
              </p>
              <h1 className="font-serif font-bold leading-[1.05] mb-3" style={{ fontSize: "clamp(1.9rem, 7.5vw, 4.2rem)" }}>
                <span className="text-[#C9A96E]">Terodz</span><br />
                <span className="text-[#F5F0E8]">{tab.label}</span>
              </h1>
              <p className="text-[#F5F0E8]/50 text-sm leading-relaxed mb-5 max-w-sm">
                {tab.desc}
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <Link
                  href="/commander"
                  className="bg-[#C9A96E] text-[#0A0A0A] px-5 py-2.5 font-semibold text-[11px] uppercase tracking-widest hover:bg-[#B8955A] transition-colors"
                >
                  Commander
                </Link>
                <Link
                  href={`/produits?categorie=${encodeURIComponent(tab.slug)}`}
                  className="border border-[#C9A96E]/35 text-[#C9A96E] px-5 py-2.5 font-semibold text-[11px] uppercase tracking-widest hover:border-[#C9A96E] transition-colors"
                >
                  Voir la selection
                </Link>
              </div>
            </div>

            {/* Image desktop */}
            <div className="hidden lg:block">
              <div className="relative">
                <div
                  className="h-[440px] bg-cover bg-center transition-all duration-700"
                  style={{ backgroundImage: `url('${tab.images[slideIndex]}')` }}
                />
                <div className="absolute -bottom-5 -right-5 border border-[#C9A96E]/25 h-full w-full pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/85 border border-[#C9A96E]/20 p-3.5 backdrop-blur-sm">
                  <p className="text-[#C9A96E] text-[10px] uppercase tracking-widest mb-0.5">{tab.produits[slideIndex % tab.produits.length].cat}</p>
                  <p className="font-serif text-[#F5F0E8] font-semibold text-sm">{tab.produits[slideIndex % tab.produits.length].name}</p>
                  <p className="text-[#F5F0E8]/35 text-xs mt-0.5">{tab.produits[slideIndex % tab.produits.length].price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre d'onglets — collée en bas du hero, pleine largeur sur mobile */}
        <div className="relative z-10">
          <div className="flex border-t border-[#1e1e1e] bg-[#0d0d0d]/95 backdrop-blur-sm">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id as TabId)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 text-[10px] md:text-[11px] font-semibold uppercase tracking-wide transition-all duration-300 border-t-2 ${
                  activeTab === t.id
                    ? "border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]"
                    : "border-transparent text-[#F5F0E8]/35 hover:text-[#F5F0E8]/70 hover:bg-[#1a1a1a]"
                }`}
              >
                <span className="text-base leading-none">{t.emoji}</span>
                <span className="text-center leading-tight">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Produits — directement sous les onglets, espacement réduit */}
      <section className="pt-8 pb-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[#C9A96E] text-[10px] uppercase tracking-widest mb-1">
                {tab.emoji} {tab.tagline}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8]">
                {tab.label}
              </h2>
            </div>
            <Link
              href={`/produits?categorie=${encodeURIComponent(tab.slug)}`}
              className="text-[#C9A96E] text-xs uppercase tracking-widest hover:underline"
            >
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {tab.produits.map((p) => (
              <Link
                key={p.name}
                href="/produits"
                className="group block bg-[#111] border border-[#1e1e1e] hover:border-[#C9A96E]/35 transition-colors"
              >
                <div className="relative h-36 md:h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-600 opacity-75"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[#C9A96E] text-[9px] uppercase tracking-widest mb-0.5">{p.cat}</p>
                  <h3 className="font-serif text-xs md:text-sm font-semibold text-[#F5F0E8] mb-1 leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[#F5F0E8]/35 text-[10px] md:text-xs">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BatchBanner */}
      <BatchBanner />

      {/* Experience section */}
      <section className="py-16 px-4 bg-[#C9A96E]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0A0A0A]/55 text-[10px] uppercase tracking-widest mb-3">Notre promesse</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
            L&apos;experience Terodz
          </h2>
          <p className="text-[#0A0A0A]/65 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Chaque produit — qu&apos;il soit d&apos;ici ou d&apos;ailleurs — est prepare avec la meme exigence : matieres premieres selectionnees, fabrication artisanale, fraicheur garantie par fournee.
          </p>
          <div className="grid grid-cols-3 gap-5 md:gap-8">
            {[
              { n: "100%", l: "Fait main" },
              { n: "0", l: "Conservateur" },
              { n: "24h", l: "Fraicheur garantie" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#0A0A0A]">{s.n}</p>
                <p className="text-[#0A0A0A]/55 text-[10px] md:text-xs mt-1 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[#C9A96E] text-[10px] uppercase tracking-widest mb-3">Rejoignez la fournee</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#F5F0E8] mb-4">
            Pret a commander ?
          </h2>
          <p className="text-[#F5F0E8]/45 text-sm mb-8">Places limitees par fournee. Paiement a la livraison.</p>
          <Link
            href="/commander"
            className="bg-[#C9A96E] text-[#0A0A0A] px-10 py-4 font-semibold text-xs uppercase tracking-widest hover:bg-[#B8955A] transition-colors inline-block"
          >
            Acceder a la boutique
          </Link>
        </div>
      </section>

      <div className="bg-[#0A0A0A] border-t border-[#1a1a1a]">
        <Footer />
      </div>
    </div>
  );
}
