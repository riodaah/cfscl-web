import { FrozenPage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("frozen", "es", "/media/og-frambuesa-congelada.jpg");

export default function Page() {
  return <FrozenPage lang="es" />;
}
