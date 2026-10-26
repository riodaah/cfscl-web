import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { products, productHref } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | CFS Chile" },
  description: site.description,
  applicationName: "CFS Central Frutícola Sur",
  keywords: [
    "exportadora de fruta Chile",
    "exportación de cerezas",
    "uva de exportación",
    "arándanos Chile Perú",
    "fruta congelada IQF",
    "Central Frutícola Sur",
    "CFS Chile",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "CFS · Central Frutícola Sur",
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "CFS Central Frutícola Sur — huerto de cerezos en flor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b3b22",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CFS Central Frutícola Sur",
  alternateName: "CFS",
  url: site.url,
  logo: `${site.url}/media/logo.png`,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  areaServed: site.markets,
  address: { "@type": "PostalAddress", addressCountry: "CL" },
  makesOffer: products.map((p) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: `${p.name} ${p.category === "congelados" ? "congelados IQF" : "frescos"}`, url: `${site.url}${productHref(p)}` },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body className="min-h-dvh flex flex-col">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-blanco">
          Ir al contenido
        </a>
        <JsonLd data={organization} />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
