import type { MetadataRoute } from "next";
import { products, productHref } from "@/lib/products";
import { posts } from "@/lib/news";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, freq: "weekly" | "monthly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/productos", 0.9),
    page("/productos-congelados", 0.8),
    page("/calendario", 0.8, "weekly"),
    page("/empresa", 0.6),
    page("/contacto", 0.7),
    page("/noticias", 0.5, "weekly"),
    ...products.map((p) => page(productHref(p), 0.8)),
    ...posts.map((p) => ({ url: `${site.url}/noticias/${p.slug}`, lastModified: new Date(p.date), priority: 0.4 })),
  ];
}
