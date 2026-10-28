import type { MetadataRoute } from "next";
import { pagePairs } from "@/lib/paths";
import { site } from "@/lib/site";

const priority = (path: string) => {
  if (path === "/") return 1;
  if (/^\/(productos|productos-congelados)$/.test(path)) return 0.9;
  if (/^\/(productos|productos-congelados)\//.test(path)) return 0.8;
  if (path === "/calendario" || path === "/contacto") return 0.7;
  return 0.5;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pagePairs.flatMap((pair) => {
    const languages = { "es-CL": `${site.url}${pair.es}`, en: `${site.url}${pair.en}` };
    return (["es", "en"] as const).map((lang) => ({
      url: `${site.url}${pair[lang] === "/" ? "" : pair[lang]}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: lang === "es" ? priority(pair.es) : Math.max(0.4, priority(pair.es) - 0.1),
      alternates: { languages },
    }));
  });
}
