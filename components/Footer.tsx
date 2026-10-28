import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { byCategory, productHref, tx } from "@/lib/products";
import { route, t, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const year = new Date().getFullYear();
  const link = "inline-block py-1 hover:text-white hover:underline underline-offset-4";
  return (
    <footer className="bg-huerto text-white/85 mt-auto">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-12 md:py-16">
        <div className="col-span-2 max-w-xs md:col-span-1">
          <div className="inline-flex rounded-2xl bg-white p-3">
            <Image src="/media/logo.png" alt="CFS Central Frutícola Sur" width={72} height={68} unoptimized className="h-16 w-auto" />
          </div>
          <p className="mt-5 text-[0.98rem] leading-relaxed">{d.footerAbout(site.years)}</p>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">{d.fresh}</h2>
          <ul className="mt-3 space-y-1">
            {byCategory("frescos").map((p) => (
              <li key={p.slug}>
                <Link className={link} href={productHref(p, lang)}>{tx(p, lang).name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">{d.frozen}</h2>
          <ul className="mt-3 space-y-1">
            {byCategory("congelados").map((p) => (
              <li key={p.slug}>
                <Link className={link} href={productHref(p, lang)}>{tx(p, lang).name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className="font-display text-lg text-white">{d.contactHeading}</h2>
          <ul className="mt-3 space-y-1">
            <li><a className={link} href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className={link} href={site.phoneHref}>{site.phone}</a></li>
            <li><a className={link} href={site.catalog} download>{d.catalogPdf}</a></li>
          </ul>
          <Link href={route("contact", lang)} className="btn btn-blanco mt-6">{d.quote}</Link>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© {year} {d.rights}</p>
          <p>
            <Link href={route("company", lang)} className="hover:text-white">{d.nav.company}</Link>
            <span className="mx-2">/</span>
            <Link href={route("seasons", lang)} className="hover:text-white">{d.nav.seasons}</Link>
            <span className="mx-2">/</span>
            <Link href={route("news", lang)} className="hover:text-white">{d.nav.news}</Link>
            <span className="mx-2">/</span>
            <a href={lang === "es" ? "/en" : "/"} hrefLang={lang === "es" ? "en" : "es-CL"} className="hover:text-white">{d.langSwitch}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
