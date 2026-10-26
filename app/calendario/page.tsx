import type { Metadata } from "next";
import { social } from "@/lib/site";
import { PageIntro } from "@/components/ProductList";
import SeasonMatrix from "@/components/SeasonMatrix";
import { ContactSection } from "@/components/Sections";

export const metadata: Metadata = {
  ...social({ url: "/calendario", title: "Calendario de temporadas de fruta de exportación | CFS", description: "Revisa en qué meses CFS despacha cerezas, uvas, manzanas, ciruelas, granadas, kiwi y arándanos desde Chile y Perú, y su línea de fruta congelada IQF." }),
  title: "Calendario de temporadas de fruta de exportación",
  description:
    "Revisa en qué meses CFS despacha cerezas, uvas, manzanas, ciruelas, granadas, kiwi y arándanos desde Chile y Perú, y su línea de fruta congelada IQF.",
  alternates: { canonical: "/calendario" },
};

export default function Calendario() {
  return (
    <>
      <PageIntro
        title="Calendario de temporadas"
        intro="Combinamos las cosechas de Chile y Perú para ofrecer fruta fresca más meses del año. Filtra por tipo de producto y toca o pasa el cursor sobre un mes para ver qué hay disponible."
      />
      <section aria-label="Calendario de disponibilidad" className="wrap pb-24">
        <SeasonMatrix initial="todos" />
      </section>
      <ContactSection title="Planifica tu temporada con nosotros" />
    </>
  );
}
