"use client";

import { useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 md:hidden">
            <Sidebar />
          </div>
        </>
      )}

      <div className="min-w-0 flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
