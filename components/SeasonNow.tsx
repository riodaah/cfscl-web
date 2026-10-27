"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MONTHS_LONG, byCategory, isAvailable, productHref } from "@/lib/products";

/** Tarjeta del hero: qué fruta fresca está en temporada este mes y cuál viene. */
export default function SeasonNow() {
  const [month, setMonth] = useState<number | null>(null);
  useEffect(() => setMonth(new Date().getMonth() + 1), []);

  const fresh = byCategory("frescos");
  const now = month ? fresh.filter((p) => isAvailable(p, month)) : [];
  const nextMonth = month ? (month % 12) + 1 : null;
  const coming = nextMonth ? fresh.filter((p) => isAvailable(p, nextMonth) && !now.includes(p)) : [];

  return (
    <div className="w-full rounded-3xl bg-white/95 p-5 sm:max-w-sm sm:p-6 text-tinta shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] backdrop-blur">
      <p className="text-sm text-niebla">
        Fruta fresca en temporada{month ? ` en ${MONTHS_LONG[month - 1]}` : ""}
      </p>
      <ul className="mt-3 space-y-1" aria-live="polite">
        {month === null && <li className="h-24" />}
        {now.map((p) => (
          <li key={p.slug}>
            <Link href={productHref(p)} className="group flex items-center gap-3 rounded-xl px-2 py-1.5 -mx-2 hover:bg-hoja">
              <span className="h-3 w-3 rounded-full" style={{ background: p.color }} aria-hidden />
              <span className="font-display text-xl font-bold tracking-tight">{p.name}</span>
              <span className="ml-auto text-sm text-niebla">{p.seasons.filter((s) => s.months.includes(month!)).map((s) => s.origin).join(" y ")}</span>
            </Link>
          </li>
        ))}
      </ul>
      {coming.length > 0 && (
        <p className="mt-4 border-t border-linea pt-3 text-sm text-niebla">
          Desde {MONTHS_LONG[nextMonth! - 1]}: <span className="text-tinta font-medium">{coming.map((p) => p.name.toLowerCase()).join(", ")}</span>
        </p>
      )}
      <Link href="/calendario" className="mt-4 inline-block text-sm font-semibold text-verde underline underline-offset-4 hover:text-huerto">
        Ver calendario completo
      </Link>
    </div>
  );
}
