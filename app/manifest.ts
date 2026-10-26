import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CFS Central Frutícola Sur",
    short_name: "CFS",
    description: "Exportación de frutas frescas y congeladas de Chile y Perú.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef3ea",
    theme_color: "#0b3b22",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
