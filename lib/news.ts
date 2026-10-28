import type { Lang } from "./i18n";

type PostText = { title: string; excerpt: string; tag: string; body: string[]; imageAlt: string };

export type Post = {
  slug: string;
  date: string; // ISO
  image: string;
  es: PostText;
  en: PostText;
};

export const posts: Post[] = [
  {
    slug: "cfs-asia-fruit-logistica-2025",
    date: "2025-08-31",
    image: "noticia-asia-fruit-logistica",
    es: {
      title: "CFS reafirma su liderazgo en la exportación frutícola en Asia",
      tag: "Eventos",
      imageAlt: "Afiche de Asia Fruit Logistica 2025, Hong Kong",
      excerpt:
        "CFS participa en Asia Fruit Logistica 2025 en Hong Kong con su oferta de cerezas, uvas, manzanas y ciruelas de calidad premium.",
      body: [
        "Con más de 20 años de trayectoria en la producción y exportación de frutas frescas de calidad premium, Central Frutícola Sur (CFS) continúa fortaleciendo su presencia internacional, abasteciendo a mercados exigentes en Asia, Europa, Norteamérica y Latinoamérica.",
        "Este año, CFS participa en Asia Fruit Logistica 2025, la feria líder en el sector hortofrutícola asiático que se desarrollará del 3 al 5 de septiembre de 2025, en el AsiaWorld‑Expo de Hong Kong. Esta plataforma ofrece una oportunidad única para destacar sus productos, establecer contactos de alto nivel y acceder a información esencial sobre el mercado asiático.",
        "Con su privilegiada oferta de uvas, manzanas y ciruelas, cultivadas en los fértiles valles centrales de Chile, CFS llega al evento posicionándose como sinónimo de frescura, sabor y excelencia agrícola. Su participación en Asia Fruit Logistica refuerza su compromiso de acercar lo mejor de la fruta chilena a los mercados del Lejano Oriente.",
      ],
    },
    en: {
      title: "CFS reaffirms its leadership in fruit exports to Asia",
      tag: "Events",
      imageAlt: "Asia Fruit Logistica 2025 poster, Hong Kong",
      excerpt:
        "CFS takes part in Asia Fruit Logistica 2025 in Hong Kong with its premium cherries, grapes, apples and plums.",
      body: [
        "With more than 20 years of experience growing and exporting premium fresh fruit, Central Frutícola Sur (CFS) keeps strengthening its international presence, supplying demanding markets in Asia, Europe, North America and Latin America.",
        "This year CFS takes part in Asia Fruit Logistica 2025, the leading fresh produce trade show in Asia, held from 3 to 5 September 2025 at AsiaWorld‑Expo in Hong Kong. The event is a unique opportunity to showcase its products, build high-level contacts and gain essential insight into the Asian market.",
        "With its outstanding range of grapes, apples and plums grown in the fertile central valleys of Chile, CFS arrives at the show as a byword for freshness, flavor and agricultural excellence. Its participation in Asia Fruit Logistica reinforces its commitment to bringing the best of Chilean fruit to Far East markets.",
      ],
    },
  },
];

export const postHref = (p: Post, lang: Lang) => (lang === "en" ? `/en/news/${p.slug}` : `/noticias/${p.slug}`);

export const formatDate = (iso: string, lang: Lang = "es") =>
  new Date(iso + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "es-CL", { day: "numeric", month: "long", year: "numeric" });
