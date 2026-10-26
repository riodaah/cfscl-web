// Descarga las imágenes y el catálogo del sitio anterior (Wix) y los deja optimizados en /public.
// Se ejecuta automáticamente antes de cada build (`prebuild`). Si un archivo ya existe, no se vuelve a descargar,
// así que basta con correrlo una vez (`npm run assets`) y commitear /public para no depender más de Wix.
//
//   npm run assets          -> descarga lo que falte
//   npm run assets -- --force -> vuelve a descargar todo

import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PUBLIC = path.join(ROOT, "public");
const MEDIA = path.join(PUBLIC, "media");
const FORCE = process.argv.includes("--force");
const WIX = "https://static.wixstatic.com/media/";

const brand = { deep: "#0B3B22", green: "#0C7336" };

// nombre local -> archivo original en Wix
const photos = {
  hero: "fa66ac_a48d6147bb524573a244c39aa3bc1f9f~mv2.png",
  cerezas: "fa66ac_f59121f51d104325a52fdc557be1a98b~mv2.png",
  ciruela: "fa66ac_1af35cba354e4d9ca2ac8af75806038a~mv2.png",
  granada: "fa66ac_f3f38473ccab42efb3aad55f606fc268~mv2.png",
  manzana: "fa66ac_f8479993d91d43c0b5c45c0b0460a351~mv2.png",
  arandano: "fa66ac_332fedfa240e4e25979566d9a9157ee5~mv2.png",
  kiwi: "fa66ac_b46bcc2cc6e44e4abf132b77f3d94ea7~mv2.png",
  uva: "fa66ac_923328ebb6fd4083884bf926b77f166e~mv2.jpg",
  "arandanos-congelados": "fa66ac_7b1672941df142c8a23948f4d12c6519~mv2.png",
  "kiwi-congelado": "fa66ac_8f748df687774b698bc7fb36a904c80d~mv2.png",
  "frutilla-congelada": "fa66ac_09937b5e77674ef3a61298491f081d27~mv2.png",
  "cereza-congelada": "fa66ac_c1bb09a98faa488ba9829236a4adde7a~mv2.png",
  "mora-congelada": "fa66ac_dfa4a70af3d8428582a9b1b62258eafd~mv2.png",
  "uva-congelada": "fa66ac_a37078257fd74351b67435fa9774270b~mv2.png",
  "frambuesa-congelada": "fa66ac_c2264aa7e71747cebbd20db42bddb9e5~mv2.png",
  "noticia-asia-fruit-logistica": "fa66ac_55ec33347c9b4263b965282895b812e2~mv2.jpeg",
  mercados: "fa66ac_3fa4ce928cc648f3a5c4528d62ee3c98~mv2.png",
};
const PRODUCT_KEYS = Object.keys(photos).filter((k) => !["hero", "noticia-asia-fruit-logistica", "mercados"].includes(k));

const LOGO = "fa66ac_e24ed5c052d04afd80587946de71d4ab~mv2.png";
const CERTS = "fa66ac_700e7ad449ee4cc5a1d5e62b0111bf06~mv2.png";
const CATALOG = "https://www.cfscl.cl/_files/ugd/fa66ac_4c9976f7152044fdb99aabb72983771f.pdf";

const exists = (p) => access(p).then(() => true, () => false);
let failures = 0;

