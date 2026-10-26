"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MONTHS, MONTHS_LONG, seasonLabel, type Product } from "@/lib/products";
import { cellShape } from "./SeasonMatrix";

export default function SeasonStrip({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(new Date().getMonth() + 1), []);

  return (
    <div className="space-y-8">
      {product.seasons.map((season) => {
        const inSeasonNow = now ? season.months.includes(now) : null;
        return (
          <div key={season.origin}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-xl font-bold">Temporada {season.origin}</h3>
              <p className="text-niebla">
                {seasonLabel(season)}
                {inSeasonNow !== null && (
                  <span
                    className={`mt-2 sm:mt-0 sm:ml-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                      inSeasonNow ? "bg-verde text-white" : "bg-hoja-2 text-niebla"
                    }`}
                  >
                    {inSeasonNow ? "Disponible este mes" : `Fuera de temporada en ${MONTHS_LONG[now! - 1]}`}
                  </span>
                )}
              </p>
            </div>

            <ol className="mt-4 grid grid-cols-12 gap-y-2" aria-label={`Meses de temporada ${season.origin}`}>
              {MONTHS.map((m, i) => {
                const month = i + 1;
                const shape = cellShape(season, month);
                return (
                  <li key={m} className="relative flex flex-col items-center">
                    <div className="relative h-9 sm:h-11 w-full">
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
                    <span className={`text-[0.72rem] sm:text-sm ${shape ? "font-semibold text-tinta" : "text-niebla"}`}>
                      <span className="sm:hidden" aria-hidden>{m[0]}</span>
                      <span className="hidden sm:inline" aria-hidden>{m}</span>
                    </span>
                    <span className="sr-only">
                      {MONTHS_LONG[i]}: {shape ? (shape.half ? "disponible parte del mes" : "disponible") : "sin cosecha"}
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
