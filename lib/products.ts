// Catálogo CFS — contenido migrado desde www.cfscl.cl (Wix), octubre 2026, con versión en inglés.
// Las temporadas se transcribieron de las imágenes "Campaña Chile / Campaña Perú" del sitio anterior.
// Meses: 1 = enero ... 12 = diciembre. Un mes "parcial" se marca más claro en el calendario.

import type { Lang } from "./i18n";

export type Category = "frescos" | "congelados";
export type Origin = "Chile" | "Perú";

export type Season = {
  origin: Origin;
  months: number[];
  partial?: number[];
};

type Text = {
  name: string;
  /** Nombre en singular para el formulario */
  formName: string;
  tagline: string;
  description: string;
  /** Título SEO de la ficha */
  title: string;
  format?: string;
};

export type Product = {
  slug: string;
  slugEn: string;
  category: Category;
  scientific: string;
  varieties?: string[];
  seasons: Season[];
  /** Archivo en /public/media, generado por scripts/fetch-assets.mjs */
  image: string;
  /** Color de la fruta, usado en el calendario */
  color: string;
  es: Text;
  en: Text;
};

const ALL_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const IQF = { es: "IQF, frutos íntegros y separados.", en: "IQF, whole and individually frozen fruit." };

export const products: Product[] = [
  {
    slug: "cerezas",
    slugEn: "cherries",
    category: "frescos",
    scientific: "Prunus avium",
    varieties: ["Santina", "Nimba", "Frisco", "Areco", "Pacific Red", "Lapins", "Regina", "Kordia", "Sweet Aryana"],
    seasons: [{ origin: "Chile", months: [1, 2, 11, 12] }],
    image: "cerezas",
    color: "#9B1027",
    es: {
      name: "Cerezas",
      formName: "Cereza fresca",
      title: "Cerezas frescas de exportación desde Chile",
      tagline: "Fruta pequeña, brillante y jugosa, con un sabor dulce y un toque ácido inconfundible.",
      description:
        "La cereza es reconocida por su pulpa jugosa y su piel firme de tonos que van del rojo intenso al casi negro. Destaca por su versatilidad en preparaciones dulces y saladas, además de ser una excelente fuente de vitaminas y antioxidantes. Perfecta para consumir fresca o como ingrediente en repostería y bebidas.",
    },
    en: {
      name: "Cherries",
      formName: "Fresh cherries",
      title: "Fresh Chilean cherries for export",
      tagline: "A small, glossy and juicy fruit with a sweet taste and an unmistakable hint of tartness.",
      description:
        "Cherries are known for their juicy flesh and firm skin, in shades from deep red to almost black. They are versatile in sweet and savory dishes and an excellent source of vitamins and antioxidants. Perfect eaten fresh or as an ingredient in baking and drinks.",
    },
  },
  {
    slug: "ciruela",
    slugEn: "plums",
    category: "frescos",
    scientific: "Prunus domestica",
    varieties: ["Dagen", "Sweet Ekeetah"],
    seasons: [{ origin: "Chile", months: [1, 2, 3] }],
    image: "ciruela",
    color: "#5E2B5C",
    es: {
      name: "Ciruela",
      formName: "Ciruela fresca",
      title: "Ciruelas frescas de exportación desde Chile",
      tagline: "Pulpa jugosa y dulce con un toque ácido, fresca y nutritiva.",
      description:
        "La ciruela posee una piel lisa y brillante en colores que van del amarillo al rojo o morado. Su pulpa jugosa, con un delicado equilibrio entre dulzura y acidez, la hace irresistible fresca o en mermeladas, compotas y repostería. Rica en fibra y antioxidantes, es un aliado para la salud y el paladar.",
    },
    en: {
      name: "Plums",
      formName: "Fresh plums",
      title: "Fresh Chilean plums for export",
      tagline: "Juicy, sweet flesh with a touch of acidity — fresh and nutritious.",
      description:
        "Plums have smooth, glossy skin in colors ranging from yellow to red or purple. Their juicy flesh, with a delicate balance of sweetness and acidity, makes them irresistible fresh or in jams, compotes and baking. Rich in fiber and antioxidants, they are good for both health and palate.",
    },
  },
  {
    slug: "granada",
    slugEn: "pomegranates",
    category: "frescos",
    scientific: "Punica granatum",
    varieties: ["Wonderful", "Champion"],
    seasons: [{ origin: "Perú", months: [1, 2, 3, 4, 11, 12], partial: [1, 11] }],
    image: "granada",
    color: "#C0162F",
    es: {
      name: "Granada",
      formName: "Granada fresca",
      title: "Granadas frescas de exportación desde Perú",
      tagline: "Fruta exótica, crujiente y jugosa, con un equilibrio perfecto entre dulzura y acidez.",
      description:
        "La granada se distingue por su cáscara dura de tonos rojizos y su interior repleto de semillas jugosas llamadas arilos, que combinan dulzura y un toque ácido refrescante. Es apreciada por su alto contenido de antioxidantes, vitaminas C y K, además de ser rica en fibra. Gracias a su sabor intenso y textura crujiente, la granada es ideal para consumir fresca, en jugos, ensaladas, postres o como decoración gourmet en platos salados.",
    },
    en: {
      name: "Pomegranates",
      formName: "Fresh pomegranates",
      title: "Fresh Peruvian pomegranates for export",
      tagline: "An exotic, crunchy and juicy fruit with a perfect balance of sweetness and acidity.",
      description:
        "Pomegranates stand out for their hard reddish rind and an interior full of juicy seeds called arils, which combine sweetness with a refreshing tartness. They are valued for their high content of antioxidants and vitamins C and K, and are rich in fiber. Thanks to their intense flavor and crunchy texture, they are ideal fresh, in juices, salads and desserts, or as a gourmet garnish for savory dishes.",
    },
  },
  {
    slug: "manzana",
    slugEn: "apples",
    category: "frescos",
    scientific: "Malus domestica",
    varieties: ["Royal Gala", "Fuji (Raku-raku)", "Pink Lady"],
    seasons: [{ origin: "Chile", months: [2, 3, 4, 5, 6, 7, 8, 9] }],
    image: "manzana",
    color: "#D2443A",
    es: {
      name: "Manzanas",
      formName: "Manzana fresca",
      title: "Manzanas frescas de exportación desde Chile",
      tagline: "Crujiente, aromática y equilibrada entre dulzura y acidez.",
      description:
        "La manzana es una fruta versátil y nutritiva, con piel firme en múltiples colores y pulpa jugosa y refrescante. Apreciada a nivel mundial, se consume fresca, en jugos, repostería o platos salados. Rica en fibra y antioxidantes, es un clásico de la alimentación saludable.",
    },
    en: {
      name: "Apples",
      formName: "Fresh apples",
      title: "Fresh Chilean apples for export",
      tagline: "Crisp, aromatic and balanced between sweet and tart.",
      description:
        "Apples are a versatile, nutritious fruit with firm skin in many colors and juicy, refreshing flesh. Enjoyed worldwide, they are eaten fresh or used in juices, baking and savory dishes. Rich in fiber and antioxidants, they are a classic of healthy eating.",
    },
  },
  {
    slug: "arandano",
    slugEn: "blueberries",
    category: "frescos",
    scientific: "Vaccinium corymbosum",
    seasons: [
      { origin: "Chile", months: [1, 2, 3, 11, 12] },
      { origin: "Perú", months: [1, 2, 7, 8, 9, 10, 11, 12] },
    ],
    image: "arandano",
    color: "#3B3F8C",
    es: {
      name: "Arándano",
      formName: "Arándano fresco",
      title: "Arándanos frescos de exportación desde Chile y Perú",
      tagline: "Pequeños, vibrantes y antioxidantes, de sabor dulce-ácido.",
      description:
        "El arándano es un fruto de color azul violáceo intenso, con sabor dulce y un ligero toque ácido. Su pulpa jugosa y rica en antioxidantes lo convierte en un aliado para la salud y la frescura. Ideal para consumir fresco, en jugos, repostería o preparaciones gourmet.",
    },
    en: {
      name: "Blueberries",
      formName: "Fresh blueberries",
      title: "Fresh blueberries from Chile and Peru for export",
      tagline: "Small, vibrant and rich in antioxidants, with a sweet-tart flavor.",
      description:
        "Blueberries are an intense blue-violet fruit with a sweet flavor and a slight tartness. Their juicy, antioxidant-rich flesh makes them a great ally for health and freshness. Ideal fresh, in juices, baking or gourmet preparations.",
    },
  },
  {
    slug: "kiwi",
    slugEn: "kiwifruit",
    category: "frescos",
    scientific: "Actinidia deliciosa",
    varieties: ["Hayward"],
    seasons: [{ origin: "Chile", months: [4, 5, 6, 7, 8, 9, 10] }],
    image: "kiwi",
    color: "#6F8A1F",
    es: {
      name: "Kiwi",
      formName: "Kiwi fresco",
      title: "Kiwi fresco de exportación desde Chile",
      tagline: "De pulpa verde vibrante, jugoso y refrescante con un toque ácido.",
      description:
        "El kiwi presenta una piel marrón aterciopelada que cubre una pulpa verde brillante y jugosa, con pequeñas semillas comestibles. Su sabor dulce con un toque ácido lo hace ideal para consumo fresco o en múltiples preparaciones. Es además una fuente destacada de vitamina C y antioxidantes.",
    },
    en: {
      name: "Kiwifruit",
      formName: "Fresh kiwifruit",
      title: "Fresh Chilean kiwifruit for export",
      tagline: "Bright green flesh, juicy and refreshing with a hint of tartness.",
      description:
        "Kiwifruit has a fuzzy brown skin covering bright green, juicy flesh with small edible seeds. Its sweet flavor with a touch of acidity makes it ideal fresh or in many preparations. It is also an outstanding source of vitamin C and antioxidants.",
    },
  },
  {
    slug: "uva",
    slugEn: "grapes",
    category: "frescos",
    scientific: "Vitis vinifera",
    varieties: ["Red Globe", "Crimson Seedless", "Arra 15", "Autumn Royal", "Arra 29", "Arra 19", "Arra 32"],
    seasons: [
      { origin: "Chile", months: [1, 2, 3, 4, 12] },
      { origin: "Perú", months: [1, 2, 3, 4, 9, 10, 11, 12] },
    ],
    image: "uva",
    color: "#6E1F45",
    es: {
      name: "Uva",
      formName: "Uva fresca",
      title: "Uva de mesa de exportación desde Chile y Perú",
      tagline: "Fruta jugosa y aromática, ideal para consumo fresco o industrial.",
      description:
        "La uva se agrupa en racimos de bayas carnosas y dulces, con piel fina y resistente. Su color varía según la variedad, haciéndola tan atractiva como versátil. Se utiliza fresca, en jugos, vinos o pasas, siendo una de las frutas más valoradas por su frescura, sabor y valor nutritivo.",
    },
    en: {
      name: "Grapes",
      formName: "Fresh grapes",
      title: "Table grapes from Chile and Peru for export",
      tagline: "Juicy, aromatic fruit, ideal for fresh consumption or processing.",
      description:
        "Grapes grow in clusters of fleshy, sweet berries with thin, resistant skin. Their color varies by variety, making them as attractive as they are versatile. They are eaten fresh or used for juice, wine or raisins, and are among the most valued fruits for their freshness, flavor and nutritional value.",
    },
  },
  {
    slug: "arandanos",
    slugEn: "blueberries",
    category: "congelados",
    scientific: "Vaccinium corymbosum",
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "arandanos-congelados",
    color: "#3B3F8C",
    es: {
      name: "Arándanos",
      formName: "Arándano congelado",
      title: "Arándanos congelados IQF de Chile",
      format: IQF.es,
      tagline: "Arándanos estandarizados, óptimos para procesos industriales.",
      description:
        "Los arándanos congelados mantienen sus propiedades nutricionales y su color intenso tras el congelado. Son una materia prima confiable para panificación, confituras, yogures, smoothies y alimentos saludables. La estandarización del IQF asegura que cada lote cumpla con los requerimientos de las cadenas de producción.",
    },
    en: {
      name: "Blueberries",
      formName: "Frozen blueberries",
      title: "IQF frozen blueberries from Chile",
      format: IQF.en,
      tagline: "Standardized blueberries, optimal for industrial processing.",
      description:
        "Frozen blueberries keep their nutritional properties and intense color after freezing. They are a reliable raw material for bakery, preserves, yogurts, smoothies and healthy foods. IQF standardization ensures every lot meets the requirements of production lines.",
    },
  },
  {
    slug: "kiwi",
    slugEn: "kiwifruit",
    category: "congelados",
    scientific: "Actinidia deliciosa",
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "kiwi-congelado",
    color: "#6F8A1F",
    es: {
      name: "Kiwi",
      formName: "Kiwi congelado",
      title: "Kiwi congelado IQF de Chile",
      format: IQF.es,
      tagline: "Kiwi con calidad estandarizada para transformación industrial.",
      description:
        "El kiwi congelado conserva su color verde vibrante, su aroma fresco y su sabor balanceado. Es una materia prima ideal para smoothies, heladería, confituras y repostería industrial. El congelado IQF asegura piezas libres y listas para dosificación en procesos de gran escala.",
    },
    en: {
      name: "Kiwifruit",
      formName: "Frozen kiwifruit",
      title: "IQF frozen kiwifruit from Chile",
      format: IQF.en,
      tagline: "Kiwifruit with standardized quality for industrial processing.",
      description:
        "Frozen kiwifruit keeps its vibrant green color, fresh aroma and balanced flavor. It is an ideal raw material for smoothies, ice cream, preserves and industrial baking. IQF freezing ensures free-flowing pieces ready for dosing in large-scale processes.",
    },
  },
  {
    slug: "frutilla",
    slugEn: "strawberries",
    category: "congelados",
    scientific: "Fragaria × ananassa",
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "frutilla-congelada",
    color: "#D42A3C",
    es: {
      name: "Frutilla",
      formName: "Frutilla congelada",
      title: "Frutillas congeladas IQF de Chile",
      format: IQF.es,
      tagline: "Frutillas consistentes y listas para transformación alimentaria.",
      description:
        "La frutilla congelada mantiene aroma, dulzura y firmeza, convirtiéndose en un insumo de alta calidad para repostería, heladería, bebidas y productos lácteos. El congelado rápido preserva color y sabor, facilitando su integración en líneas industriales durante todo el año.",
    },
    en: {
      name: "Strawberries",
      formName: "Frozen strawberries",
      title: "IQF frozen strawberries from Chile",
      format: IQF.en,
      tagline: "Consistent strawberries, ready for food processing.",
      description:
        "Frozen strawberries keep their aroma, sweetness and firmness, making them a high-quality input for baking, ice cream, beverages and dairy products. Fast freezing preserves color and flavor, so they integrate easily into industrial lines all year round.",
    },
  },
  {
    slug: "cereza",
    slugEn: "cherries",
    category: "congelados",
    scientific: "Prunus avium",
    seasons: [{ origin: "Chile", months: [1, 2, 3, 11, 12] }],
    image: "cereza-congelada",
    color: "#9B1027",
    es: {
      name: "Cereza",
      formName: "Cereza congelada",
      title: "Cerezas congeladas IQF de Chile",
      format: IQF.es,
      tagline: "Cerezas dulces y firmes, listas para disfrutar todo el año.",
      description:
        "La cereza congelada se entrega bajo estrictos estándares de calidad, manteniendo su sabor dulce, jugosidad y color intenso. Gracias al proceso IQF, conserva su integridad física y nutricional, siendo óptima para líneas de producción en repostería, bebidas, lácteos y alimentos procesados.",
    },
    en: {
      name: "Cherries",
      formName: "Frozen cherries",
      title: "IQF frozen cherries from Chile",
      format: IQF.en,
      tagline: "Sweet, firm cherries, ready to enjoy all year.",
      description:
        "Frozen cherries are delivered under strict quality standards, keeping their sweet flavor, juiciness and intense color. Thanks to the IQF process they retain their physical and nutritional integrity, making them ideal for production lines in baking, beverages, dairy and processed foods.",
    },
  },
  {
    slug: "mora",
    slugEn: "blackberries",
    category: "congelados",
    scientific: "Rubus ulmifolius",
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "mora-congelada",
    color: "#33193D",
    es: {
      name: "Mora",
      formName: "Mora congelada",
      title: "Moras congeladas IQF de Chile",
      format: IQF.es,
      tagline: "Moras de intenso sabor, listas para procesos de alto volumen.",
      description:
        "La mora congelada conserva su jugosidad y sabor profundo tras el proceso IQF. Es especialmente adecuada para industrias de jugos, helados, salsas y repostería. Su perfil antioxidante y coloración intensa aportan valor agregado a productos finales.",
    },
    en: {
      name: "Blackberries",
      formName: "Frozen blackberries",
      title: "IQF frozen blackberries from Chile",
      format: IQF.en,
      tagline: "Intensely flavored blackberries, ready for high-volume processing.",
      description:
        "Frozen blackberries keep their juiciness and deep flavor after IQF processing. They are especially suited to the juice, ice cream, sauce and baking industries. Their antioxidant profile and intense color add value to final products.",
    },
  },
  {
    slug: "uva",
    slugEn: "grapes",
    category: "congelados",
    scientific: "Vitis vinifera",
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "uva-congelada",
    color: "#6E1F45",
    es: {
      name: "Uva",
      formName: "Uva congelada",
      title: "Uva congelada IQF de Chile",
      format: IQF.es,
      tagline: "Uvas listas para transformación en alimentos y bebidas.",
      description:
        "La uva congelada conserva firmeza y dulzor natural, manteniendo consistencia en sabor y calidad. Es un insumo confiable para industrias de jugos, vinos, helados, panificación o salsas. El congelado IQF garantiza uniformidad en cada baya y facilita su uso en procesos productivos a gran escala.",
    },
    en: {
      name: "Grapes",
      formName: "Frozen grapes",
      title: "IQF frozen grapes from Chile",
      format: IQF.en,
      tagline: "Grapes ready to be processed into food and beverages.",
      description:
        "Frozen grapes keep their firmness and natural sweetness, with consistent flavor and quality. They are a reliable input for the juice, wine, ice cream, bakery and sauce industries. IQF freezing ensures uniform berries and makes them easy to use in large-scale production.",
    },
  },
  {
    slug: "frambuesa",
    slugEn: "raspberries",
    category: "congelados",
    scientific: "Rubus idaeus",
    seasons: [{ origin: "Chile", months: ALL_YEAR }],
    image: "frambuesa-congelada",
    color: "#C21E5B",
    es: {
      name: "Frambuesa",
      formName: "Frambuesa congelada",
      title: "Frambuesas congeladas IQF de Chile",
      format: IQF.es,
      tagline: "Frambuesas premium, diseñadas para producción industrial.",
      description:
        "La frambuesa congelada conserva su color rojo vibrante y su perfil dulce-ácido, asegurando un rendimiento consistente en panificación, repostería, batidos y lácteos. El congelado IQF garantiza que cada baya mantenga su textura y calidad, facilitando procesos continuos en grandes volúmenes.",
    },
    en: {
      name: "Raspberries",
      formName: "Frozen raspberries",
      title: "IQF frozen raspberries from Chile",
      format: IQF.en,
      tagline: "Premium raspberries, designed for industrial production.",
      description:
        "Frozen raspberries keep their vibrant red color and sweet-tart profile, ensuring consistent performance in bakery, confectionery, smoothies and dairy. IQF freezing ensures each berry keeps its texture and quality, supporting continuous high-volume processes.",
    },
  },
];

