/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import config from "@/constants/config";
import { redirect } from "next/navigation";
import AIWindow from "@/components/ai/window/window";
import AIMainButton from "@/components/ai/MainButton";

import { AiOutlineLoading } from "react-icons/ai";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const AIContext = createContext<{
  open:boolean,
  purpose:string,
  toggleAI:Function,
  setPurpose:Function|null
  addMessage?:(msg:string) => any
}>({
  open:false,
  purpose:'',
  toggleAI:() => {},
  setPurpose:null,
  addMessage: undefined});

export const useAIContext = () => useContext(AIContext);

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loadingLoggedIn,setLoadingLoggedIn] = useState(true);

  const [userData,setUserData] = useState<any>({});

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isUsingAI,setIsUsingAI] = useState(false);

  const [aiPurpose,setAiPurpose] = useState('');

  const [addMessage,setAddMessage] = useState<(msg:string) => any>(() => {});

  useEffect(() => {
    if( isLoggedIn == false ) {
      fetch(config.apiUrl +'/auth/me',{credentials: 'include'})
        .then(res => {
          if( res.status == 200 ) {
            setIsLoggedIn(true);
            setLoadingLoggedIn(false);
            return res.json();
          }else {
            redirect('/login');
          }
        }).then((res) => {
          setUserData(res);
        })
    }
  },[]);

  if( loadingLoggedIn == true ) {
    return (<div className = 'p-5 flex items-center justify-center'><AiOutlineLoading className = 'spinner-loading' /></div>)
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
        <Header tokensLeft = {userData.tokensLeft} email = {userData.email} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6">
          <AIContext.Provider value = {{addMessage: addMessage,purpose: aiPurpose,open:isUsingAI,setPurpose: (purpose:string) => setAiPurpose(purpose),toggleAI: () => setIsUsingAI(s => !s)}}>
            {children}
            <AIMainButton setOpen ={() => setIsUsingAI(s => !s)} opened = {isUsingAI}/>
            <AIWindow aiPurpose = {aiPurpose} open = {isUsingAI} closeWindow={() => setIsUsingAI(false)}/>  
          </AIContext.Provider>
        </main>
      </div>
    </div>
  );
}
