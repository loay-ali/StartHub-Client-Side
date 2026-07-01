import type { Metadata } from "next";
import "./dashboard.css";

import DashboardLayout from "@/components/layout/dashboard-layout/DashboardLayout";
import { SearchProvider } from "@/components/providers/SearchProvider";

export const metadata: Metadata = {
  title: "StartHub",
  description: "StartHub Client Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </SearchProvider>
  );
}