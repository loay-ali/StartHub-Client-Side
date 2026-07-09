import type { Metadata } from "next";
import "./dashboard.css";

import DashboardLayout from "@/components/layout/dashboard-layout/DashboardLayout";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { NotificationProvider } from "@/components/notificationSystem/NotificationProvider";
import { ToastContainer } from "@/components/notificationSystem/ToastContainer";
import GlobalAIShell from "@/components/ai/GlobalAIShell";

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
    <NotificationProvider>
      <SearchProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
        <ToastContainer />
        {/* AI floating button + chat panel — dashboard only */}
        <GlobalAIShell />
      </SearchProvider>
    </NotificationProvider>
  );
}