export const MONTHS = {
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
export const MONTHS_LONG = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

export const originLabel = (o: Origin, lang: Lang) => (lang === "en" && o === "Perú" ? "Peru" : o);
export const joinAnd = (items: string[], lang: Lang) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} ${lang === "en" ? "and" : "y"} ${items.at(-1)}`;

/** Textos del producto en el idioma pedido */
export const tx = (p: Product, lang: Lang) => p[lang];

export const basePath = (c: Category, lang: Lang) =>
  lang === "en" ? (c === "frescos" ? "/en/products" : "/en/frozen-fruit") : c === "frescos" ? "/productos" : "/productos-congelados";
export const productHref = (p: Product, lang: Lang) => `${basePath(p.category, lang)}/${lang === "en" ? p.slugEn : p.slug}`;
export const byCategory = (c: Category) => products.filter((p) => p.category === c);
export const findProduct = (c: Category, slug: string, lang: Lang = "es") =>
  products.find((p) => p.category === c && (lang === "en" ? p.slugEn : p.slug) === slug);

export const isAvailable = (p: Product, month: number) => p.seasons.some((s) => s.months.includes(month));

/** Texto legible de la temporada: "noviembre a febrero" / "November to February" */
export function seasonLabel(s: Season, lang: Lang = "es") {
  if (s.months.length === 12) return lang === "en" ? "all year round" : "todo el año";
  const names = MONTHS_LONG[lang];
  const set = new Set(s.months);
  const runs: [number, number][] = [];
  for (let m = 1; m <= 12; m++) {
    const prev = m === 1 ? 12 : m - 1;
    if (set.has(m) && !set.has(prev)) {
      let end = m;
      while (set.has(end === 12 ? 1 : end + 1) && (end === 12 ? 1 : end + 1) !== m) end = end === 12 ? 1 : end + 1;
      runs.push([m, end]);
    }
  }
  const to = lang === "en" ? "to" : "a";
  return joinAnd(
    runs.map(([a, b]) => (a === b ? names[a - 1] : `${names[a - 1]} ${to} ${names[b - 1]}`)),
    lang
  );
}

/** Valores válidos del campo "producto" del formulario (siempre en español, para el correo interno) */
export const formOptions = products.map((p) => p.es.formName);

/** "Chile: noviembre a febrero · Perú: julio a febrero" */
export const seasonLine = (p: Product, lang: Lang) =>
  p.seasons.map((s) => `${originLabel(s.origin, lang)}: ${seasonLabel(s, lang)}`).join(" · ");
