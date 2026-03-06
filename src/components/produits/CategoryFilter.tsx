"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/types";

export default function CategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("categorie") ?? "all";

  const setCategory = (cat: string) => {
    if (cat === "all") {
      router.push("/produits");
    } else {
      router.push(`/produits?categorie=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => setCategory("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          active === "all"
            ? "bg-brown text-cream"
            : "bg-cream-dark text-brown hover:bg-sand"
        }`}
      >
        Tous
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === cat
              ? "bg-brown text-cream"
              : "bg-cream-dark text-brown hover:bg-sand"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
