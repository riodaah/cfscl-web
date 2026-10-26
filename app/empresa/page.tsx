import type { Metadata } from "next";
import { PageIntro } from "@/components/ProductList";
import { CatalogBand, ContactSection, Respaldo } from "@/components/Sections";
import Photo from "@/components/Photo";
import { site, social } from "@/lib/site";

export const metadata: Metadata = {
  ...social({ url: "/empresa", title: "Empresa, campos y certificaciones | CFS", description: "Central Frutícola Sur: más de 20 años produciendo y exportando fruta premium desde Chile y Perú, con certificaciones PrimusGFS, GLOBALG.A.P. y GRASP." }),
  title: "Empresa, campos y certificaciones",
  description:
    "Central Frutícola Sur: más de 20 años produciendo y exportando fruta premium desde Chile y Perú, con certificaciones PrimusGFS, GLOBALG.A.P. y GRASP.",
  alternates: { canonical: "/empresa" },
};

export default function Empresa() {
  return (
    <>
      <PageIntro
        title="Más de 20 años llevando fruta chilena al mundo"
        intro="Central Frutícola Sur produce y exporta fruta fresca y congelada desde los valles de Chile y Perú, con atención cercana y transparente en cada compra."
      />
      <section className="wrap pb-20">
        <Photo name="hero" alt="Huerto de cerezos en flor de CFS" className="aspect-[21/9] rounded-[2rem]" sizes="100vw" />
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="display-md">Misión</h2>
            <p className="lead mt-4 text-niebla">{site.mission}</p>
          </div>
          <div>
            <h2 className="display-md">Visión</h2>
            <p className="lead mt-4 text-niebla">{site.vision}</p>
          </div>
        </div>
      </section>
      <Respaldo />
      <CatalogBand />
      <ContactSection />
    </>
  );
}
