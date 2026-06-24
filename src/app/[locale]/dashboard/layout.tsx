import type { Metadata } from "next";
import "./dashboard.css";

import DashboardLayout from "@/components/layout/dashboard-layout/DashboardLayout";

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
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
