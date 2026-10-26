import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-28">
      <h1 className="display-lg">No encontramos esta página</h1>
      <p className="lead mt-4 max-w-xl text-niebla">
        Puede que el enlace haya cambiado con el nuevo sitio. Revisa nuestros productos o escríbenos directamente.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/productos" className="btn btn-rojo">Ver productos</Link>
        <Link href="/contacto" className="btn btn-linea text-huerto">Cotizar fruta</Link>
      </div>
    </section>
  );
}
