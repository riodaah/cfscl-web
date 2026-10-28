import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import Header from "./Header";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import { content, site } from "@/lib/site";
import { products, productHref, tx } from "@/lib/products";
import { t, type Lang } from "@/lib/i18n";

export const viewport: Viewport = { themeColor: "#0b3b22" };

/** Metadatos comunes del layout raíz de cada idioma */
export function baseMetadata(lang: Lang): Metadata {
  const c = content[lang];
  return {
    metadataBase: new URL(site.url),
    title: { default: c.title, template: lang === "en" ? "%s | CFS Chile" : "%s | CFS Chile" },
    description: c.description,
    applicationName: "CFS Central Frutícola Sur",
    keywords:
      lang === "en"
        ? ["Chilean fruit exporter", "Chilean cherries export", "table grapes Chile Peru", "blueberries Chile Peru", "IQF frozen fruit Chile", "Central Frutícola Sur", "CFS Chile"]
        : ["exportadora de fruta Chile", "exportación de cerezas", "uva de exportación", "arándanos Chile Perú", "fruta congelada IQF", "Central Frutícola Sur", "CFS Chile"],
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
}

export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const d = t(lang);
  const c = content[lang];
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CFS Central Frutícola Sur",
    alternateName: "CFS",
    url: site.url,
    logo: `${site.url}/media/logo.png`,
    email: site.email,
    telephone: site.phone,
    description: c.description,
    areaServed: c.markets,
    address: { "@type": "PostalAddress", addressCountry: "CL" },
    makesOffer: products.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: tx(p, lang).title, url: `${site.url}${productHref(p, lang)}` },
    })),
  };

  return (
    <html lang={d.htmlLang}>
      <body className="min-h-dvh flex flex-col">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-blanco">
          {d.skip}
        </a>
        <JsonLd data={organization} />
        <Header lang={lang} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
