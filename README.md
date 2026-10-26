# CFS 2.0 — www.cfscl.cl

Sitio corporativo de CFS Central Frutícola Sur. Next.js 16 (App Router) + Tailwind CSS 4 + Motion, generado de forma estática y listo para Vercel. Desarrollado por DARMI SPA.

## Qué incluye

- Inicio con fruta en temporada del mes actual, vitrina de productos, calendario de temporadas, campos, certificaciones, mercados, catálogo, noticias y formulario.
- 14 fichas de producto en las **mismas URLs del sitio anterior** (`/productos/cerezas`, `/productos-congelados/frambuesa`, etc.) para no perder posicionamiento.
- Calendario de temporada interactivo por fruta y origen (Chile / Perú), más una vista general en `/calendario`.
- Catálogo PDF descargable (`/catalogo-cfs.pdf`).
- Formulario de cotización con validación, protección anti-bots y envío por correo (Resend) y/o webhook (n8n, Make → CRM).
- SEO: títulos y descripciones por página, Open Graph/Twitter con imagen de logo para compartir, `sitemap.xml`, `robots.txt`, datos estructurados (Organization, Product, BreadcrumbList, NewsArticle), favicon e íconos, redirecciones desde URLs antiguas de Wix.

## Desarrollo

```bash
npm install
npm run assets   # descarga imágenes y catálogo del sitio Wix y los optimiza en /public
npm run dev      # http://localhost:3000
```

`npm run build` ejecuta `npm run assets` automáticamente antes de compilar.

### Imágenes y catálogo (importante antes de dar de baja Wix)

`scripts/fetch-assets.mjs` descarga las fotos originales, el logo, las certificaciones, el mapa y el catálogo PDF desde Wix, y genera:

- `public/media/*.webp` — fotos optimizadas
- `public/media/logo.png`, `public/favicon-48.png`, `public/icon-*.png`, `public/apple-touch-icon.png`
- `public/og.jpg` y `public/media/og-*.jpg` — imágenes que aparecen al compartir el enlace (foto + logo)
- `public/catalogo-cfs.pdf`

Corre `npm run assets` una vez en tu equipo y **commitea la carpeta `public/`**. Desde ahí el sitio ya no depende de Wix. Para reemplazar una foto, pon el nuevo `.webp` con el mismo nombre en `public/media/` (y borra su `og-*.jpg` + vuelve a correr el script si quieres regenerar la imagen para compartir). Para un catálogo nuevo, reemplaza `public/catalogo-cfs.pdf`.

## Variables de entorno (Vercel → Settings → Environment Variables)

| Variable | Uso |
| --- | --- |
| `RESEND_API_KEY` | Clave de [Resend](https://resend.com) para enviar las solicitudes por correo |
| `CONTACT_TO` | Destinatarios, separados por coma. Por defecto `info@cfscl.cl` |
| `CONTACT_FROM` | Remitente verificado en Resend, ej. `Web CFS <web@cfscl.cl>` |
| `LEAD_WEBHOOK_URL` | (Opcional) Webhook de n8n/Make para registrar cada solicitud en el CRM |

Se necesita al menos `RESEND_API_KEY` o `LEAD_WEBHOOK_URL`. Sin ninguna, el formulario muestra al visitante el correo y teléfono de CFS para que escriba directo.

## Dónde editar contenido

- Productos, variedades y temporadas: `lib/products.ts`
- Datos de contacto, misión, visión, certificaciones, mercados: `lib/site.ts`
- Noticias: `lib/news.ts`

## Publicar en cfscl.cl

1. Importar el repositorio en Vercel (framework: Next.js) y cargar las variables de entorno.
2. En Vercel → Domains, agregar `www.cfscl.cl` y `cfscl.cl` (redirección a `www`).
3. Cambiar los DNS del dominio según indique Vercel. Hacerlo **después** de correr `npm run assets` y commitear `public/`.
4. En Google Search Console, enviar `https://www.cfscl.cl/sitemap.xml`.
