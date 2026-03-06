"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const totalItems = useCart((s) => s.totalItems());

  const nav = [
    { href: "/", label: "Accueil" },
    { href: "/produits", label: "Nos produits" },
    { href: "/commander", label: "Commander" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brown shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-cream">Terodz</span>
          <span className="hidden sm:inline text-sand text-xs mt-1">— Artisan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-cream"
                  : "text-sand hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/commander"
            className="relative ml-2 bg-terracotta text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            Panier
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-cream text-brown text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-brown-dark border-t border-brown-light py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                pathname === item.href ? "text-cream" : "text-sand"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/commander"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 mx-4 mt-2 bg-terracotta text-white px-4 py-3 rounded-lg text-sm font-medium"
          >
            Panier
            {totalItems > 0 && (
              <span className="bg-cream text-brown text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
