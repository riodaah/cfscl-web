import type { Metadata } from "next";
import { social } from "@/lib/site";
import Link from "next/link";
import Photo from "@/components/Photo";
import { PageIntro } from "@/components/ProductList";
import { posts, formatDate } from "@/lib/news";

export const metadata: Metadata = {
  ...social({ url: "/noticias", title: "Noticias | CFS", description: "Ferias, temporadas y novedades de CFS Central Frutícola Sur." }),
  title: "Noticias",
  description: "Ferias, temporadas y novedades de CFS Central Frutícola Sur.",
  alternates: { canonical: "/noticias" },
};

export default function Noticias() {
  return (
    <>
      <PageIntro title="Noticias" intro="Ferias internacionales, temporadas y novedades de CFS." />
      <section aria-label="Publicaciones" className="wrap pb-24">
        <ul className="grid gap-10 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/noticias/${p.slug}`} className="group block">
                <Photo name={p.image} alt="" className="aspect-[16/10] rounded-3xl" sizes="(min-width:768px) 50vw, 100vw" />
                <p className="mt-5 text-sm text-niebla">
                  <time dateTime={p.date}>{formatDate(p.date)}</time> — {p.tag}
                </p>
                <h2 className="mt-2 display-md group-hover:underline underline-offset-4 decoration-2">{p.title}</h2>
                <p className="mt-3 text-niebla">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
