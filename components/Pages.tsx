// Páginas compartidas por ambos idiomas. Las rutas en app/(es) y app/en solo eligen el idioma.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HomeHero from "./HomeHero";
import ProductShowcase from "./ProductShowcase";
import SeasonMatrix from "./SeasonMatrix";
import ProductGrid, { PageIntro } from "./ProductList";
import ProductDetail, { productMetadata } from "./ProductDetail";
import Photo from "./Photo";
import JsonLd from "./JsonLd";
import { CatalogBand, CompanyIntro, ContactSection, NewsTeaser, Respaldo, SectionHead } from "./Sections";
import { alternates, route, ROUTES, t, type Lang, type RouteKey } from "@/lib/i18n";
import { content, site, social } from "@/lib/site";
import { byCategory, findProduct, type Category } from "@/lib/products";
import { formatDate, postHref, posts } from "@/lib/news";

/* ---------- Metadatos ---------- */

const META: Record<Exclude<RouteKey, "home">, Record<Lang, { title: string; description: string }>> = {
  company: {
    es: {
      title: "Empresa, campos y certificaciones",
      description: "Central Frutícola Sur: más de 20 años produciendo y exportando fruta premium desde Chile y Perú, con certificaciones PrimusGFS, GLOBALG.A.P. y GRASP.",
    },
    en: {
      title: "Company, orchards and certifications",
      description: "Central Frutícola Sur: more than 20 years growing and exporting premium fruit from Chile and Peru, certified PrimusGFS, GLOBALG.A.P. and GRASP.",
    },
  },
  products: {
    es: {
      title: "Productos: fruta fresca y congelada IQF de exportación",
      description: "Cerezas, ciruelas, granadas, manzanas, arándanos, kiwi y uva frescos, y siete líneas de fruta congelada IQF. Conoce variedades y temporadas de cada fruta CFS.",
    },
    en: {
      title: "Products: fresh and IQF frozen fruit for export",
      description: "Fresh cherries, plums, pomegranates, apples, blueberries, kiwifruit and grapes, plus seven IQF frozen lines. See varieties and seasons for every CFS fruit.",
    },
  },
  frozen: {
    es: {
      title: "Fruta congelada IQF de Chile para la industria",
      description: "Arándanos, kiwi, frutilla, cereza, mora, uva y frambuesa congelados IQF: frutos íntegros y separados, calidad estandarizada y despacho durante todo el año.",
    },
    en: {
      title: "IQF frozen fruit from Chile for the food industry",
      description: "IQF frozen blueberries, kiwifruit, strawberries, cherries, blackberries, grapes and raspberries: whole, individually frozen fruit with standardized quality.",
    },
  },
  seasons: {
    es: {
      title: "Calendario de temporadas de fruta de exportación",
      description: "Revisa en qué meses CFS despacha cerezas, uvas, manzanas, ciruelas, granadas, kiwi y arándanos desde Chile y Perú, y su línea de fruta congelada IQF.",
    },
    en: {
      title: "Export fruit season calendar",
      description: "See which months CFS ships cherries, grapes, apples, plums, pomegranates, kiwifruit and blueberries from Chile and Peru, plus its IQF frozen line.",
    },
  },
  news: {
    es: { title: "Noticias", description: "Ferias, temporadas y novedades de CFS Central Frutícola Sur." },
    en: { title: "News", description: "Trade fairs, seasons and news from CFS Central Frutícola Sur." },
  },
  contact: {
    es: {
      title: "Cotizar fruta de exportación",
      description: "Solicita una cotización de cerezas, uvas, manzanas, arándanos, granadas, kiwi o fruta congelada IQF. Un ejecutivo de CFS te responde con disponibilidad y condiciones.",
    },
    en: {
      title: "Request a quote for export fruit",
      description: "Request a quote for cherries, grapes, apples, blueberries, pomegranates, kiwifruit or IQF frozen fruit. A CFS sales executive will reply with availability and terms.",
    },
  },
};

export function pageMetadata(key: RouteKey, lang: Lang, image?: string): Metadata {
  const paths = { es: ROUTES[key].es, en: ROUTES[key].en };
  if (key === "home") {
    const c = content[lang];
    return {
      title: { absolute: c.title },
      description: c.description,
      alternates: alternates(lang, paths),
      ...social({ url: paths[lang], title: c.title, description: c.description, lang }),
    };
  }
  const m = META[key][lang];
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, paths),
    ...social({ url: paths[lang], title: `${m.title} | CFS`, description: m.description, lang, image }),
  };
}

/* ---------- Páginas ---------- */

export function HomePage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <HomeHero lang={lang} />
      <CompanyIntro lang={lang} />

      <section aria-labelledby="productos" className="wrap py-20 md:py-28">
        <SectionHead id="productos" title={d.productsTitle} intro={d.productsLead} />
        <div className="mt-10">
          <ProductShowcase lang={lang} />
        </div>
      </section>

      <section aria-labelledby="temporadas" className="bg-hoja-2">
        <div className="wrap py-20 md:py-28">
          <SectionHead id="temporadas" title={d.seasonsTitle} intro={d.seasonsLead} />
          <div className="mt-10">
            <SeasonMatrix lang={lang} />
          </div>
        </div>
      </section>

      <Respaldo lang={lang} />
      <CatalogBand lang={lang} />
      <NewsTeaser lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}

export function CompanyPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageIntro title={d.companyTitle(site.years)} intro={d.companyLead} />
      <section className="wrap pb-4">
        <Photo name="huerto" alt={d.companyAlt} className="aspect-[4/3] rounded-[2rem] sm:aspect-[21/9]" sizes="100vw" priority />
      </section>
      <CompanyIntro lang={lang} withLink={false} />
      <Respaldo lang={lang} />
      <CatalogBand lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}

