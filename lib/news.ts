export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  image: string;
  tag: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "cfs-asia-fruit-logistica-2025",
    title: "CFS reafirma su liderazgo en la exportación frutícola en Asia",
    date: "2025-08-31",
    tag: "Eventos",
    image: "noticia-asia-fruit-logistica",
    excerpt:
      "CFS participa en Asia Fruit Logistica 2025 en Hong Kong con su oferta de cerezas, uvas, manzanas y ciruelas de calidad premium.",
    body: [
      "Con más de 20 años de trayectoria en la producción y exportación de frutas frescas de calidad premium, Central Frutícola Sur (CFS) continúa fortaleciendo su presencia internacional, abasteciendo a mercados exigentes en Asia, Europa, Norteamérica y Latinoamérica.",
      "Este año, CFS participa en Asia Fruit Logistica 2025, la feria líder en el sector hortofrutícola asiático que se desarrollará del 3 al 5 de septiembre de 2025, en el AsiaWorld‑Expo de Hong Kong. Esta plataforma ofrece una oportunidad única para destacar sus productos, establecer contactos de alto nivel y acceder a información esencial sobre el mercado asiático.",
      "Con su privilegiada oferta de uvas, manzanas y ciruelas, cultivadas en los fértiles valles centrales de Chile, CFS llega al evento posicionándose como sinónimo de frescura, sabor y excelencia agrícola. Su participación en Asia Fruit Logistica refuerza su compromiso de acercar lo mejor de la fruta chilena a los mercados del Lejano Oriente.",
    ],
  },
];

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
