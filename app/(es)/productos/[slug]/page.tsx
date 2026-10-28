import { ProductPage, productPageMetadata, productParams } from "@/components/Pages";

export const dynamicParams = false;
export const generateStaticParams = () => productParams("frescos", "es");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return productPageMetadata("frescos", slug, "es");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPage c="frescos" slug={slug} lang="es" />;
}
