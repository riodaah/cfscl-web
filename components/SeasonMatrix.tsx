"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MONTHS, MONTHS_LONG, productHref, products, type Category, type Product, type Season } from "@/lib/products";

type Row = { product: Product; season: Season };
type Filter = "todos" | Category;

const filters: { id: Filter; label: string }[] = [
  { id: "frescos", label: "Frescos" },
  { id: "congelados", label: "Congelados" },
  { id: "todos", label: "Todos" },
];

/** Forma de la barra en cada mes: une meses contiguos y deja medio mes cuando la temporada parte o termina a mitad. */
export function cellShape(season: Season, m: number) {
  const has = (x: number) => season.months.includes(((x - 1 + 12) % 12) + 1);
  if (!has(m)) return null;
  const prev = has(m - 1) && m !== 1;
  const next = has(m + 1) && m !== 12;
  const partial = !!season.partial?.includes(m);
  // Mes parcial en el borde de la temporada: media barra. Dentro de la temporada: barra completa pero más clara.
  const half: "left" | "right" | null = partial && !(has(m - 1) && has(m + 1)) ? (has(m - 1) ? "left" : "right") : null;
  return {
    joinLeft: prev && half !== "right",
    joinRight: next && half !== "left",
    half,
    faded: partial,
  };
}

export default function SeasonMatrix({ initial = "frescos", compact = false }: { initial?: Filter; compact?: boolean }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [now, setNow] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => setNow(new Date().getMonth() + 1), []);
  const focus = hover ?? now;

  const rows: Row[] = useMemo(
    () =>
      products
        .filter((p) => filter === "todos" || p.category === filter)
        .flatMap((p) => p.seasons.map((season) => ({ product: p, season }))),
    [filter]
  );

  const availableNow = focus ? rows.filter((r) => r.season.months.includes(focus)) : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div role="group" aria-label="Tipo de producto" className="inline-flex rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--color-linea)]">
          {filters.map((f) => (
            <button
              key={f.id}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                filter === f.id ? "bg-huerto text-white" : "text-niebla hover:text-tinta"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-[0.95rem] text-niebla min-h-[1.5em]" aria-live="polite">
          {focus && (
            <>
              En {MONTHS_LONG[focus - 1]}:{" "}
              <strong className="text-tinta">
                {availableNow.length
                  ? Array.from(new Set(availableNow.map((r) => r.product.name.toLowerCase()))).join(", ")
                  : "sin despachos de esta línea"}
              </strong>
            </>
          )}
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_1px_var(--color-linea)]">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Meses de disponibilidad de cada fruta según su origen</caption>
          <colgroup>
            <col className={compact ? "w-[7.5rem] sm:w-[12rem]" : "w-[7.5rem] sm:w-[14rem]"} />
            {MONTHS.map((m) => (
              <col key={m} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-3 sm:px-5 py-4 text-sm font-semibold text-niebla">Fruta</th>
              {MONTHS.map((m, i) => {
                const month = i + 1;
                const isNow = month === now;
                return (
                  <th
                    key={m}
                    scope="col"
                    onMouseEnter={() => setHover(month)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setHover((h) => (h === month ? null : month))}
                    className={`relative cursor-pointer select-none py-4 text-center text-[0.72rem] sm:text-sm font-semibold transition-colors ${
                      month === focus ? "text-tinta" : "text-niebla"
                    }`}
                  >
                    <span className="sm:hidden" aria-hidden>{m[0]}</span>
                    <span className="hidden sm:inline">{m}</span>
                    <span className="sr-only sm:hidden">{MONTHS_LONG[i]}</span>
                    {isNow && (
                      <span className="absolute left-1/2 top-0.5 -translate-x-1/2 rounded-full bg-rojo px-1.5 text-[0.62rem] font-bold leading-4 text-white">
                        hoy
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ product, season }, idx) => {
              const showName = idx === 0 || rows[idx - 1].product !== product;
              return (
                <tr key={`${product.category}-${product.slug}-${season.origin}`} className={showName ? "border-t border-linea" : ""}>
                  <th scope="row" className="px-3 sm:px-5 py-2.5 align-middle font-normal">
                    {showName ? (
                      <Link href={productHref(product)} className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="font-display text-[0.98rem] sm:text-lg font-bold tracking-tight group-hover:underline underline-offset-4">
                          {product.name}
                        </span>
                        <span className="text-[0.75rem] sm:text-sm text-niebla">{season.origin}</span>
                      </Link>
                    ) : (
                      <span className="text-[0.75rem] sm:text-sm text-niebla sm:pl-[0.1rem]">{season.origin}</span>
                    )}
                    {filter === "todos" && showName && (
                      <span className="sr-only">{product.category === "congelados" ? " congelado" : " fresco"}</span>
                    )}
                  </th>
                  {MONTHS.map((m, i) => {
                    const month = i + 1;
                    const shape = cellShape(season, month);
                    return (
                      <td
                        key={m}
                        onMouseEnter={() => setHover(month)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setHover((h) => (h === month ? null : month))}
                        className={`relative h-11 p-0 transition-colors ${month === focus ? "bg-hoja" : ""}`}
                      >
                        {shape ? (
                          <span
                            className="absolute top-1/2 h-4 sm:h-5 -translate-y-1/2"
                            style={{
                              background: product.color,
                              opacity: shape.faded ? 0.45 : 1,
                              left: shape.half === "right" ? "50%" : shape.joinLeft ? 0 : "12%",
                              right: shape.half === "left" ? "50%" : shape.joinRight ? 0 : "12%",
                              borderTopLeftRadius: shape.joinLeft ? 0 : 999,
                              borderBottomLeftRadius: shape.joinLeft ? 0 : 999,
                              borderTopRightRadius: shape.joinRight ? 0 : 999,
                              borderBottomRightRadius: shape.joinRight ? 0 : 999,
                            }}
                          >
                            <span className="sr-only">{`${MONTHS_LONG[i]}: disponible${shape.half ? " parcialmente" : ""}`}</span>
                          </span>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-niebla">
        Tramos cortos o más claros: disponibilidad solo parte de ese mes. Las ventanas pueden variar según clima y cosecha; confirma
        disponibilidad con un ejecutivo.
      </p>
    </div>
  );
}
