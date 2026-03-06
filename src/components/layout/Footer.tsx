"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Footer() {
  const router = useRouter();
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSecretClick() {
    clickCount.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      router.push("/admin/login");
    }
  }

  return (
    <footer className="mt-auto" style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "#C9A96E" }}>Terodz</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.4)" }}>
              Charcuterie artisanale &amp; saveurs du monde. Produits fabriqués à la commande, en petites quantités, pour vous garantir fraîcheur et qualité.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[11px] uppercase tracking-widest" style={{ color: "#C9A96E" }}>Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>
              <Link href="/" className="hover:text-[#C9A96E] transition-colors">Accueil</Link>
              <Link href="/produits" className="hover:text-[#C9A96E] transition-colors">Nos produits</Link>
              <Link href="/commander" className="hover:text-[#C9A96E] transition-colors">Commander</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[11px] uppercase tracking-widest" style={{ color: "#C9A96E" }}>Infos</h4>
            <div className="text-sm space-y-1" style={{ color: "rgba(245,240,232,0.4)" }}>
              <p>💰 Paiement à la livraison (espèces)</p>
              <p>📦 Livraison sur commande groupée</p>
              <p>🕒 Commandes par fournée</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 text-center text-xs" style={{ borderTop: "1px solid #1a1a1a", color: "rgba(245,240,232,0.2)" }}>
          <p onClick={handleSecretClick} className="cursor-default select-none">
            © {new Date().getFullYear()} Terodz. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
