import { ProductsPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("products", "en");

export default function Page() {
  return <ProductsPage lang="en" />;
}
