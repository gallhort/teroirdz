"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: "📊", exact: true },
  { href: "/admin/fournees", label: "Fournées", icon: "🗓️" },
  { href: "/admin/commandes", label: "Commandes", icon: "📋" },
  { href: "/admin/produits", label: "Produits", icon: "🥩" },
  { href: "/admin/clients", label: "Clients", icon: "👥" },
];

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-brown-light">
        <Link href="/" className="font-serif text-xl font-bold text-cream" onClick={onClose}>
          Terodz
        </Link>
        <p className="text-xs text-sand mt-0.5">Administration</p>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 text-sm font-medium transition-colors ${
              isActive(item.href, item.exact)
                ? "bg-terracotta text-white"
                : "text-sand hover:bg-brown-light hover:text-cream"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-brown-light">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-sm text-sand hover:text-cream transition-colors"
        >
          ← Voir le site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sand hover:text-cream transition-colors"
        >
          🚪 Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-brown fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile overlay + drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative flex flex-col w-64 bg-brown z-50 animate-slide-up">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
