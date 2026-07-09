import type { Metadata } from "next";
import "../dashboard/dashboard.css";

import DashboardLayout from "@/components/layout/dashboard-layout/DashboardLayout";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { NotificationProvider } from "@/components/notificationSystem/NotificationProvider";
import { ToastContainer } from "@/components/notificationSystem/ToastContainer";
import AdminDashboardLayout from "@/components/layout/dashboard-layout/InvestorDashboardLayout";

export const metadata: Metadata = {
  title: "StartHub | Investor Portal",
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
        <AdminDashboardLayout>
          {children}
        </AdminDashboardLayout>
        <ToastContainer />
      </SearchProvider>
    </NotificationProvider>
  );
}
