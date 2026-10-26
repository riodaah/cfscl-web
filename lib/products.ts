// Catálogo CFS — contenido migrado desde www.cfscl.cl (Wix), octubre 2026.
// Las temporadas se transcribieron de las imágenes "Campaña Chile / Campaña Perú" del sitio anterior.
// Meses: 1 = enero ... 12 = diciembre. Un mes "parcial" se marca con media ventana en el calendario.

export type Category = "frescos" | "congelados";
export type Origin = "Chile" | "Perú";

export type Season = {
  origin: Origin;
  months: number[];
  partial?: number[];
};

export type Product = {
  slug: string;
  category: Category;
  name: string;
  /** Nombre en singular para el formulario */
  formName: string;
  scientific: string;
  tagline: string;
  description: string;
  varieties?: string[];
  format?: string;
  seasons: Season[];
  /** Archivo en /public/media, generado por scripts/fetch-assets.mjs */
  image: string;
  /** Color de la fruta, usado en el calendario */
  color: string;
};

const ALL_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const IQF = "IQF, frutos íntegros y separados.";

export const products: Product[] = [
  {
    slug: "cerezas",
    category: "frescos",
    name: "Cerezas",
    formName: "Cereza fresca",
    scientific: "Prunus avium",
    tagline: "Fruta pequeña, brillante y jugosa, con un sabor dulce y un toque ácido inconfundible.",
    description:
      "La cereza es reconocida por su pulpa jugosa y su piel firme de tonos que van del rojo intenso al casi negro. Destaca por su versatilidad en preparaciones dulces y saladas, además de ser una excelente fuente de vitaminas y antioxidantes. Perfecta para consumir fresca o como ingrediente en repostería y bebidas.",
    varieties: ["Santina", "Nimba", "Frisco", "Areco", "Pacific Red", "Lapins", "Regina", "Kordia", "Sweet Aryana"],
    seasons: [{ origin: "Chile", months: [1, 2, 11, 12] }],
    image: "cerezas",
    color: "#9B1027",
  },
  {
    slug: "ciruela",
    category: "frescos",
    name: "Ciruela",
    formName: "Ciruela fresca",
    scientific: "Prunus domestica",
    tagline: "Pulpa jugosa y dulce con un toque ácido, fresca y nutritiva.",
    description:
      "La ciruela posee una piel lisa y brillante en colores que van del amarillo al rojo o morado. Su pulpa jugosa, con un delicado equilibrio entre dulzura y acidez, la hace irresistible fresca o en mermeladas, compotas y repostería. Rica en fibra y antioxidantes, es un aliado para la salud y el paladar.",
    varieties: ["Dagen", "Sweet Ekeetah"],
    seasons: [{ origin: "Chile", months: [1, 2, 3] }],
    image: "ciruela",
    color: "#5E2B5C",
  },
  {
    slug: "granada",
    category: "frescos",
    name: "Granada",
    formName: "Granada fresca",
    scientific: "Punica granatum",
    tagline: "Fruta exótica, crujiente y jugosa, con un equilibrio perfecto entre dulzura y acidez.",
    description:
      "La granada se distingue por su cáscara dura de tonos rojizos y su interior repleto de semillas jugosas llamadas arilos, que combinan dulzura y un toque ácido refrescante. Es apreciada por su alto contenido de antioxidantes, vitaminas C y K, además de ser rica en fibra. Gracias a su sabor intenso y textura crujiente, la granada es ideal para consumir fresca, en jugos, ensaladas, postres o como decoración gourmet en platos salados.",
    varieties: ["Wonderful", "Champion"],
    seasons: [{ origin: "Perú", months: [1, 2, 3, 4, 11, 12], partial: [1, 11] }],
    image: "granada",
    color: "#C0162F",
  },
  {
    slug: "manzana",
    category: "frescos",
    name: "Manzanas",
    formName: "Manzana fresca",
    scientific: "Malus domestica",
    tagline: "Crujiente, aromática y equilibrada entre dulzura y acidez.",
    description:
      "La manzana es una fruta versátil y nutritiva, con piel firme en múltiples colores y pulpa jugosa y refrescante. Apreciada a nivel mundial, se consume fresca, en jugos, repostería o platos salados. Rica en fibra y antioxidantes, es un clásico de la alimentación saludable.",
    varieties: ["Royal Gala", "Fuji (Raku-raku)", "Pink Lady"],
    seasons: [{ origin: "Chile", months: [2, 3, 4, 5, 6, 7, 8, 9] }],
    image: "manzana",
    color: "#D2443A",
  },
  {
    slug: "arandano",
    category: "frescos",
    name: "Arándano",
    formName: "Arándano fresco",
    scientific: "Vaccinium corymbosum",
    tagline: "Pequeños, vibrantes y antioxidantes, de sabor dulce-ácido.",
    description:
      "El arándano es un fruto de color azul violáceo intenso, con sabor dulce y un ligero toque ácido. Su pulpa jugosa y rica en antioxidantes lo convierte en un aliado para la salud y la frescura. Ideal para consumir fresco, en jugos, repostería o preparaciones gourmet.",
    seasons: [
      { origin: "Chile", months: [1, 2, 3, 11, 12] },
      { origin: "Perú", months: [1, 2, 7, 8, 9, 10, 11, 12] },
    ],
    image: "arandano",
    color: "#3B3F8C",
  },
  {
    slug: "kiwi",
    category: "frescos",
    name: "Kiwi",
    formName: "Kiwi fresco",
    scientific: "Actinidia deliciosa",
    tagline: "De pulpa verde vibrante, jugoso y refrescante con un toque ácido.",
    description:
      "El kiwi presenta una piel marrón aterciopelada que cubre una pulpa verde brillante y jugosa, con pequeñas semillas comestibles. Su sabor dulce con un toque ácido lo hace ideal para consumo fresco o en múltiples preparaciones. Es además una fuente destacada de vitamina C y antioxidantes.",
    varieties: ["Hayward"],
    seasons: [{ origin: "Chile", months: [4, 5, 6, 7, 8, 9, 10] }],
    image: "kiwi",
    color: "#6F8A1F",
  },
  {
    slug: "uva",
    category: "frescos",
    name: "Uva",
    formName: "Uva fresca",
    scientific: "Vitis vinifera",
    tagline: "Fruta jugosa y aromática, ideal para consumo fresco o industrial.",
    description:
      "La uva se agrupa en racimos de bayas carnosas y dulces, con piel fina y resistente. Su color varía según la variedad, haciéndola tan atractiva como versátil. Se utiliza fresca, en jugos, vinos o pasas, siendo una de las frutas más valoradas por su frescura, sabor y valor nutritivo.",
    varieties: ["Red Globe", "Crimson Seedless", "Arra 15", "Autumn Royal", "Arra 29", "Arra 19", "Arra 32"],
    seasons: [
      { origin: "Chile", months: [1, 2, 3, 4, 12] },
      { origin: "Perú", months: [1, 2, 3, 4, 9, 10, 11, 12] },
    ],
    image: "uva",
    color: "#6E1F45",
  },
  {
    slug: "arandanos",
    category: "congelados",
    name: "Arándanos",
    formName: "Arándano congelado",
    scientific: "Vaccinium corymbosum",
    tagline: "Arándanos estandarizados, óptimos para procesos industriales.",
    description:
      "Los arándanos congelados mantienen sus propiedades nutricionales y su color intenso tras el congelado. Son una materia prima confiable para panificación, confituras, yogures, smoothies y alimentos saludables. La estandarización del IQF asegura que cada lote cumpla con los requerimientos de las cadenas de producción.",
    format: IQF,
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "arandanos-congelados",
    color: "#3B3F8C",
  },
  {
    slug: "kiwi",
    category: "congelados",
    name: "Kiwi",
    formName: "Kiwi congelado",
    scientific: "Actinidia deliciosa",
    tagline: "Kiwi con calidad estandarizada para transformación industrial.",
    description:
      "El kiwi congelado conserva su color verde vibrante, su aroma fresco y su sabor balanceado. Es una materia prima ideal para smoothies, heladería, confituras y repostería industrial. El congelado IQF asegura piezas libres y listas para dosificación en procesos de gran escala.",
    format: IQF,
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "kiwi-congelado",
    color: "#6F8A1F",
  },
  {
    slug: "frutilla",
    category: "congelados",
    name: "Frutilla",
    formName: "Frutilla congelada",
    scientific: "Fragaria × ananassa",
    tagline: "Frutillas consistentes y listas para transformación alimentaria.",
    description:
      "La frutilla congelada mantiene aroma, dulzura y firmeza, convirtiéndose en un insumo de alta calidad para repostería, heladería, bebidas y productos lácteos. El congelado rápido preserva color y sabor, facilitando su integración en líneas industriales durante todo el año.",
    format: IQF,
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "frutilla-congelada",
    color: "#D42A3C",
  },
  {
    slug: "cereza",
    category: "congelados",
    name: "Cereza",
    formName: "Cereza congelada",
    scientific: "Prunus avium",
    tagline: "Cerezas dulces y firmes, listas para disfrutar todo el año.",
    description:
      "La cereza congelada se entrega bajo estrictos estándares de calidad, manteniendo su sabor dulce, jugosidad y color intenso. Gracias al proceso IQF, conserva su integridad física y nutricional, siendo óptima para líneas de producción en repostería, bebidas, lácteos y alimentos procesados.",
    format: IQF,
    seasons: [{ origin: "Chile", months: [1, 2, 3, 11, 12] }],
    image: "cereza-congelada",
    color: "#9B1027",
  },
  {
    slug: "mora",
    category: "congelados",
    name: "Mora",
    formName: "Mora congelada",
    scientific: "Rubus ulmifolius",
    tagline: "Moras de intenso sabor, listas para procesos de alto volumen.",
    description:
      "La mora congelada conserva su jugosidad y sabor profundo tras el proceso IQF. Es especialmente adecuada para industrias de jugos, helados, salsas y repostería. Su perfil antioxidante y coloración intensa aportan valor agregado a productos finales.",
    format: IQF,
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "mora-congelada",
    color: "#33193D",
  },
  {
    slug: "uva",
    category: "congelados",
    name: "Uva",
    formName: "Uva congelada",
    scientific: "Vitis vinifera",
    tagline: "Uvas listas para transformación en alimentos y bebidas.",
    description:
      "La uva congelada conserva firmeza y dulzor natural, manteniendo consistencia en sabor y calidad. Es un insumo confiable para industrias de jugos, vinos, helados, panificación o salsas. El congelado IQF garantiza uniformidad en cada baya y facilita su uso en procesos productivos a gran escala.",
    format: IQF,
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "uva-congelada",
    color: "#6E1F45",
  },
  {
    slug: "frambuesa",
    category: "congelados",
    name: "Frambuesa",
    formName: "Frambuesa congelada",
    scientific: "Rubus idaeus",
    tagline: "Frambuesas premium, diseñadas para producción industrial.",
    description:
      "La frambuesa congelada conserva su color rojo vibrante y su perfil dulce-ácido, asegurando un rendimiento consistente en panificación, repostería, batidos y lácteos. El congelado IQF garantiza que cada baya mantenga su textura y calidad, facilitando procesos continuos en grandes volúmenes.",
    format: IQF,
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "frambuesa-congelada",
    color: "#C21E5B",
  },
];

