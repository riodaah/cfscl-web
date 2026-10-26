import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid, { PageIntro } from "@/components/ProductList";
import { CatalogBand, ContactSection } from "@/components/Sections";
import { site, social } from "@/lib/site";

export const metadata: Metadata = {
  ...social({ url: "/productos", title: "Productos: fruta fresca y congelada IQF de exportación | CFS", description: "Cerezas, ciruelas, granadas, manzanas, arándanos, kiwi y uva frescos, y siete líneas de fruta congelada IQF. Conoce variedades y temporadas de cada fruta CFS." }),
  title: "Productos: fruta fresca y congelada IQF de exportación",
  description:
    "Cerezas, ciruelas, granadas, manzanas, arándanos, kiwi y uva frescos, y siete líneas de fruta congelada IQF. Conoce variedades y temporadas de cada fruta CFS.",
  alternates: { canonical: "/productos" },
};

export default function Productos() {
  return (
    <>
      <PageIntro
        title="Nuestros productos"
        intro="Fruta fresca cosechada en Chile y Perú en su punto, y fruta congelada IQF con calidad estandarizada para la industria."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#frescos" className="btn btn-linea text-huerto">Frescos</a>
          <Link href="/productos-congelados" className="btn btn-linea text-huerto">Congelados IQF</Link>
          <a href={site.catalog} download className="btn btn-rojo">Descargar catálogo</a>
        </div>
      </PageIntro>

      <section aria-labelledby="frescos" className="wrap pb-20">
        <h2 id="frescos" className="display-lg scroll-mt-24">Frescos</h2>
        <div className="mt-10"><ProductGrid category="frescos" headingLevel={3} /></div>
      </section>

      <section aria-labelledby="congelados" className="bg-white">
        <div className="wrap py-20">
          <h2 id="congelados" className="display-lg scroll-mt-24">Congelados IQF</h2>
          <p className="lead mt-4 max-w-2xl text-niebla">Frutos íntegros y separados, disponibles la mayor parte del año para panificación, lácteos, jugos y heladería.</p>
          <div className="mt-10"><ProductGrid category="congelados" headingLevel={3} /></div>
        </div>
      </section>

      <CatalogBand />
      <ContactSection />
    </>
  );
}
