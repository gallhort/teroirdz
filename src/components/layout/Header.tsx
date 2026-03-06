"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { useCart } from "@/hooks/useCart";
import DemoDropdown from "@/components/home/demos/DemoDropdown";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const totalItems = useCart((s) => s.totalItems());
  const isHome = pathname === "/";

  const nav = [
    { href: "/", label: "Accueil" },
    { href: "/produits", label: "Nos produits" },
    { href: "/commander", label: "Commander" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "#0d0d0d", borderColor: "#1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold" style={{ color: "#C9A96E" }}>Terodz</span>
          <span className="hidden sm:inline text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.35)" }}>— Artisan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-wider transition-colors"
              style={{ color: pathname === item.href ? "#C9A96E" : "rgba(245,240,232,0.5)" }}
            >
              {item.label}
            </Link>
          ))}
          {isHome && (
            <Suspense fallback={null}>
              <DemoDropdown />
            </Suspense>
          )}
          <Link
            href="/commander"
            className="relative ml-1 text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-colors"
            style={{ background: "#C9A96E", color: "#0A0A0A" }}
          >
            Panier
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#F5F0E8", color: "#0A0A0A", fontSize: "10px" }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile: panier + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="/commander"
            className="relative text-xs font-semibold uppercase tracking-widest px-3 py-1.5"
            style={{ background: "#C9A96E", color: "#0A0A0A" }}
          >
            Panier
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#F5F0E8", color: "#0A0A0A", fontSize: "10px" }}
              >
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="p-1.5"
            style={{ color: "rgba(245,240,232,0.7)" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t" style={{ background: "#0d0d0d", borderColor: "#1a1a1a" }}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 text-xs font-medium uppercase tracking-wider transition-colors"
              style={{ color: pathname === item.href ? "#C9A96E" : "rgba(245,240,232,0.5)" }}
            >
              {item.label}
            </Link>
          ))}
          {isHome && (
            <div className="px-5 py-3 border-t" style={{ borderColor: "#1a1a1a" }}>
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(245,240,232,0.3)" }}>Style de demo</p>
              <Suspense fallback={null}>
                <DemoDropdown />
              </Suspense>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
