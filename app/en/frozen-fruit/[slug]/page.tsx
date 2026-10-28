import { ProductPage, productPageMetadata, productParams } from "@/components/Pages";

export const dynamicParams = false;
export const generateStaticParams = () => productParams("congelados", "en");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return productPageMetadata("congelados", slug, "en");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPage c="congelados" slug={slug} lang="en" />;
}
