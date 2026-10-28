import { ROUTES, type Lang } from "./i18n";
import { products, productHref } from "./products";
import { posts, postHref } from "./news";

/** Lista de pares [ruta en español, ruta en inglés] para todas las páginas del sitio */
export const pagePairs: { es: string; en: string }[] = [
  ...Object.values(ROUTES).map((r) => ({ es: r.es, en: r.en })),
  ...products.map((p) => ({ es: productHref(p, "es"), en: productHref(p, "en") })),
  ...posts.map((p) => ({ es: postHref(p, "es"), en: postHref(p, "en") })),
];

const clean = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/** Ruta equivalente en el otro idioma; si no existe, la portada de ese idioma */
export function switchPath(pathname: string, to: Lang) {
  const from: Lang = to === "en" ? "es" : "en";
  const pair = pagePairs.find((p) => p[from] === clean(pathname));
  return pair ? pair[to] : ROUTES.home[to];
}

export const langOfPath = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es");
