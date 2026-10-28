"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MONTHS_LONG, byCategory, isAvailable, joinAnd, originLabel, productHref, tx } from "@/lib/products";
import { route, t, type Lang } from "@/lib/i18n";

/** Tarjeta del hero: qué fruta fresca está en temporada este mes y cuál viene. */
export default function SeasonNow({ lang }: { lang: Lang }) {
  const d = t(lang);
  const [month, setMonth] = useState<number | null>(null);
  useEffect(() => setMonth(new Date().getMonth() + 1), []);

  const names = MONTHS_LONG[lang];
  const fresh = byCategory("frescos");
  const now = month ? fresh.filter((p) => isAvailable(p, month)) : [];
  const nextMonth = month ? (month % 12) + 1 : null;
  const coming = nextMonth ? fresh.filter((p) => isAvailable(p, nextMonth) && !now.includes(p)) : [];

  return (
    <div className="w-full rounded-3xl bg-white/95 p-5 sm:max-w-sm sm:p-6 text-tinta shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] backdrop-blur">
      <p className="text-sm text-niebla">{month ? d.nowInSeason(names[month - 1]) : d.nowInSeasonNoMonth}</p>
      <ul className="mt-3 space-y-1" aria-live="polite">
        {month === null && <li className="h-24" />}
        {now.map((p) => (
          <li key={p.slug}>
            <Link href={productHref(p, lang)} className="group flex items-center gap-3 rounded-xl px-2 py-1.5 -mx-2 hover:bg-hoja">
              <span className="h-3 w-3 rounded-full" style={{ background: p.color }} aria-hidden />
              <span className="font-display text-xl font-bold tracking-tight">{tx(p, lang).name}</span>
              <span className="ml-auto text-sm text-niebla">
                {joinAnd(p.seasons.filter((s) => s.months.includes(month!)).map((s) => originLabel(s.origin, lang)), lang)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {coming.length > 0 && (
        <p className="mt-4 border-t border-linea pt-3 text-sm text-niebla">
          {d.from} {names[nextMonth! - 1]}:{" "}
          <span className="text-tinta font-medium">{coming.map((p) => tx(p, lang).name.toLowerCase()).join(", ")}</span>
        </p>
      )}
      <Link href={route("seasons", lang)} className="mt-4 inline-block text-sm font-semibold text-verde underline underline-offset-4 hover:text-huerto">
        {d.fullCalendar}
      </Link>
    </div>
  );
}
