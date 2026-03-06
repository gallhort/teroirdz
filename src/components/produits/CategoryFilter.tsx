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
        className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        style={active === "all"
          ? { background: "#C9A96E", color: "#0A0A0A" }
          : { background: "#1a1a1a", color: "rgba(245,240,232,0.6)", border: "1px solid #2a2a2a" }
        }
      >
        Tous
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          style={active === cat
            ? { background: "#C9A96E", color: "#0A0A0A" }
            : { background: "#1a1a1a", color: "rgba(245,240,232,0.6)", border: "1px solid #2a2a2a" }
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
