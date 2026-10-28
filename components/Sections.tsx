import Image from "next/image";
import Link from "next/link";
import Photo from "./Photo";
import ContactForm from "./ContactForm";
import { site, content } from "@/lib/site";
import { posts, formatDate, postHref } from "@/lib/news";
import { route, t, type Lang } from "@/lib/i18n";
import { joinAnd } from "@/lib/products";

export function SectionHead({ title, intro, id, light }: { title: string; intro?: string; id?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="display-lg">{title}</h2>
      {intro && <p className={`lead mt-4 ${light ? "text-white/80" : "text-niebla"}`}>{intro}</p>}
    </div>
  );
}

function FlagChile() {
  return (
    <svg viewBox="0 0 30 20" className="h-6 w-9 rounded-[3px] shadow-sm" aria-hidden>
      <rect width="30" height="20" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#d52b1e" />
      <rect width="10" height="10" fill="#0039a6" />
      <path d="M5 2.2l.9 2.7h2.8l-2.3 1.7.9 2.7L5 7.6 2.7 9.3l.9-2.7-2.3-1.7h2.8z" fill="#fff" />
    </svg>
  );
}
function FlagPeru() {
  return (
    <svg viewBox="0 0 30 20" className="h-6 w-9 rounded-[3px] shadow-sm" aria-hidden>
      <rect width="30" height="20" fill="#d91023" />
      <rect x="10" width="10" height="20" fill="#fff" />
    </svg>
  );
}

