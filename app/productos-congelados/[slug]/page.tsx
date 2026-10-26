import { notFound } from "next/navigation";
import ProductDetail, { productMetadata } from "@/components/ProductDetail";
import { byCategory, findProduct } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return byCategory("congelados").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct("congelados", slug);
  return product ? productMetadata(product) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct("congelados", slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
