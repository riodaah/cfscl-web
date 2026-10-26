import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { byCategory, productHref } from "@/lib/products";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-huerto text-white/85 mt-auto">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <div className="inline-flex rounded-2xl bg-white p-3">
            <Image src="/media/logo.png" alt="CFS Central Frutícola Sur" width={72} height={68} unoptimized className="h-16 w-auto" />
          </div>
          <p className="mt-5 text-[0.98rem] leading-relaxed">
            Desde el corazón de los valles chilenos, exportamos frutas premium con más de {site.years} años de excelencia,
            atención personalizada y frescura garantizada.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Frescos</h2>
          <ul className="mt-4 space-y-2">
            {byCategory("frescos").map((p) => (
              <li key={p.slug}>
                <Link className="hover:text-white hover:underline underline-offset-4" href={productHref(p)}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Congelados IQF</h2>
          <ul className="mt-4 space-y-2">
            {byCategory("congelados").map((p) => (
              <li key={p.slug}>
                <Link className="hover:text-white hover:underline underline-offset-4" href={productHref(p)}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-white">Contacto</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a className="hover:text-white hover:underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-white hover:underline underline-offset-4" href={site.phoneHref}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-white hover:underline underline-offset-4" href={site.catalog} download>
                Catálogo en PDF
              </a>
            </li>
          </ul>
          <Link href="/contacto" className="btn btn-blanco mt-6">
            Cotizar fruta
          </Link>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© {year} CFS Central Frutícola Sur · Chile y Perú</p>
          <p>
            <Link href="/empresa" className="hover:text-white">Certificaciones</Link>
            <span className="mx-2">/</span>
            <Link href="/calendario" className="hover:text-white">Temporadas</Link>
            <span className="mx-2">/</span>
            <Link href="/noticias" className="hover:text-white">Noticias</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
