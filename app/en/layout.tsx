import RootShell, { baseMetadata } from "@/components/RootShell";

export const metadata = baseMetadata("en");
export { viewport } from "@/components/RootShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
