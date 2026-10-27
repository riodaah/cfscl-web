import Link from "next/link";
import type { Metadata } from "next";
import Photo from "./Photo";
import SeasonStrip from "./SeasonStrip";
import MobileQuoteBar from "./MobileQuoteBar";
import JsonLd from "./JsonLd";
import { CatalogBand, ContactSection } from "./Sections";
import { byCategory, productHref, seasonLabel, type Product } from "@/lib/products";
import { site, social } from "@/lib/site";

const categoryLabel = (p: Product) => (p.category === "frescos" ? "Frescos" : "Congelados IQF");
const listHref = (p: Product) => (p.category === "frescos" ? "/productos" : "/productos-congelados");

const TITLES: Record<string, string> = {
  "frescos/cerezas": "Cerezas frescas de exportación desde Chile",
  "frescos/ciruela": "Ciruelas frescas de exportación desde Chile",
  "frescos/granada": "Granadas frescas de exportación desde Perú",
  "frescos/manzana": "Manzanas frescas de exportación desde Chile",
  "frescos/arandano": "Arándanos frescos de exportación desde Chile y Perú",
  "frescos/kiwi": "Kiwi fresco de exportación desde Chile",
  "frescos/uva": "Uva de mesa de exportación desde Chile y Perú",
  "congelados/arandanos": "Arándanos congelados IQF de Chile",
  "congelados/kiwi": "Kiwi congelado IQF de Chile",
  "congelados/frutilla": "Frutillas congeladas IQF de Chile",
  "congelados/cereza": "Cerezas congeladas IQF de Chile",
  "congelados/mora": "Moras congeladas IQF de Chile",
  "congelados/uva": "Uva congelada IQF de Chile",
  "congelados/frambuesa": "Frambuesas congeladas IQF de Chile",
};

export function productTitle(p: Product) {
  return TITLES[`${p.category}/${p.slug}`] ?? p.name;
}

export function productMetadata(p: Product): Metadata {
  const title = productTitle(p);
  const season = p.seasons.map((s) => `${s.origin}: ${seasonLabel(s)}`).join("; ");
  const description = `${p.tagline} ${p.varieties ? `Variedades: ${p.varieties.slice(0, 5).join(", ")}. ` : ""}Temporada ${season}. Cotiza con CFS.`;
  const url = productHref(p);
  const image = `/media/og-${p.image}.jpg`;
  return {
    title,
    description,
    alternates: { canonical: url },
    ...social({ url, title: `${title} | CFS`, description, image }),
  };
}

