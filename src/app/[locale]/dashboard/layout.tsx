import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./dashboard.css";

import { authCheck } from "@/src/services/auth";

import { redirect } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StartHub",
  description: "StartHub Client Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  if( await authCheck() == false ) return redirect('/login');

  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} min-h-screen`}>{children}</body>
    </html>
  );
}
