import RootShell, { baseMetadata } from "@/components/RootShell";

export const metadata = baseMetadata("es");
export { viewport } from "@/components/RootShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
