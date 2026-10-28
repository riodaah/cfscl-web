// 404 para URLs que no existen en ningún idioma (el sitio tiene dos layouts raíz).
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada · Page not found | CFS",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es-CL">
      <body className="min-h-dvh grid place-items-center">
        <main className="wrap max-w-2xl py-24">
          <a href="/" aria-label="CFS Central Frutícola Sur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/logo.png" alt="CFS" width={64} height={60} className="h-14 w-auto" />
          </a>
          <h1 className="display-lg mt-8">No encontramos esta página</h1>
          <p className="lead mt-3 text-niebla">Puede que el enlace haya cambiado con el nuevo sitio.</p>
          <p className="mt-6 font-display text-xl font-bold" lang="en">We couldn&apos;t find this page</p>
          <p className="text-niebla" lang="en">The link may have changed with our new website.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/" className="btn btn-rojo">Ir al inicio</a>
            <a href="/en" className="btn btn-linea text-huerto" lang="en">Go to home page</a>
          </div>
        </main>
      </body>
    </html>
  );
}