export const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
export const MONTHS_LONG = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export const basePath = (c: Category) => (c === "frescos" ? "/productos" : "/productos-congelados");
export const productHref = (p: Product) => `${basePath(p.category)}/${p.slug}`;
export const byCategory = (c: Category) => products.filter((p) => p.category === c);
export const findProduct = (c: Category, slug: string) =>
  products.find((p) => p.category === c && p.slug === slug);

export const isAvailable = (p: Product, month: number) => p.seasons.some((s) => s.months.includes(month));

/** Texto legible de la temporada: "noviembre a febrero" */
export function seasonLabel(s: Season) {
  if (s.months.length === 12) return "todo el año";
  const set = new Set(s.months);
  // busca el inicio del tramo (un mes presente cuyo anterior no está)
  const runs: [number, number][] = [];
  for (let m = 1; m <= 12; m++) {
    const prev = m === 1 ? 12 : m - 1;
    if (set.has(m) && !set.has(prev)) {
      let end = m;
      while (set.has(end === 12 ? 1 : end + 1) && (end === 12 ? 1 : end + 1) !== m) end = end === 12 ? 1 : end + 1;
      runs.push([m, end]);
    }
  }
  return runs
    .map(([a, b]) => (a === b ? MONTHS_LONG[a - 1] : `${MONTHS_LONG[a - 1]} a ${MONTHS_LONG[b - 1]}`))
    .join(" y ");
}

export const formOptions = products.map((p) => p.formName);
