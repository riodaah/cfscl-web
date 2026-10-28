import { NewsPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("news", "en");

export default function Page() {
  return <NewsPage lang="en" />;
}