export function ProductsPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageIntro title={d.ourProducts} intro={d.ourProductsLead}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#frescos" className="btn btn-linea text-huerto">{d.fresh}</a>
          <Link href={route("frozen", lang)} className="btn btn-linea text-huerto">{d.frozen}</Link>
          <a href={site.catalog} download className="btn btn-rojo">{d.downloadCatalog}</a>
        </div>
      </PageIntro>

      <section aria-labelledby="frescos" className="wrap pb-20">
        <h2 id="frescos" className="display-lg scroll-mt-24">{d.fresh}</h2>
        <div className="mt-10"><ProductGrid lang={lang} category="frescos" headingLevel={3} /></div>
      </section>

      <section aria-labelledby="congelados" className="bg-white">
        <div className="wrap py-20">
          <h2 id="congelados" className="display-lg scroll-mt-24">{d.frozen}</h2>
          <p className="lead mt-4 max-w-2xl text-niebla">{d.frozenLead}</p>
          <div className="mt-10"><ProductGrid lang={lang} category="congelados" headingLevel={3} /></div>
        </div>
      </section>

      <CatalogBand lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}

export function FrozenPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageIntro title={d.frozenPageTitle} intro={d.frozenPageLead} />
      <section aria-label={d.frozen} className="wrap pb-16">
        <dl className="grid gap-6 border-y border-linea py-10 md:grid-cols-3">
          {d.frozenPoints.map((p) => (
            <div key={p.title}>
              <dt className="font-display text-xl font-bold">{p.title}</dt>
              <dd className="mt-2 text-niebla">{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-label={d.frozen} className="wrap pb-20">
        <ProductGrid lang={lang} category="congelados" />
      </section>
      <CatalogBand lang={lang} />
      <ContactSection lang={lang} title={d.frozenQuote} />
    </>
  );
}

export function SeasonsPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageIntro title={d.calendarPageTitle} intro={d.calendarPageLead} />
      <section aria-label={d.calendarPageTitle} className="wrap pb-24">
        <SeasonMatrix lang={lang} initial="todos" />
      </section>
      <ContactSection lang={lang} title={d.calendarQuote} />
    </>
  );
}

export function NewsPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageIntro title={d.newsTitle} intro={d.newsLead} />
      <section aria-label={d.newsTitle} className="wrap pb-24">
        <ul className="grid gap-10 md:grid-cols-2">
          {posts.map((post) => {
            const p = post[lang];
            return (
              <li key={post.slug}>
                <Link href={postHref(post, lang)} className="group block">
                  <Photo name={post.image} alt="" className="aspect-[16/10] rounded-3xl" sizes="(min-width:768px) 50vw, 100vw" />
                  <p className="mt-5 text-sm text-niebla">
                    <time dateTime={post.date}>{formatDate(post.date, lang)}</time> — {p.tag}
                  </p>
                  <h2 className="mt-2 display-md group-hover:underline underline-offset-4 decoration-2">{p.title}</h2>
                  <p className="mt-3 text-niebla">{p.excerpt}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export function postMetadata(slug: string, lang: Lang): Metadata {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const p = post[lang];
  return {
    title: p.title,
    description: p.excerpt,
    alternates: alternates(lang, { es: postHref(post, "es"), en: postHref(post, "en") }),
    ...social({ url: postHref(post, lang), title: p.title, description: p.excerpt, type: "article", lang }),
  };
}

export function PostPage({ slug, lang }: { slug: string; lang: Lang }) {
  const d = t(lang);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const p = post[lang];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: p.title,
          inLanguage: lang === "en" ? "en" : "es-CL",
          datePublished: post.date,
          image: `${site.url}/media/${post.image}.webp`,
          publisher: { "@type": "Organization", name: "CFS Central Frutícola Sur", logo: { "@type": "ImageObject", url: `${site.url}/media/logo.png` } },
        }}
      />
      <article className="wrap max-w-4xl pt-10 pb-24">
        <Link href={route("news", lang)} className="text-sm font-semibold text-verde underline underline-offset-4">{d.backNews}</Link>
        <p className="mt-8 text-niebla">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time> — {p.tag}
        </p>
        <h1 className="mt-3 display-lg">{p.title}</h1>
        <Photo name={post.image} alt={p.imageAlt} priority className="mt-10 aspect-[1179/756] rounded-3xl" sizes="(min-width:896px) 896px, 100vw" />
        <div className="prose-cfs mt-10 max-w-[68ch] text-lg leading-relaxed">
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
      <ContactSection lang={lang} />
    </>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <h1 className="sr-only">{d.contactPageTitle}</h1>
      <ContactSection lang={lang} title={d.contactPageTitle} />
    </>
  );
}

/* ---------- Fichas de producto ---------- */

export const productParams = (c: Category, lang: Lang) =>
  byCategory(c).map((p) => ({ slug: lang === "en" ? p.slugEn : p.slug }));

export function productPageMetadata(c: Category, slug: string, lang: Lang): Metadata {
  const product = findProduct(c, slug, lang);
  return product ? productMetadata(product, lang) : {};
}

export function ProductPage({ c, slug, lang }: { c: Category; slug: string; lang: Lang }) {
  const product = findProduct(c, slug, lang);
  if (!product) notFound();
  return <ProductDetail product={product} lang={lang} />;
}

export function NotFoundPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section className="wrap py-28">
      <h1 className="display-lg">{d.notFoundTitle}</h1>
      <p className="lead mt-4 max-w-xl text-niebla">{d.notFoundText}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={route("products", lang)} className="btn btn-rojo">{d.seeProducts}</Link>
        <Link href={route("contact", lang)} className="btn btn-linea text-huerto">{d.quote}</Link>
      </div>
    </section>
  );
}
