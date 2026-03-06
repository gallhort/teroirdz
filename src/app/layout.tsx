import type { Metadata } from "next";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: {
    default: "Terodz — Charcuterie artisanale & saveurs du monde",
    template: "%s | Terodz",
  },
  description:
    "Commandez en ligne nos charcuteries artisanales et spécialités du monde. Système de pré-commande par fournée, livraison à domicile. Paiement à la livraison.",
  keywords: ["charcuterie", "artisanal", "bœuf", "volaille", "poisson fumé", "sushi", "plats africains"],
  openGraph: {
    siteName: "Terodz",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