export default function ProductDetail({ product: p }: { product: Product }) {
  const related = byCategory(p.category).filter((x) => x !== p);
  const quoteHref = "#cotizar";
  const origins = Array.from(new Set(p.seasons.map((s) => s.origin)));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productTitle(p),
      description: p.description,
      image: `${site.url}/media/${p.image}.webp`,
      brand: { "@type": "Brand", name: "CFS Central Frutícola Sur" },
      category: p.category === "frescos" ? "Fruta fresca" : "Fruta congelada IQF",
      countryOfOrigin: origins.map((o) => ({ "@type": "Country", name: o })),
      url: `${site.url}${productHref(p)}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: categoryLabel(p), item: `${site.url}${listHref(p)}` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}${productHref(p)}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="wrap overflow-x-clip pt-4 pb-14 sm:pt-8 md:pb-24">
        <nav aria-label="Ruta" className="text-sm text-niebla">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/" className="hover:text-tinta hover:underline">Inicio</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={listHref(p)} className="hover:text-tinta hover:underline">{categoryLabel(p)}</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-tinta">{p.name}</li>
          </ol>
        </nav>

        <div className="mt-5 grid items-center gap-7 sm:mt-8 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="relative order-first -mx-5 sm:mx-0 lg:order-last">
            <span className="absolute -inset-3 -z-10 hidden translate-x-4 translate-y-4 rounded-[2.25rem] opacity-90 sm:block" style={{ background: p.color }} aria-hidden />
            <Photo
              name={p.image}
              alt={`${p.name} ${p.category === "congelados" ? "congeladas" : "frescas"} de CFS`}
              priority
              className="aspect-[4/3] sm:aspect-[3000/1580] sm:rounded-[2rem]"
              sizes="(min-width:1024px) 55vw, 100vw"
            />
          </div>
          <div>
            <h1 className="display-xl">{p.name}</h1>
            <p className="mt-3 text-niebla">
              <i>{p.scientific}</i>{" · "}{p.category === "frescos" ? "Fruta fresca" : "Congelado IQF"} de {origins.join(" y ")}
            </p>
            <p className="lead mt-5 max-w-xl sm:mt-6">{p.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Temporada">
              {p.seasons.map((s) => (
                <li key={s.origin} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.92rem] shadow-[inset_0_0_0_1px_var(--color-linea)]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} aria-hidden />
                  <span>
                    <span className="font-semibold">{s.origin}:</span> {seasonLabel(s)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Link href={quoteHref} className="btn btn-rojo justify-center text-lg">Cotizar {p.name.toLowerCase()}</Link>
              <a href={site.catalog} download className="btn btn-linea justify-center text-lg text-huerto">Descargar catálogo</a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ficha" className="bg-white">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <h2 id="ficha" className="display-md">Sobre {p.category === "frescos" ? "la fruta" : "el producto"}</h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-niebla">{p.description}</p>
          </div>
          <dl className="space-y-8 self-start">
            {p.varieties && (
              <div>
                <dt className="font-display text-lg font-bold">Variedades</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {p.varieties.map((v) => (
                    <span key={v} className="rounded-full bg-hoja px-3.5 py-1.5 text-[0.95rem] font-medium ring-1 ring-linea">{v}</span>
                  ))}
                </dd>
              </div>
            )}
            {p.format && (
              <div>
                <dt className="font-display text-lg font-bold">Formato</dt>
                <dd className="mt-2 text-niebla">{p.format}</dd>
              </div>
            )}
            <div>
              <dt className="font-display text-lg font-bold">Origen</dt>
              <dd className="mt-2 text-niebla">{origins.join(" y ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="temporada" className="wrap py-16 md:py-24">
        <h2 id="temporada" className="display-md">Calendario de temporada</h2>
        <p className="mt-3 max-w-2xl text-niebla">
          {p.seasons.length === 1 && p.seasons[0].months.length === 12
            ? "Al ser congelado, lo despachamos durante todo el año."
            : "Meses en que despachamos esta fruta. El mes actual aparece marcado en rojo."}
        </p>
        <div className="mt-10 rounded-3xl bg-white p-6 sm:p-10 shadow-[inset_0_0_0_1px_var(--color-linea)]">
          <SeasonStrip product={p} />
        </div>
        <p className="mt-4 text-sm text-niebla">
          ¿Necesitas fechas exactas? <Link href={quoteHref} className="font-semibold text-verde underline underline-offset-4">Consulta la disponibilidad</Link> o mira el{" "}
          <Link href="/calendario" className="font-semibold text-verde underline underline-offset-4">calendario de todas las frutas</Link>.
        </p>
      </section>

      <section aria-labelledby="relacionados" className="wrap pb-8">
        <h2 id="relacionados" className="display-md">Otros {p.category === "frescos" ? "frescos" : "congelados IQF"}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={productHref(r)} className="group block">
                <Photo name={r.image} alt="" className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 16vw, 45vw" />
                <span className="mt-2 block font-display text-lg font-bold group-hover:underline underline-offset-4">{r.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href={p.category === "frescos" ? "/productos-congelados" : "/productos"} className="font-semibold text-verde underline underline-offset-4">
            Ver {p.category === "frescos" ? "línea congelada IQF" : "fruta fresca"}
          </Link>
        </p>
      </section>

      <CatalogBand />
      <ContactSection title={`Cotiza ${p.name.toLowerCase()} con CFS`} product={p.formName} />
      <MobileQuoteBar label={`Cotizar ${p.name.toLowerCase()}`} href={quoteHref} color={p.color} name={p.name} />
    </>
  );
}
