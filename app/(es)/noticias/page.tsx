import { NewsPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("news", "es");

export default function Page() {
  return <NewsPage lang="es" />;
}
