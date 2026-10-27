"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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

/** Próximo mes (después de `from`) en que la fruta vuelve a estar disponible. */
function nextAvailable(p: Product, from: number) {
  for (let k = 1; k < 12; k++) {
    const m = ((from - 1 + k) % 12) + 1;
    if (p.seasons.some((s) => s.months.includes(m))) return m;
  }
  return null;
}

function MobileMonthView({ filter, month, setMonth, now }: { filter: Filter; month: number; setMonth: (m: number) => void; now: number | null }) {
  const chips = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Desplaza solo la fila de meses (no la página) para centrar el mes elegido.
    const box = chips.current;
    const el = box?.querySelector<HTMLElement>(`[data-m="${month}"]`);
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [month]);

  const groups = (filter === "todos" ? (["frescos", "congelados"] as Category[]) : [filter as Category]).map((cat) => {
    const list = products.filter((p) => p.category === cat);
    const available = list.filter((p) => p.seasons.some((s) => s.months.includes(month)));
    const rest = list.filter((p) => !available.includes(p));
    return { cat, available, rest };
  });

  return (
    <div className="md:hidden">
      <div
        ref={chips}
        role="group"
        aria-label="Elige un mes"
        className="relative -mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {MONTHS_LONG.map((name, i) => {
          const m = i + 1;
          const sel = m === month;
          return (
            <button
              key={name}
              data-m={m}
              aria-pressed={sel}
              onClick={() => setMonth(m)}
              className={`relative shrink-0 snap-center rounded-full px-4 py-2.5 text-[0.95rem] font-semibold capitalize transition-colors ${
                sel ? "bg-huerto text-white" : "bg-white text-tinta shadow-[inset_0_0_0_1px_var(--color-linea)]"
              }`}
            >
              {name}
              {m === now && (
                <span className="absolute -top-2 right-2 rounded-full bg-rojo px-1.5 text-[0.6rem] font-bold leading-4 text-white">hoy</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-6" aria-live="polite">
        {groups.map(({ cat, available, rest }) => (
          <section key={cat} className="overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_1px_var(--color-linea)]">
            <h3 className="flex items-baseline justify-between gap-3 border-b border-linea px-5 py-4">
              <span className="font-display text-xl font-bold">{cat === "frescos" ? "Frescos" : "Congelados IQF"}</span>
              <span className="text-sm font-normal text-niebla">
                {available.length} de {available.length + rest.length} en {MONTHS_LONG[month - 1]}
              </span>
            </h3>
            <ul>
              {[...available, ...rest].map((p) => {
                const here = p.seasons.filter((s) => s.months.includes(month));
                const ok = here.length > 0;
                const partial = ok && here.every((s) => s.partial?.includes(month));
                const next = ok ? null : nextAvailable(p, month);
                return (
                  <li key={p.slug} className="border-b border-linea last:border-b-0">
                    <Link href={productHref(p)} className={`flex items-center gap-3 px-5 py-3.5 ${ok ? "" : "opacity-60"}`}>
                      <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.1rem] font-bold leading-tight">{p.name}</span>
                        {/* Mini año: 12 segmentos, el mes elegido marcado */}
                        <span className="mt-1.5 flex gap-[3px]" aria-hidden>
                          {MONTHS.map((_, i) => {
                            const has = p.seasons.some((s) => s.months.includes(i + 1));
                            return (
                              <span
                                key={i}
                                className={`h-1.5 flex-1 rounded-full ${i + 1 === month ? "scale-y-[2] ring-1 ring-tinta ring-offset-1" : ""}`}
                                style={{ background: has ? p.color : "var(--color-hoja-2)" }}
                              />
                            );
                          })}
                        </span>
                      </span>
                      <span className="shrink-0 text-right text-[0.85rem] leading-tight">
                        {ok ? (
                          <>
                            <span className="inline-block rounded-full bg-verde px-2.5 py-1 font-semibold text-white">
                              {partial ? "Parcial" : "Disponible"}
                            </span>
                            <span className="mt-1 block text-niebla">{here.map((s) => s.origin).join(" y ")}</span>
                          </>
                        ) : (
                          <span className="text-niebla">
                            {next ? (
                              <>
                                Desde<br />
                                <span className="font-semibold text-tinta">{MONTHS_LONG[next - 1]}</span>
                              </>
                            ) : (
                              "Consultar"
                            )}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function SeasonMatrix({ initial = "frescos", compact = false }: { initial?: Filter; compact?: boolean }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [now, setNow] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => setNow(new Date().getMonth() + 1), []);
  const focus = hover ?? picked ?? now;

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
        <p className="hidden md:block text-[0.95rem] text-niebla min-h-[1.5em]" aria-live="polite">
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

      {focus !== null && <MobileMonthView filter={filter} month={focus} setMonth={setPicked} now={now} />}

      <div className="mt-6 hidden overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_1px_var(--color-linea)] md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Meses de disponibilidad de cada fruta según su origen</caption>
          <colgroup>
            <col className={compact ? "w-[12rem]" : "w-[14rem]"} />
            {MONTHS.map((m) => (
              <col key={m} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-niebla">Fruta</th>
              {MONTHS.map((m, i) => {
                const month = i + 1;
                const isNow = month === now;
                return (
                  <th
                    key={m}
                    scope="col"
                    onMouseEnter={() => setHover(month)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setPicked((h) => (h === month ? null : month))}
                    className={`relative cursor-pointer select-none py-4 text-center text-sm font-semibold transition-colors ${
                      month === focus ? "text-tinta" : "text-niebla"
                    }`}
                  >
                    {m}
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
              const newGroup = filter === "todos" && (idx === 0 || rows[idx - 1].product.category !== product.category);
              return (
                <Fragment key={`${product.category}-${product.slug}-${season.origin}`}>
                  {newGroup && (
                    <tr className="border-t border-linea bg-hoja">
                      <th colSpan={13} scope="colgroup" className="px-5 py-2.5 font-display text-base font-bold">
                        {product.category === "frescos" ? "Frescos" : "Congelados IQF"}
                      </th>
                    </tr>
                  )}
                  <tr className={showName ? "border-t border-linea" : ""}>
                    <th scope="row" className="px-5 py-2.5 align-middle font-normal">
                      {showName ? (
                        <Link href={productHref(product)} className="group flex items-baseline gap-2">
                          <span className="font-display text-lg font-bold tracking-tight group-hover:underline underline-offset-4">
                            {product.name}
                          </span>
                          <span className="text-sm text-niebla">{season.origin}</span>
                        </Link>
                      ) : (
                        <span className="pl-[0.1rem] text-sm text-niebla">{season.origin}</span>
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
                          onClick={() => setPicked((h) => (h === month ? null : month))}
                          className={`relative h-11 p-0 transition-colors ${month === focus ? "bg-hoja" : ""}`}
                        >
                          {shape ? (
                            <span
                              className="absolute top-1/2 h-5 -translate-y-1/2"
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
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-niebla">
        <span className="hidden md:inline">Tramos cortos o más claros: disponibilidad solo parte de ese mes. </span>
        Las ventanas pueden variar según clima y cosecha; confirma disponibilidad con un ejecutivo.
      </p>
    </div>
  );
}
