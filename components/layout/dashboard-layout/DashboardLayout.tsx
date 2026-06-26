"use client";

import { useEffect, useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import config from "@/constants/config";
import { redirect } from "next/navigation";
import AIWindow from "@/components/ai/window/window";
import AIMainButton from "@/components/ai/MainButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const [userData,setUserData] = useState<any>({});

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isUsingAI,setIsUsingAI] = useState(false);

  useEffect(() => {
    if( isLoggedIn == false ) {
      fetch(config.apiUrl +'/auth/me',{credentials: 'include'})
        .then(res => {
          if( res.status == 200 ) {
            setIsLoggedIn(true);
            return res.json();
          }else {
            redirect('/login');
          }
        }).then((res) => {
          setUserData(res);
        })
    }
  },[]);

  if( isLoggedIn == false ) {
    //return (<>Loading...</>)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar email = {userData.email} companyName = {'hello'} />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 md:hidden">
            <Sidebar email = {userData.email} companyName = {'hello'}/>
          </div>
        </>
      )}

      <div className="min-w-0 flex flex-1 flex-col">
        <Header email = {userData.email} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6">{children}</main>

        <AIMainButton />
        <AIWindow open = {isUsingAI} closeWindow={() => setIsUsingAI(false)}/>
      </div>
    </div>
  );
}
