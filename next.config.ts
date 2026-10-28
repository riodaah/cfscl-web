import type { NextConfig } from "next";
import { products } from "./lib/products";

// El sitio anterior (Wix) publicaba la versión en inglés bajo /en con las mismas rutas en español.
// Se redirigen a las nuevas URLs en inglés para no perder enlaces ni posicionamiento.
const wixEnglish = products.map((p) => ({
  source: `/en/${p.category === "frescos" ? "productos" : "productos-congelados"}/${p.slug}`,
  destination: `/en/${p.category === "frescos" ? "products" : "frozen-fruit"}/${p.slugEn}`,
  permanent: true,
}));

const config: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...wixEnglish,
      // URLs del sitio anterior (Wix) que cambian de ruta
      { source: "/post/:slug*", destination: "/noticias/cfs-asia-fruit-logistica-2025", permanent: true },
      { source: "/en/post/:slug*", destination: "/en/news/cfs-asia-fruit-logistica-2025", permanent: true },
      { source: "/blog", destination: "/noticias", permanent: true },
      { source: "/en/blog", destination: "/en/news", permanent: true },
      { source: "/blank", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/media/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default config;
