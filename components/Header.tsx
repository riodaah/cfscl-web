"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

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
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) =>
    href === "/productos" ? pathname.startsWith("/productos") : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-hoja/90 backdrop-blur-md shadow-[0_1px_0_var(--color-linea)]" : "bg-hoja"
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="CFS Central Frutícola Sur, inicio">
          <Image src="/media/logo.png" alt="" width={48} height={46} unoptimized className="h-11 w-auto" priority />
          <span className="hidden sm:block leading-tight">
            <span className="block font-display font-bold text-[1.05rem] tracking-tight">Central Frutícola Sur</span>
            <span className="block text-[0.8rem] text-niebla">Chile · Perú</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:flex items-center gap-1">
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

        <button
          type="button"
          className="md:hidden -mr-2 grid h-11 w-11 place-items-center rounded-full hover:bg-hoja-2"
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

      <div
        id="menu-movil"
        hidden={!open}
        className="md:hidden fixed inset-x-0 top-[4.5rem] bottom-0 bg-hoja px-5 pt-6 pb-10 overflow-y-auto"
      >
        <nav aria-label="Móvil" className="flex flex-col">
          {[{ href: "/", label: "Inicio" }, ...nav, { href: "/contacto", label: "Contacto" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-3xl font-bold tracking-tight py-3 border-b border-linea"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contacto" className="btn btn-rojo mt-8 w-full justify-center text-lg">
          Cotizar fruta
        </Link>
      </div>
    </header>
  );
}
