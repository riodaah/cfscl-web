"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Photo from "./Photo";
import { byCategory, productHref, seasonLabel, type Category } from "@/lib/products";

export default function ProductShowcase({ initial = "frescos" }: { initial?: Category }) {
  const [cat, setCat] = useState<Category>(initial);
  const reduce = useReducedMotion();
  const items = byCategory(cat);

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
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((p, i) => (
            <li key={p.slug} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i >= 5 ? "lg:col-span-2" : ""}>
              <Link
                href={productHref(p)}
                className="group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-3xl text-white"
              >
                <Photo
                  name={p.image}
                  alt=""
                  className="!absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />
                <span className="relative p-5 sm:p-6">
                  <span className={`block font-display font-bold tracking-tight ${i === 0 ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
                    {p.name}
                  </span>
                  {i === 0 && <span className="mt-2 block max-w-md text-white/85">{p.tagline}</span>}
                  <span className="mt-2 block text-sm text-white/80">
                    {p.seasons.map((s) => `${s.origin}: ${seasonLabel(s)}`).join(" · ")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
