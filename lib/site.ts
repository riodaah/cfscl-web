/**
 * Dominio público del sitio, usado en enlaces para compartir, canonical, sitemap y datos estructurados.
 * 1. NEXT_PUBLIC_SITE_URL si se define en Vercel (ej. https://www.cfscl.cl).
 * 2. Si no, el dominio de producción que Vercel asigna (cfscl-web.vercel.app hoy; www.cfscl.cl cuando se conecte).
 * 3. Respaldo: https://www.cfscl.cl
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://www.cfscl.cl";
}

export const site = {
  name: "CFS",
  legalName: "Central Frutícola Sur",
  url: resolveSiteUrl(),
  title: "CFS | Exportación de frutas frescas y congeladas de Chile y Perú",
  description:
    "CFS (Central Frutícola Sur) exporta cerezas, uvas, manzanas, arándanos y fruta congelada IQF de calidad premium desde Chile y Perú a Asia, Europa y Norteamérica. Más de 20 años de trayectoria.",
  email: "info@cfscl.cl",
  phone: "+56 32 361 0693",
  phoneHref: "tel:+56323610693",
  catalog: "/catalogo-cfs.pdf",
  years: "20",
  mission:
    "Producimos fruta de la mejor calidad, priorizando las relaciones cercanas y transparentes con nuestros clientes, para asegurarnos de que cada experiencia de compra sea satisfactoria y confiable.",
  vision:
    "Ser la opción preferida de fruta a nivel nacional e internacional, conocida por nuestra atención al cliente excepcional, el compromiso con la calidad y la innovación constante.",
  markets: ["Asia", "Europa", "Norteamérica", "Latinoamérica"],
  certifications: [
    {
      name: "PrimusGFS",
      text: "Inocuidad alimentaria en campo y empaque, reconocida por la Global Food Safety Initiative.",
    },
    {
      name: "GLOBALG.A.P.",
      text: "Buenas prácticas agrícolas: trazabilidad, manejo responsable y fruta segura desde el huerto.",
    },
    {
      name: "GRASP",
      text: "Evaluación de riesgos para la salud, seguridad y bienestar de quienes trabajan en el campo.",
    },
  ],
};

export const nav = [
  { href: "/productos", label: "Productos" },
  { href: "/calendario", label: "Temporadas" },
  { href: "/empresa", label: "Empresa" },
  { href: "/noticias", label: "Noticias" },
];

/** Open Graph / Twitter completos para cada página (Next reemplaza el bloque del layout, no lo mezcla). */
export function social({ url, title, description, image = "/og.jpg", type = "website" }: {
  url: string; title: string; description: string; image?: string; type?: "website" | "article";
}) {
  return {
    openGraph: {
      type, url, title, description,
      siteName: "CFS · Central Frutícola Sur",
      locale: "es_CL",
      images: [{ url: image, width: 1200, height: 630, alt: "CFS Central Frutícola Sur" }],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [image] },
  };
}