/** Quiénes somos + misión y visión. Va justo después de la portada. */
export function CompanyIntro({ lang, withLink = true }: { lang: Lang; withLink?: boolean }) {
  const d = t(lang);
  const c = content[lang];
  return (
    <section aria-labelledby="empresa" className="bg-white">
      <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="empresa" className="display-lg">{d.companyTitle(site.years)}</h2>
          <p className="lead mt-5 text-niebla">{d.companyLead}</p>
          {withLink && (
            <Link href={route("company", lang)} className="mt-7 inline-block font-semibold text-verde underline underline-offset-4 hover:text-huerto">
              {d.knowCompany}
            </Link>
          )}
        </div>
        <dl className="grid gap-4 self-start sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-3xl bg-hoja p-6 sm:p-8">
            <dt className="flex items-center gap-3 font-display text-2xl font-bold">
              <span className="h-2.5 w-2.5 rounded-full bg-verde" aria-hidden />
              {d.mission}
            </dt>
            <dd className="mt-3 text-[1.05rem] leading-relaxed text-niebla">{c.mission}</dd>
          </div>
          <div className="rounded-3xl bg-hoja p-6 sm:p-8">
            <dt className="flex items-center gap-3 font-display text-2xl font-bold">
              <span className="h-2.5 w-2.5 rounded-full bg-rojo" aria-hidden />
              {d.vision}
            </dt>
            <dd className="mt-3 text-[1.05rem] leading-relaxed text-niebla">{c.vision}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/** Origen de la fruta, certificaciones y mercados de destino. */
export function Respaldo({ lang }: { lang: Lang }) {
  const d = t(lang);
  const c = content[lang];
  return (
    <section aria-labelledby="respaldo" className="bg-huerto text-white">
      <div className="wrap py-16 md:py-28">
        <SectionHead id="respaldo" light title={d.fieldsTitle} intro={d.fieldsLead} />

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          <div className="rounded-3xl bg-white/[.06] p-7 ring-1 ring-white/10">
            <div className="flex items-center gap-3"><FlagChile /><h3 className="font-display text-2xl font-bold">Chile</h3></div>
            <p className="mt-3 text-white/80">{d.chileText}</p>
          </div>
          <div className="rounded-3xl bg-white/[.06] p-7 ring-1 ring-white/10">
            <div className="flex items-center gap-3"><FlagPeru /><h3 className="font-display text-2xl font-bold">{lang === "en" ? "Peru" : "Perú"}</h3></div>
            <p className="mt-3 text-white/80">{d.peruText}</p>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-8 md:mt-20 md:gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="display-md">{d.certTitle}</h3>
            <p className="mt-3 max-w-xl text-white/80">{d.certLead}</p>
            <dl className="mt-8 space-y-5">
              {c.certifications.map((cert) => (
                <div key={cert.name} className="grid gap-1 border-t border-white/15 pt-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-display text-lg font-bold">{cert.name}</dt>
                  <dd className="text-white/75">{cert.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-10">
            <Image src="/media/certificaciones.webp" alt={d.certAlt} width={1402} height={500} className="h-auto w-full" sizes="(min-width:1024px) 40vw, 90vw" />
          </div>
        </div>

        <div className="mt-14 grid items-center gap-8 md:mt-20 md:gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="order-2 lg:order-1 overflow-hidden rounded-3xl bg-white">
            <Image src="/media/mercados.webp" alt={d.marketsAlt} width={1800} height={948} className="h-auto w-full" sizes="(min-width:1024px) 45vw, 90vw" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="display-md">{d.marketsTitle}</h3>
            <p className="mt-3 max-w-xl text-white/80">{d.marketsText(joinAnd(c.markets, lang))}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.markets.map((m) => (
                <li key={m} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/15">{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CatalogBand({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section aria-labelledby="catalogo" className="wrap py-12 md:py-20">
      <div className="relative grid overflow-hidden rounded-[2rem] bg-rojo text-white md:grid-cols-[1.3fr_1fr]">
        <div className="relative z-10 p-6 sm:p-12">
          <h2 id="catalogo" className="display-lg">{d.catalogTitle}</h2>
          <p className="lead mt-4 max-w-lg text-white/90">{d.catalogLead}</p>
          <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <a href={site.catalog} download className="btn btn-blanco justify-center text-lg text-rojo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {d.downloadCatalog}
            </a>
            <a href={site.catalog} target="_blank" rel="noopener" className="btn btn-linea justify-center text-lg">
              {d.viewCatalog}
            </a>
          </div>
        </div>
        <Photo name="cerezas" alt="" className="min-h-[14rem] md:min-h-full" sizes="(min-width:768px) 40vw, 100vw" />
      </div>
    </section>
  );
}

export function NewsTeaser({ lang }: { lang: Lang }) {
  const d = t(lang);
  const post = posts[0];
  const p = post[lang];
  return (
    <section aria-labelledby="noticias" className="wrap py-12 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="noticias" className="display-lg">{d.newsTitle}</h2>
        <Link href={route("news", lang)} className="font-semibold text-verde underline underline-offset-4 hover:text-huerto">
          {d.allNews}
        </Link>
      </div>
      <Link href={postHref(post, lang)} className="group mt-8 grid overflow-hidden md:mt-10 rounded-3xl bg-white shadow-[inset_0_0_0_1px_var(--color-linea)] md:grid-cols-2">
        <Photo name={post.image} alt="" className="min-h-[16rem]" sizes="(min-width:768px) 50vw, 100vw" />
        <div className="p-6 sm:p-10">
          <p className="text-sm text-niebla">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time> — {p.tag}
          </p>
          <h3 className="mt-3 display-md group-hover:underline underline-offset-4 decoration-2">{p.title}</h3>
          <p className="mt-4 text-niebla">{p.excerpt}</p>
          <span className="mt-6 inline-block font-semibold text-verde">{d.readNews}</span>
        </div>
      </Link>
    </section>
  );
}

export function ContactSection({ lang, title, product }: { lang: Lang; title?: string; product?: string }) {
  const d = t(lang);
  return (
    <section id="cotizar" aria-labelledby="cotizar-titulo" className="scroll-mt-16 bg-hoja-2">
      <div className="wrap grid gap-8 py-14 md:gap-12 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="cotizar-titulo" className="display-lg">{title ?? d.contactTitle}</h2>
          <p className="lead mt-4 text-niebla">{d.contactLead}</p>
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5">
            <div>
              <dt className="text-sm text-niebla">{d.email}</dt>
              <dd><a href={`mailto:${site.email}`} className="font-display text-2xl font-bold hover:underline underline-offset-4">{site.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm text-niebla">{d.phone}</dt>
              <dd><a href={site.phoneHref} className="font-display text-2xl font-bold hover:underline underline-offset-4">{site.phone}</a></dd>
            </div>
          </dl>
        </div>
        <ContactForm lang={lang} defaultProduct={product} />
      </div>
    </section>
  );
}
