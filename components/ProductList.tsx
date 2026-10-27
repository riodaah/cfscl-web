import Link from "next/link";
import Photo from "./Photo";
import { byCategory, productHref, seasonLabel, type Category } from "@/lib/products";

export function PageIntro({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <header className="wrap pt-10 pb-8 md:pt-20 md:pb-14">
      <h1 className="display-xl max-w-5xl">{title}</h1>
      {intro && <p className="lead mt-6 max-w-2xl text-niebla">{intro}</p>}
      {children}
    </header>
  );
}

export default function ProductGrid({ category, headingLevel = 2 }: { category: Category; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3">
      {byCategory(category).map((p) => (
        <li key={p.slug}>
          <Link href={productHref(p)} className="group block">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
              <Photo
                name={p.image}
                alt=""
                className="aspect-square sm:aspect-[3/2] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                sizes="(min-width:1024px) 33vw, 50vw"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-4 sm:gap-4">
              <H className="font-display text-xl sm:text-2xl font-bold tracking-tight group-hover:underline underline-offset-4">{p.name}</H>
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden />
            </div>
            <p className="mt-1.5 hidden text-niebla sm:block">{p.tagline}</p>
            <p className="mt-1 text-[0.82rem] leading-snug text-niebla sm:mt-2 sm:text-sm sm:font-medium sm:text-tinta">
              {p.seasons.map((s) => `${s.origin}: ${seasonLabel(s)}`).join(" · ")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
