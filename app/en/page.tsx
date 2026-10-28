import { HomePage, pageMetadata } from "@/components/Pages";

export const metadata = pageMetadata("home", "en");

export default function Page() {
  return <HomePage lang="en" />;
}