async function download(url) {
  const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "cfs-site-build" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function step(label, outFile, fn) {
  if (!FORCE && (await exists(outFile))) return;
  try {
    await fn();
    console.log(`  ✓ ${label}`);
  } catch (e) {
    failures++;
    console.warn(`  ✗ ${label}: ${e.message}`);
  }
}

const cache = new Map();
const src = (file) => {
  if (!cache.has(file)) cache.set(file, download(WIX + file));
  return cache.get(file);
};

async function main() {
  await mkdir(MEDIA, { recursive: true });
  console.log("CFS · preparando imágenes y catálogo");

  for (const [name, file] of Object.entries(photos)) {
    await step(`${name}.webp`, path.join(MEDIA, `${name}.webp`), async () => {
      const width = name === "hero" ? 2400 : 1800;
      const out = await sharp(await src(file)).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
      await writeFile(path.join(MEDIA, `${name}.webp`), out);
    });
  }

  // Logo: se recorta el espacio en blanco del PNG original.
  const logoPng = path.join(MEDIA, "logo.png");
  await step("logo.png", logoPng, async () => {
    const out = await sharp(await src(LOGO)).trim({ threshold: 10 }).resize({ width: 640, withoutEnlargement: true }).png().toBuffer();
    await writeFile(logoPng, out);
  });

  await step("certificaciones.webp", path.join(MEDIA, "certificaciones.webp"), async () => {
    const out = await sharp(await src(CERTS)).webp({ quality: 90 }).toBuffer();
    await writeFile(path.join(MEDIA, "certificaciones.webp"), out);
  });

  // Íconos del navegador / accesos directos: logo sobre fondo blanco, cuadrado con margen.
  const square = async (size, pad) => {
    const logo = await sharp(logoPng).resize({ width: size - pad * 2, height: size - pad * 2, fit: "contain", background: "#fff" }).toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } }).composite([{ input: logo, gravity: "center" }]).png().toBuffer();
  };
  for (const [file, size, pad] of [["icon-512.png", 512, 48], ["icon-192.png", 192, 16], ["apple-touch-icon.png", 180, 18], ["favicon-48.png", 48, 2]]) {
    await step(file, path.join(PUBLIC, file), async () => writeFile(path.join(PUBLIC, file), await square(size, pad)));
  }

  // Imagen para compartir (WhatsApp, LinkedIn, Facebook): foto del huerto + logo en tarjeta blanca.
  const ogCard = async (photoFile, outFile) => {
    const W = 1200, H = 630;
    const photo = await sharp(photoFile).resize(W, H, { fit: "cover" }).toBuffer();
    // Logo centrado: WhatsApp y otras apps recortan la imagen al centro en vistas pequeñas.
    const shade = Buffer.from(
      `<svg width="${W}" height="${H}"><defs><radialGradient id="g" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="${brand.deep}" stop-opacity=".55"/><stop offset="1" stop-color="${brand.deep}" stop-opacity=".9"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
    );
    const badgeSize = 320;
    const logo = await sharp(logoPng).resize({ width: badgeSize - 56, height: badgeSize - 56, fit: "contain", background: "#fff" }).toBuffer();
    const badge = await sharp({ create: { width: badgeSize, height: badgeSize, channels: 4, background: "#ffffff" } })
      .composite([{ input: logo, gravity: "center" }, { input: Buffer.from(`<svg width="${badgeSize}" height="${badgeSize}"><rect width="${badgeSize}" height="${badgeSize}" rx="36" fill="#fff"/></svg>`), blend: "dest-in" }])
      .png().toBuffer();
    const out = await sharp(photo).composite([{ input: shade }, { input: badge, left: Math.round((W - badgeSize) / 2), top: Math.round((H - badgeSize) / 2) }]).jpeg({ quality: 82 }).toBuffer();
    await writeFile(outFile, out);
  };
  await step("og.jpg", path.join(PUBLIC, "og.jpg"), () => ogCard(path.join(MEDIA, "hero.webp"), path.join(PUBLIC, "og.jpg")));
  for (const key of PRODUCT_KEYS) {
    await step(`og-${key}.jpg`, path.join(MEDIA, `og-${key}.jpg`), () => ogCard(path.join(MEDIA, `${key}.webp`), path.join(MEDIA, `og-${key}.jpg`)));
  }

  await step("catalogo-cfs.pdf", path.join(PUBLIC, "catalogo-cfs.pdf"), async () => {
    await writeFile(path.join(PUBLIC, "catalogo-cfs.pdf"), await download(CATALOG));
  });

  if (failures) {
    console.warn(`\n⚠ ${failures} archivo(s) no se pudieron preparar. El sitio compila igual, pero revisa la conexión y corre "npm run assets".\n`);
  } else {
    console.log("Listo.");
  }
}

main();
