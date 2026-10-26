import HomeHero from "@/components/HomeHero";
import ProductShowcase from "@/components/ProductShowcase";
import SeasonMatrix from "@/components/SeasonMatrix";
import { CatalogBand, ContactSection, NewsTeaser, Respaldo, SectionHead } from "@/components/Sections";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HomeHero />

      <section aria-labelledby="productos" className="wrap py-20 md:py-28">
        <SectionHead
          id="productos"
          title="Fruta fresca de temporada y congelada todo el año"
          intro="Siete frutas frescas cosechadas en Chile y Perú, y siete líneas congeladas IQF para la industria alimentaria."
        />
        <div className="mt-10">
          <ProductShowcase />
        </div>
      </section>

      <section aria-labelledby="temporadas" className="bg-hoja-2">
        <div className="wrap py-20 md:py-28">
          <SectionHead
            id="temporadas"
            title="Qué fruta despachamos cada mes"
            intro="Combinamos las temporadas de Chile y Perú para abastecer más meses del año. Toca o pasa el cursor sobre un mes para ver qué hay disponible."
          />
          <div className="mt-10">
            <SeasonMatrix />
          </div>
        </div>
      </section>

      <Respaldo />

      <section aria-labelledby="mision" className="wrap py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="mision" className="display-md">Misión</h2>
            <p className="lead mt-4 text-niebla">{site.mission}</p>
          </div>
          <div>
            <h2 className="display-md">Visión</h2>
            <p className="lead mt-4 text-niebla">{site.vision}</p>
          </div>
        </div>
      </section>

      <CatalogBand />
      <NewsTeaser />
      <ContactSection />
    </>
  );
}
