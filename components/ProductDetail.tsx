import Link from "next/link";
import type { Metadata } from "next";
import Photo from "./Photo";
import SeasonStrip from "./SeasonStrip";
import MobileQuoteBar from "./MobileQuoteBar";
import JsonLd from "./JsonLd";
import { CatalogBand, ContactSection } from "./Sections";
import { byCategory, joinAnd, originLabel, productHref, seasonLabel, seasonLine, tx, type Product } from "@/lib/products";
import { site, social } from "@/lib/site";
import { alternates, route, t, type Lang } from "@/lib/i18n";

const listKey = (p: Product) => (p.category === "frescos" ? "products" : "frozen") as "products" | "frozen";

export function productMetadata(p: Product, lang: Lang): Metadata {
  const d = t(lang);
  const x = tx(p, lang);
  const description = `${x.tagline} ${p.varieties ? `${d.varieties}: ${p.varieties.slice(0, 5).join(", ")}. ` : ""}${d.season} ${seasonLine(p, lang).replace(" · ", "; ")}.`;
  const url = productHref(p, lang);
  const image = `/media/og-${p.image}.jpg`;
  return {
    title: x.title,
    description,
    alternates: alternates(lang, { es: productHref(p, "es"), en: productHref(p, "en") }),
    ...social({ url, title: `${x.title} | CFS`, description, image, lang }),
  };
}

export default function ProductDetail({ product: p, lang }: { product: Product; lang: Lang }) {
  const d = t(lang);
  const x = tx(p, lang);
  const frozen = p.category === "congelados";
  const related = byCategory(p.category).filter((r) => r !== p);
  const quoteHref = "#cotizar";
  const origins = joinAnd(Array.from(new Set(p.seasons.map((s) => originLabel(s.origin, lang)))), lang);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: x.title,
      description: x.description,
      image: `${site.url}/media/${p.image}.webp`,
      brand: { "@type": "Brand", name: "CFS Central Frutícola Sur" },
      category: frozen ? d.frozenIqf : d.freshFruit,
      countryOfOrigin: Array.from(new Set(p.seasons.map((s) => s.origin))).map((o) => ({ "@type": "Country", name: originLabel(o, lang) })),
      url: `${site.url}${productHref(p, lang)}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: d.breadcrumbHome, item: `${site.url}${route("home", lang)}` },
        { "@type": "ListItem", position: 2, name: frozen ? d.frozen : d.fresh, item: `${site.url}${route(listKey(p), lang)}` },
        { "@type": "ListItem", position: 3, name: x.name, item: `${site.url}${productHref(p, lang)}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="wrap overflow-x-clip pt-4 pb-14 sm:pt-8 md:pb-24">
        <nav aria-label={lang === "en" ? "Breadcrumb" : "Ruta"} className="text-sm text-niebla">
          <ol className="flex flex-wrap gap-2">
            <li><Link href={route("home", lang)} className="hover:text-tinta hover:underline">{d.breadcrumbHome}</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={route(listKey(p), lang)} className="hover:text-tinta hover:underline">{frozen ? d.frozen : d.fresh}</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-tinta">{x.name}</li>
          </ol>
        </nav>

        <div className="mt-5 grid items-center gap-7 sm:mt-8 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="relative order-first -mx-5 sm:mx-0 lg:order-last">
            <span className="absolute -inset-3 -z-10 hidden translate-x-4 translate-y-4 rounded-[2.25rem] opacity-90 sm:block" style={{ background: p.color }} aria-hidden />
            <Photo
              name={p.image}
              alt={d.photoAlt(x.name, frozen)}
              priority
              className="aspect-[4/3] sm:aspect-[3000/1580] sm:rounded-[2rem]"
              sizes="(min-width:1024px) 55vw, 100vw"
            />
          </div>
          <div>
            <h1 className="display-xl">{x.name}</h1>
            <p className="mt-3 text-niebla">
              <i>{p.scientific}</i>{" · "}{frozen ? d.frozenIqf : d.freshFruit} {d.of} {origins}
            </p>
            <p className="lead mt-5 max-w-xl sm:mt-6">{x.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={d.season}>
              {p.seasons.map((s) => (
                <li key={s.origin} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.92rem] shadow-[inset_0_0_0_1px_var(--color-linea)]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} aria-hidden />
                  <span>
                    <span className="font-semibold">{originLabel(s.origin, lang)}:</span> {seasonLabel(s, lang)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Link href={quoteHref} className="btn btn-rojo justify-center text-lg">{d.quoteProduct(x.name)}</Link>
              <a href={site.catalog} download className="btn btn-linea justify-center text-lg text-huerto">{d.downloadCatalog}</a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ficha" className="bg-white">
        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <h2 id="ficha" className="display-md">{frozen ? d.aboutProduct : d.aboutFruit}</h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-niebla">{x.description}</p>
          </div>
          <dl className="space-y-8 self-start">
            {p.varieties && (
              <div>
                <dt className="font-display text-lg font-bold">{d.varieties}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {p.varieties.map((v) => (
                    <span key={v} className="rounded-full bg-hoja px-3.5 py-1.5 text-[0.95rem] font-medium ring-1 ring-linea">{v}</span>
                  ))}
                </dd>
              </div>
            )}
            {x.format && (
              <div>
                <dt className="font-display text-lg font-bold">{d.format}</dt>
                <dd className="mt-2 text-niebla">{x.format}</dd>
              </div>
            )}
            <div>
              <dt className="font-display text-lg font-bold">{d.origin}</dt>
              <dd className="mt-2 text-niebla">{origins}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="temporada" className="wrap py-16 md:py-24">
        <h2 id="temporada" className="display-md">{d.seasonCalendar}</h2>
        <p className="mt-3 max-w-2xl text-niebla">
          {p.seasons.length === 1 && p.seasons[0].months.length === 12 ? d.allYearNote : d.seasonNote}
        </p>
        <div className="mt-10 rounded-3xl bg-white p-6 sm:p-10 shadow-[inset_0_0_0_1px_var(--color-linea)]">
          <SeasonStrip product={p} lang={lang} />
        </div>
        <p className="mt-4 text-sm text-niebla">
          {d.exactDates} <Link href={quoteHref} className="font-semibold text-verde underline underline-offset-4">{d.checkAvailability}</Link> {d.orSee}{" "}
          <Link href={route("seasons", lang)} className="font-semibold text-verde underline underline-offset-4">{d.allFruitCalendar}</Link>.
        </p>
      </section>

      <section aria-labelledby="relacionados" className="wrap pb-8">
        <h2 id="relacionados" className="display-md">{frozen ? d.otherFrozen : d.otherFresh}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={productHref(r, lang)} className="group block">
                <Photo name={r.image} alt="" className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 16vw, 45vw" />
                <span className="mt-2 block font-display text-lg font-bold group-hover:underline underline-offset-4">{tx(r, lang).name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href={route(frozen ? "products" : "frozen", lang)} className="font-semibold text-verde underline underline-offset-4">
            {frozen ? d.seeFreshFruit : d.seeFrozenLine}
          </Link>
        </p>
      </section>

      <CatalogBand lang={lang} />
      <ContactSection lang={lang} title={d.quoteWith(x.name)} product={p.es.formName} />
      <MobileQuoteBar label={d.quoteProduct(x.name)} href={quoteHref} color={p.color} name={x.name} />
    </>
  );
}
