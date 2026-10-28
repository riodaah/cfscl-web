"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MONTHS, MONTHS_LONG, originLabel, seasonLabel, type Product } from "@/lib/products";
import { t, type Lang } from "@/lib/i18n";
import { cellShape } from "./SeasonMatrix";

export default function SeasonStrip({ product, lang }: { product: Product; lang: Lang }) {
  const d = t(lang);
  const names = MONTHS_LONG[lang];
  const reduce = useReducedMotion();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(new Date().getMonth() + 1), []);

  return (
    <div className="space-y-9">
      {product.seasons.map((season) => {
        const inSeasonNow = now ? season.months.includes(now) : null;
        const origin = originLabel(season.origin, lang);
        return (
          <div key={season.origin}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-xl font-bold">{d.seasonOf(origin)}</h3>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-niebla">
                {seasonLabel(season, lang)}
                {inSeasonNow !== null && (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                      inSeasonNow ? "bg-verde text-white" : "bg-hoja-2 text-niebla"
                    }`}
                  >
                    {inSeasonNow ? d.inSeasonNow : d.outOfSeason(names[now! - 1])}
                  </span>
                )}
              </p>
            </div>

            {/* Celular: 2 filas de 6 meses, nombres completos y fácil de leer */}
            <ol className="mt-4 grid grid-cols-6 gap-1.5 sm:hidden" aria-label={d.monthsOf(origin)}>
              {MONTHS[lang].map((m, i) => {
                const month = i + 1;
                const shape = cellShape(season, month);
                const isNow = month === now;
                const fill = shape
                  ? shape.half === "left"
                    ? `linear-gradient(90deg, ${product.color} 50%, color-mix(in oklab, ${product.color} 30%, white) 50%)`
                    : shape.half === "right"
                      ? `linear-gradient(90deg, color-mix(in oklab, ${product.color} 30%, white) 50%, ${product.color} 50%)`
                      : shape.faded
                        ? `color-mix(in oklab, ${product.color} 55%, white)`
                        : product.color
                  : undefined;
                return (
                  <motion.li
                    key={m}
                    initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative grid h-14 place-items-center rounded-xl text-[0.9rem] font-semibold ${
                      shape ? "text-white" : "bg-hoja text-niebla"
                    } ${isNow ? "ring-2 ring-rojo ring-offset-2 ring-offset-white" : ""}`}
                    style={fill ? { background: fill } : undefined}
                  >
                    <span aria-hidden>{m}</span>
                    {isNow && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-rojo px-1.5 text-[0.6rem] font-bold leading-4 text-white" aria-hidden>
                        {d.today}
                      </span>
                    )}
                    <span className="sr-only">
                      {names[i]}: {shape ? (shape.half || shape.faded ? d.monthPartial : d.monthAvailable) : d.monthNone}
                      {isNow ? d.currentMonth : ""}
                    </span>
                  </motion.li>
                );
              })}
            </ol>

            {/* Tablet y escritorio: barra continua */}
            <ol className="mt-4 hidden grid-cols-12 gap-y-2 sm:grid" aria-label={d.monthsOf(origin)}>
              {MONTHS[lang].map((m, i) => {
                const month = i + 1;
                const shape = cellShape(season, month);
                return (
                  <li key={m} className="relative flex flex-col items-center">
                    <div className="relative h-11 w-full">
                      <span className="absolute inset-x-[18%] top-1/2 h-[2px] -translate-y-1/2 rounded bg-linea" aria-hidden />
                      {shape && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-y-0"
                          style={{
                            background: product.color,
                            opacity: shape.faded ? 0.45 : undefined,
                            left: shape.half === "right" ? "50%" : shape.joinLeft ? 0 : "8%",
                            right: shape.half === "left" ? "50%" : shape.joinRight ? 0 : "8%",
                            borderTopLeftRadius: shape.joinLeft ? 0 : 999,
                            borderBottomLeftRadius: shape.joinLeft ? 0 : 999,
                            borderTopRightRadius: shape.joinRight ? 0 : 999,
                            borderBottomRightRadius: shape.joinRight ? 0 : 999,
                            transformOrigin: "left center",
                          }}
                          initial={reduce ? false : { scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      {month === now && (
                        <span className="absolute -top-2 -bottom-1 left-1/2 w-[2px] -translate-x-1/2 rounded bg-rojo" aria-hidden />
                      )}
                    </div>
                    <span className={`text-sm ${shape ? "font-semibold text-tinta" : "text-niebla"}`} aria-hidden>
                      {m}
                    </span>
                    <span className="sr-only">
                      {names[i]}: {shape ? (shape.half || shape.faded ? d.monthPartial : d.monthAvailable) : d.monthNone}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
