"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const demos = [
  { id: "terroir", label: "Terroir traditionnel" },
  { id: "epicerie", label: "Epicerie fine premium" },
  { id: "artisan", label: "Artisan moderne" },
  { id: "maison", label: "Maison de charcuterie" },
  { id: "ducs", label: "Inspire Ducs de Gascogne" },
  { id: "verot", label: "Inspire Maison Verot" },
  { id: "tetedelard", label: "Inspire Tete de Lard" },
];

export default function DemoDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("demo") ?? "epicerie";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLabel = demos.find((d) => d.id === current)?.label ?? "Epicerie fine premium";

  function select(id: string) {
    setOpen(false);
    router.push(`/?demo=${id}`);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-terracotta/20 hover:bg-terracotta/30 text-cream border border-terracotta/40 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
      >
        <span className="text-base">🎨</span>
        <span className="hidden sm:inline">{currentLabel}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-brown-dark border border-brown-light rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-brown-light">
            <p className="text-xs text-sand font-medium uppercase tracking-wider">Choisir un style</p>
          </div>
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => select(demo.id)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                current === demo.id
                  ? "bg-terracotta text-white font-medium"
                  : "text-sand hover:bg-brown hover:text-cream"
              }`}
            >
              {demo.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
