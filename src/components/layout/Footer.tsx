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
    <footer className="bg-brown text-sand mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-cream mb-3">Terodz</h3>
            <p className="text-sm text-sand leading-relaxed">
              Charcuterie artisanale &amp; saveurs du monde. Produits fabriqués à la commande, en petites quantités, pour vous garantir fraîcheur et qualité.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-cream transition-colors">Accueil</Link>
              <Link href="/produits" className="hover:text-cream transition-colors">Nos produits</Link>
              <Link href="/commander" className="hover:text-cream transition-colors">Commander</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Infos</h4>
            <div className="text-sm space-y-1">
              <p>💰 Paiement à la livraison (espèces)</p>
              <p>📦 Livraison sur commande groupée</p>
              <p>🕒 Commandes par fournée</p>
            </div>
          </div>
        </div>
        <div className="border-t border-brown-light mt-8 pt-6 text-center text-xs text-sand">
          <p
            onClick={handleSecretClick}
            className="cursor-default select-none"
          >
            © {new Date().getFullYear()} Terodz. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
