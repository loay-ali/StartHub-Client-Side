import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./dashboard.css";

import DashboardLayout from "@/components/layout/dashboard-layout/DashboardLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} min-h-screen`}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
        </body>
    </html>
  );
}
