import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // URLs del sitio anterior (Wix) que cambian de ruta
      { source: "/post/:slug*", destination: "/noticias/cfs-asia-fruit-logistica-2025", permanent: true },
      { source: "/blog", destination: "/noticias", permanent: true },
      { source: "/blank", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: false },
      { source: "/en/:path*", destination: "/:path*", permanent: false },
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
