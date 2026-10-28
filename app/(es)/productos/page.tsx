import { ProductsPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("products", "es");

export default function Page() {
  return <ProductsPage lang="es" />;
}
