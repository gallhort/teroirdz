"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/fournees": "Fournées",
  "/admin/commandes": "Commandes",
  "/admin/produits": "Produits",
  "/admin/clients": "Clients",
};

function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const title =
    Object.entries(pageTitles)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname.startsWith(key))?.[1] ?? "Admin";

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
