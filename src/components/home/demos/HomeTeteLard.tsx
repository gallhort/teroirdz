"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";

const slides = [
  {
    title: "Charcuterie d'exception",
    sub: "Fabriquee artisanalement a Alger",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1400&q=80",
    cta: "Decouvrir",
  },
  {
    title: "Poisson fume maison",
    sub: "Saumon, truite, maquereau — fumes lentement",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&q=80",
    cta: "Commander",
  },
  {
    title: "Saveurs du monde",
    sub: "Asie, Afrique — une invitation au voyage",
    image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=1400&q=80",
    cta: "Explorer",
  },
];

const produits = [
  { name: "Saucisson boeuf medaille", cat: "Charcuterie boeuf", price: "890 DA", medal: "Or", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
  { name: "Saumon fume premium", cat: "Poisson fume", price: "1 200 DA", medal: "Argent", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" },
  { name: "Dinde fumee signature", cat: "Charcuterie volaille", price: "750 DA", medal: "Or", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80" },
  { name: "Box Asie-Afrique", cat: "Asie / Afrique", price: "1 400 DA", medal: null, image: "https://images.unsplash.com/photo-1617196034838-16ce8f2faee2?w=400&q=80" },
];

export default function HomeTeteLard() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Bandeau promo */}
      <div className="bg-[#6da4a2] text-white text-center py-2 text-xs font-semibold uppercase tracking-widest">
        Paiement a la livraison — Livraison dans tout Alger
      </div>

      {/* Hero slider */}
      <section className="relative h-[85vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${s.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4c0002]/60 via-[#4c0002]/40 to-[#4c0002]/70" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#6da4a2] text-xs font-semibold uppercase tracking-[0.4em] mb-4">Terodz Artisan</p>
          <h1 className="font-bold text-5xl md:text-7xl text-white leading-tight mb-4" style={{ fontWeight: 900 }}>
            {slides[slide].title}
          </h1>
          <p className="text-white/70 text-xl mb-10">{slides[slide].sub}</p>
          <Link href="/commander" className="bg-[#4c0002] text-white border-2 border-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#4c0002] transition-colors">
            {slides[slide].cta}
          </Link>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Bandeau fournee bordeaux */}
      <section className="bg-[#4c0002] text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#6da4a2] text-xs uppercase tracking-widest mb-1">Fournee en cours</p>
            <p className="font-bold text-lg">Fournee Printemps 2026 — Commandes ouvertes</p>
          </div>
          <Link href="/commander" className="bg-white text-[#4c0002] font-bold px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors whitespace-nowrap">
            Commander →
          </Link>
        </div>
      </section>

      {/* Nouveautes avec medals */}
      <section className="py-20 px-4 bg-[#faf8f8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#6da4a2] text-xs font-semibold uppercase tracking-widest mb-2">Selection phare</p>
            <h2 className="font-bold text-4xl text-[#4c0002]" style={{ fontWeight: 900 }}>Nos produits stars</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produits.map((p) => (
              <Link key={p.name} href="/produits" className="group block bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                  {p.medal && (
                    <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold uppercase ${p.medal === "Or" ? "bg-amber-400 text-amber-900" : "bg-gray-300 text-gray-700"}`}>
                      {p.medal === "Or" ? "🥇" : "🥈"} {p.medal}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[#6da4a2] text-xs uppercase tracking-wide mb-1">{p.cat}</p>
                  <h3 className="font-bold text-[#4c0002] text-sm mb-2">{p.name}</h3>
                  <p className="text-gray-600 font-semibold text-sm">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 bg-[#4c0002]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl text-white" style={{ fontWeight: 900 }}>Pourquoi Terodz ?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🏆", label: "Qualite premium" },
              { icon: "🔪", label: "100% artisanal" },
              { icon: "🌿", label: "Sans conservateur" },
              { icon: "🚚", label: "Livraison domicile" },
            ].map((c) => (
              <div key={c.label} className="bg-[#3a0001] rounded-xl p-5">
                <div className="text-4xl mb-2">{c.icon}</div>
                <p className="text-[#6da4a2] text-xs font-semibold uppercase tracking-wide">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau final */}
      <section className="py-20 px-4 bg-[#6da4a2] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-bold text-4xl text-white mb-4" style={{ fontWeight: 900 }}>Pret a gouter ?</h2>
          <p className="text-white/80 mb-8">Rejoignez la fournee en cours — places limitees</p>
          <Link href="/commander" className="bg-[#4c0002] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#3a0001] transition-colors inline-block">
            Commander maintenant
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
