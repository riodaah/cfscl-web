"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Photo from "./Photo";
import { byCategory, productHref, seasonLabel, type Category } from "@/lib/products";

export default function ProductShowcase({ initial = "frescos" }: { initial?: Category }) {
  const [cat, setCat] = useState<Category>(initial);
  const reduce = useReducedMotion();
  const items = byCategory(cat);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + 12))));
  };
  useEffect(() => {
    setActive(0);
    track.current?.scrollTo({ left: 0 });
  }, [cat]);

  return (
    <div>
      <div role="group" aria-label="Tipo de producto" className="inline-flex rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--color-linea)]">
        {(["frescos", "congelados"] as Category[]).map((c) => (
          <button
            key={c}
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${cat === c ? "bg-huerto text-white" : "text-niebla hover:text-tinta"}`}
          >
            {c === "frescos" ? "Frescos" : "Congelados IQF"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={cat}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          ref={track}
          onScroll={onScroll}
          className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        >
          {items.map((p, i) => (
            <li key={p.slug} className={`w-[82%] shrink-0 snap-start sm:w-auto ${i === 0 ? "sm:col-span-2 lg:row-span-2" : i >= 5 ? "lg:col-span-2" : ""}`}>
              <Link
                href={productHref(p)}
                className="group relative flex h-[25rem] flex-col justify-end overflow-hidden rounded-3xl text-white sm:h-full sm:min-h-[15rem]"
              >
                <Photo
                  name={p.image}
                  alt=""
                  className="!absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  sizes={i === 0 ? "(min-width:1024px) 50vw, (min-width:640px) 100vw, 82vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 82vw"}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />
                <span className="relative p-5 sm:p-6">
                  <span className={`block font-display text-4xl font-bold tracking-tight ${i === 0 ? "sm:text-5xl" : "sm:text-2xl"}`}>
                    {p.name}
                  </span>
                  <span className={`mt-2 block max-w-md text-white/85 ${i === 0 ? "" : "sm:hidden"}`}>{p.tagline}</span>
                  <span className="mt-2 block text-sm text-white/80">
                    {p.seasons.map((s) => `${s.origin}: ${seasonLabel(s)}`).join(" · ")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {/* Indicador del carrusel en celular */}
      <div className="mt-4 flex items-center justify-between sm:hidden">
        <div className="flex gap-1.5" aria-hidden>
          {items.map((p, i) => (
            <span key={p.slug} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-huerto" : "w-1.5 bg-linea"}`} />
          ))}
        </div>
        <Link href={cat === "frescos" ? "/productos" : "/productos-congelados"} className="font-semibold text-verde underline underline-offset-4">
          Ver todos
        </Link>
      </div>
    </div>
  );
}
