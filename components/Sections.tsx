import Image from "next/image";
import Link from "next/link";
import Photo from "./Photo";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";
import { posts, formatDate } from "@/lib/news";

export function SectionHead({ title, intro, id, light }: { title: string; intro?: string; id?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="display-lg">{title}</h2>
      {intro && <p className={`lead mt-4 ${light ? "text-white/80" : "text-niebla"}`}>{intro}</p>}
    </div>
  );
}

function FlagChile() {
  return (
    <svg viewBox="0 0 30 20" className="h-6 w-9 rounded-[3px] shadow-sm" aria-hidden>
      <rect width="30" height="20" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#d52b1e" />
      <rect width="10" height="10" fill="#0039a6" />
      <path d="M5 2.2l.9 2.7h2.8l-2.3 1.7.9 2.7L5 7.6 2.7 9.3l.9-2.7-2.3-1.7h2.8z" fill="#fff" />
    </svg>
  );
}
function FlagPeru() {
  return (
    <svg viewBox="0 0 30 20" className="h-6 w-9 rounded-[3px] shadow-sm" aria-hidden>
      <rect width="30" height="20" fill="#d91023" />
      <rect x="10" width="10" height="20" fill="#fff" />
    </svg>
  );
}

/** Origen de la fruta, certificaciones y mercados de destino. */
export function Respaldo() {
  return (
    <section aria-labelledby="respaldo" className="bg-huerto text-white">
      <div className="wrap py-20 md:py-28">
        <SectionHead
          id="respaldo"
          light
          title="Campos propios en dos países, trazabilidad en cada caja"
          intro="Producimos en los valles centrales de Chile y en Perú. Así extendemos las temporadas y abastecemos a nuestros clientes más meses del año."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white/[.06] p-7 ring-1 ring-white/10">
            <div className="flex items-center gap-3"><FlagChile /><h3 className="font-display text-2xl font-bold">Chile</h3></div>
            <p className="mt-3 text-white/80">
              Cerezas, ciruelas, manzanas, kiwi, uva y arándanos frescos, además de toda la línea congelada IQF.
            </p>
          </div>
          <div className="rounded-3xl bg-white/[.06] p-7 ring-1 ring-white/10">
            <div className="flex items-center gap-3"><FlagPeru /><h3 className="font-display text-2xl font-bold">Perú</h3></div>
            <p className="mt-3 text-white/80">
              Granadas, uva y arándanos que complementan la contraestación chilena entre julio y abril.
            </p>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="display-md">Certificaciones internacionales</h3>
            <p className="mt-3 max-w-xl text-white/80">
              Prácticas agrícolas responsables, inocuidad y trazabilidad verificadas por terceros en cada etapa.
            </p>
            <dl className="mt-8 space-y-5">
              {site.certifications.map((c) => (
                <div key={c.name} className="grid gap-1 border-t border-white/15 pt-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-display text-lg font-bold">{c.name}</dt>
                  <dd className="text-white/75">{c.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-10">
            <Image
              src="/media/certificaciones.webp"
              alt="Logos de las certificaciones PrimusGFS, GLOBALG.A.P. y GRASP"
              width={1402}
              height={500}
              className="h-auto w-full"
              sizes="(min-width:1024px) 40vw, 90vw"
            />
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="order-2 lg:order-1 overflow-hidden rounded-3xl bg-white">
            <Image
              src="/media/mercados.webp"
              alt="Mapa con los mercados de destino de CFS en Norteamérica y Asia"
              width={1800}
              height={948}
              className="h-auto w-full"
              sizes="(min-width:1024px) 45vw, 90vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="display-md">Dónde llega nuestra fruta</h3>
            <p className="mt-3 max-w-xl text-white/80">
              Despachamos a importadores, distribuidores y procesadores de alimentos en {site.markets.slice(0, -1).join(", ")} y{" "}
              {site.markets.at(-1)}, con especial foco en los mercados del Lejano Oriente.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.markets.map((m) => (
                <li key={m} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/15">{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CatalogBand() {
  return (
    <section aria-labelledby="catalogo" className="wrap py-16 md:py-20">
      <div className="relative grid overflow-hidden rounded-[2rem] bg-rojo text-white md:grid-cols-[1.3fr_1fr]">
        <div className="relative z-10 p-8 sm:p-12">
          <h2 id="catalogo" className="display-lg">Todo nuestro catálogo en un PDF</h2>
          <p className="lead mt-4 max-w-lg text-white/90">
            Variedades, formatos y temporadas de cada fruta, listo para compartir con tu equipo de compras.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.catalog} download className="btn btn-blanco text-lg text-rojo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Descargar catálogo
            </a>
            <a href={site.catalog} target="_blank" rel="noopener" className="btn btn-linea text-lg">
              Ver en el navegador
            </a>
          </div>
        </div>
        <Photo name="cerezas" alt="" className="min-h-[14rem] md:min-h-full" sizes="(min-width:768px) 40vw, 100vw" />
      </div>
    </section>
  );
}

export function NewsTeaser() {
  const post = posts[0];
  return (
    <section aria-labelledby="noticias" className="wrap py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="noticias" className="display-lg">Noticias</h2>
        <Link href="/noticias" className="font-semibold text-verde underline underline-offset-4 hover:text-huerto">
          Ver todas las noticias
        </Link>
      </div>
      <Link href={`/noticias/${post.slug}`} className="group mt-10 grid overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_1px_var(--color-linea)] md:grid-cols-2">
        <Photo name={post.image} alt="" className="min-h-[16rem]" sizes="(min-width:768px) 50vw, 100vw" />
        <div className="p-8 sm:p-10">
          <p className="text-sm text-niebla">
            <time dateTime={post.date}>{formatDate(post.date)}</time> — {post.tag}
          </p>
          <h3 className="mt-3 display-md group-hover:underline underline-offset-4 decoration-2">{post.title}</h3>
          <p className="mt-4 text-niebla">{post.excerpt}</p>
          <span className="mt-6 inline-block font-semibold text-verde">Leer noticia</span>
        </div>
      </Link>
    </section>
  );
}

export function ContactSection({ title = "Cuéntanos qué fruta necesitas" }: { title?: string }) {
  return (
    <section id="cotizar" aria-labelledby="cotizar-titulo" className="bg-hoja-2">
      <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="cotizar-titulo" className="display-lg">{title}</h2>
          <p className="lead mt-4 text-niebla">
            Indica la fruta, el destino y el volumen aproximado. Un ejecutivo te responde con disponibilidad, calibres y
            condiciones de despacho.
          </p>
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-sm text-niebla">Correo</dt>
              <dd><a href={`mailto:${site.email}`} className="font-display text-2xl font-bold hover:underline underline-offset-4">{site.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm text-niebla">Teléfono</dt>
              <dd><a href={site.phoneHref} className="font-display text-2xl font-bold hover:underline underline-offset-4">{site.phone}</a></dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
