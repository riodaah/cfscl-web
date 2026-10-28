"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, NAV_KEYS } from "@/lib/site";
import { route, t, type Lang } from "@/lib/i18n";
import { switchPath } from "@/lib/paths";

function LangSwitch({ lang, pathname, className = "" }: { lang: Lang; pathname: string; className?: string }) {
  const other: Lang = lang === "es" ? "en" : "es";
  return (
    // <a> en vez de <Link>: cada idioma tiene su propio layout raíz, así que se recarga la página igual
    <a
      href={switchPath(pathname, other)}
      hrefLang={other === "en" ? "en" : "es-CL"}
      lang={other === "en" ? "en" : "es"}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.92rem] font-semibold hover:bg-hoja-2 ${className}`}
      aria-label={other === "en" ? "View this page in English" : "Ver esta página en español"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </svg>
      {t(lang).langSwitchShort}
    </a>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const d = t(lang);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = NAV_KEYS.map((k) => ({ href: route(k, lang), label: d.nav[k], key: k }));
  const isActive = (key: string, href: string) =>
    key === "products"
      ? pathname.startsWith(route("products", lang)) || pathname.startsWith(route("frozen", lang))
      : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          open ? "bg-hoja" : scrolled ? "bg-hoja/90 backdrop-blur-md shadow-[0_1px_0_var(--color-linea)]" : "bg-hoja"
        }`}
      >
        <div className="wrap flex h-16 md:h-[4.5rem] items-center justify-between gap-3 md:gap-6">
          <Link href={route("home", lang)} className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={d.homeLabel}>
            <Image src="/media/logo.png" alt="" width={48} height={46} unoptimized className="h-10 md:h-11 w-auto shrink-0" priority />
            <span className="hidden leading-tight min-w-0 min-[480px]:block">
              <span className="block truncate font-display font-bold text-[0.95rem] sm:text-[1.05rem] tracking-tight">Central Frutícola Sur</span>
              <span className="block text-[0.75rem] sm:text-[0.8rem] text-niebla">{d.tagline}</span>
            </span>
          </Link>

          <nav aria-label={lang === "en" ? "Main" : "Principal"} className="hidden lg:flex items-center gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.key, item.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.98rem] font-medium transition-colors ${
                  isActive(item.key, item.href) ? "bg-huerto text-white" : "hover:bg-hoja-2"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LangSwitch lang={lang} pathname={pathname} className="ml-1" />
            <Link href={route("contact", lang)} className="btn btn-rojo ml-2">
              {d.quote}
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 lg:hidden">
            <LangSwitch lang={lang} pathname={pathname} className="!px-2.5" />
            <Link href={route("contact", lang)} className="btn btn-rojo !px-4 !py-2.5 text-[0.95rem]">
              {d.quoteShort}
            </Link>
            <button
              type="button"
              className="-mr-2 grid h-11 w-11 place-items-center rounded-full hover:bg-hoja-2"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? d.closeMenu : d.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-6" aria-hidden>
                <span className={`absolute left-0 h-0.5 w-6 bg-tinta transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-tinta transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-6 bg-tinta transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fuera del <header>: un ancestro con backdrop-filter rompe position: fixed */}
      <div
        id="menu-movil"
        hidden={!open}
        className="lg:hidden fixed inset-x-0 top-16 md:top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-hoja px-5 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]"
      >
        <nav aria-label={lang === "en" ? "Mobile" : "Móvil"} className="flex flex-col">
          {[{ href: route("home", lang), label: d.nav.home, key: "home" }, ...items, { href: route("contact", lang), label: d.nav.contact, key: "contact" }].map((item) => {
            const active = item.key === "home" ? pathname === item.href : isActive(item.key, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between border-b border-linea py-4 font-display text-[1.9rem] font-bold tracking-tight ${active ? "text-verde" : ""}`}
              >
                {item.label}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-niebla" aria-hidden>
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            );
          })}
          <a
            href={switchPath(pathname, lang === "es" ? "en" : "es")}
            hrefLang={lang === "es" ? "en" : "es-CL"}
            className="flex items-center justify-between border-b border-linea py-4 font-display text-[1.9rem] font-bold tracking-tight"
          >
            {d.langSwitch}
            <span className="text-base font-semibold text-niebla">{d.langSwitchShort}</span>
          </a>
        </nav>
        <div className="mt-8 grid gap-3">
          <Link href={route("contact", lang)} className="btn btn-rojo justify-center text-lg">{d.quote}</Link>
          <a href={site.catalog} download className="btn btn-linea justify-center text-lg text-huerto">{d.downloadCatalog}</a>
        </div>
        <p className="mt-8 text-niebla">
          <a href={`mailto:${site.email}`} className="block py-1 font-medium text-tinta">{site.email}</a>
          <a href={site.phoneHref} className="block py-1 font-medium text-tinta">{site.phone}</a>
        </p>
      </div>
    </>
  );
}
