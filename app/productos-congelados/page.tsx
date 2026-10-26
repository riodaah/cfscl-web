import type { Metadata } from "next";
import { social } from "@/lib/site";
import ProductGrid, { PageIntro } from "@/components/ProductList";
import { CatalogBand, ContactSection } from "@/components/Sections";

export const metadata: Metadata = {
  ...social({ url: "/productos-congelados", title: "Fruta congelada IQF de Chile para la industria | CFS", description: "Arándanos, kiwi, frutilla, cereza, mora, uva y frambuesa congelados IQF: frutos íntegros y separados, calidad estandarizada y despacho durante todo el año.", image: "/media/og-frambuesa-congelada.jpg" }),
  title: "Fruta congelada IQF de Chile para la industria",
  description:
    "Arándanos, kiwi, frutilla, cereza, mora, uva y frambuesa congelados IQF: frutos íntegros y separados, calidad estandarizada y despacho durante todo el año.",
  alternates: { canonical: "/productos-congelados" },
};

const points = [
  { title: "Frutos íntegros y separados", text: "El congelado IQF evita bloques: cada fruto se dosifica por separado en tu línea." },
  { title: "Calidad estandarizada", text: "Lotes uniformes en sabor y calidad, pensados para procesos de gran escala." },
  { title: "Despacho durante el año", text: "Seis de las siete líneas se despachan los doce meses; la cereza, de noviembre a marzo." },
];

export default function Congelados() {
  return (
    <>
      <PageIntro
        title="Fruta congelada IQF"
        intro="Materia prima confiable para panificación, repostería, lácteos, jugos, heladería y alimentos procesados."
      />
      <section aria-label="Ventajas del congelado IQF" className="wrap pb-16">
        <dl className="grid gap-6 border-y border-linea py-10 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title}>
              <dt className="font-display text-xl font-bold">{p.title}</dt>
              <dd className="mt-2 text-niebla">{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-label="Productos congelados" className="wrap pb-20">
        <ProductGrid category="congelados" />
      </section>
      <CatalogBand />
      <ContactSection title="Cotiza fruta congelada IQF" />
    </>
  );
}
