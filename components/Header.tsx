"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
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

  const isActive = (href: string) =>
    href === "/productos" ? pathname.startsWith("/productos") : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          open ? "bg-hoja" : scrolled ? "bg-hoja/90 backdrop-blur-md shadow-[0_1px_0_var(--color-linea)]" : "bg-hoja"
        }`}
      >
        <div className="wrap flex h-16 md:h-[4.5rem] items-center justify-between gap-3 md:gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="CFS Central Frutícola Sur, inicio">
            <Image src="/media/logo.png" alt="" width={48} height={46} unoptimized className="h-10 md:h-11 w-auto shrink-0" priority />
            <span className="leading-tight min-w-0">
              <span className="block truncate font-display font-bold text-[0.95rem] sm:text-[1.05rem] tracking-tight">Central Frutícola Sur</span>
              <span className="block text-[0.75rem] sm:text-[0.8rem] text-niebla">Chile · Perú</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.98rem] font-medium transition-colors ${
                  isActive(item.href) ? "bg-huerto text-white" : "hover:bg-hoja-2"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contacto" className="btn btn-rojo ml-3">
              Cotizar fruta
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            <Link href="/contacto" className="btn btn-rojo !px-4 !py-2.5 text-[0.95rem]">
              Cotizar
            </Link>
            <button
              type="button"
              className="-mr-2 grid h-11 w-11 place-items-center rounded-full hover:bg-hoja-2"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
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
        <nav aria-label="Móvil" className="flex flex-col">
          {[{ href: "/", label: "Inicio" }, ...nav, { href: "/contacto", label: "Contacto" }].map((item) => {
            const active = item.href === "/" ? pathname === "/" : isActive(item.href);
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
        </nav>
        <div className="mt-8 grid gap-3">
          <Link href="/contacto" className="btn btn-rojo justify-center text-lg">Cotizar fruta</Link>
          <a href={site.catalog} download className="btn btn-linea justify-center text-lg text-huerto">Descargar catálogo</a>
        </div>
        <p className="mt-8 text-niebla">
          <a href={`mailto:${site.email}`} className="block py-1 font-medium text-tinta">{site.email}</a>
          <a href={site.phoneHref} className="block py-1 font-medium text-tinta">{site.phone}</a>
        </p>
      </div>
    </>
  );
}
