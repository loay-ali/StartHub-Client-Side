/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import config from "@/constants/config";
import { redirect } from "next/navigation";

// Re-export so any code that still imports useAIContext from this file
// continues to work without a breaking change.
import { AIContext } from '@/components/providers/AIProvider';
import AIMainButton from "@/components/ai/MainButton";
import AIWindow from "@/components/ai/window/window";
export { useAIContext } from "@/components/providers/AIProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loadingLoggedIn,setLoadingLoggedIn] = useState(true);

  const [userData,setUserData] = useState<any>({});

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isUsingAI,setIsUsingAI] = useState(false);

  const [aiPurpose,setAiPurpose] = useState('');

  const [addMessage,setAddMessage] = useState<(msg:string) => any>(() => {});

  useEffect(() => {
    fetch(config.apiUrl + '/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.status == 200) {
          return res.json();
        }
        else {
          redirect('/login');
        }
        return null;
      }).then((res) => {
        if (res) {
          setUserData(res);
        }
      }).catch(() => {
        redirect('/login');
      });
  }, []);

  return (
    <AIContext.Provider value={{ suggestions: [],addMessage: addMessage, purpose: aiPurpose, open: isUsingAI, setPurpose: (purpose: string) => setAiPurpose(purpose), toggleAI: () => setIsUsingAI(s => !s) }}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar email={userData.email} companyName={userData.companyName ?? ''} />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 z-50 md:hidden">
              <Sidebar email={userData.email} companyName={userData.companyName ?? ''} />
            </div>
          </>
        )}

      <div className="min-w-0 flex flex-1 flex-col">
        <Header tokens = {userData.tokensLeft} email = {userData.email} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6">
            {children}
        <AIMainButton setOpen={() => setIsUsingAI(s => !s)} opened={isUsingAI} />
        <AIWindow aiPurpose={aiPurpose} open={isUsingAI} closeWindow={() => setIsUsingAI(false)} />
              </main>
        </div>
      </div>
      </AIContext.Provider>
  );
}