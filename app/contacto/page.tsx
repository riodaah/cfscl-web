import type { Metadata } from "next";
import { social } from "@/lib/site";
import { ContactSection } from "@/components/Sections";

export const metadata: Metadata = {
  ...social({ url: "/contacto", title: "Cotizar fruta de exportación | CFS", description: "Solicita una cotización de cerezas, uvas, manzanas, arándanos, granadas, kiwi o fruta congelada IQF. Un ejecutivo de CFS te responde con disponibilidad y condiciones." }),
  title: "Cotizar fruta de exportación",
  description:
    "Solicita una cotización de cerezas, uvas, manzanas, arándanos, granadas, kiwi o fruta congelada IQF. Un ejecutivo de CFS te responde con disponibilidad y condiciones.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
    <>
      <h1 className="sr-only">Cotizar fruta con CFS</h1>
      <ContactSection title="Cotiza fruta con CFS" />
    </>
  );
}
