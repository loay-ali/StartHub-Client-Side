import EcosystemPage from "@/components/ecosystem/EcosystemPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Ecosystem - StarHub",
  description: "Explore StarHub's AI-Powered Startup Ecosystem connecting startups, vetted venture funds, corporate challenges, and incubator programs.",
};

export default function Page() {
  return <EcosystemPage />;
}
