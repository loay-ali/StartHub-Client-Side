"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";

import config from '@/constants/config';
import Link from "next/link";

export default function UserMenu({email}:{email:string}) {
  const [open, setOpen] = useState(false);
  const [isLogout,setIsLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if( ! isLogout ) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      fetch(config.apiUrl +'/auth/logout',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(res => res.json())
      .then(() => {
        window.location.href = '/login';
      });
    }
  }, [isLogout]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2.5 rounded-2xl border border-transparent bg-transparent py-1 px-1.5 transition-all duration-300 hover:bg-slate-100 hover:border-slate-200"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-bold text-white text-sm shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
          {email ? email.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="hidden text-left md:block max-w-[130px]">
          <p className="text-sm font-semibold text-slate-700 truncate">{email}</p>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">Admin</p>
        </div>

        <div className="hidden md:flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-white group-hover:shadow-sm">
          <FiChevronDown
            className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 mt-2 w-60 origin-top-right rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2.5 mb-1 rounded-xl bg-slate-50/50">
            <p className="text-xs font-semibold text-slate-700 truncate">Signed in as</p>
            <p className="text-xs text-slate-500 truncate mt-0.5">{email}</p>
          </div>
          
          <Link href="/dashboard/profile" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
              <FiUser className="h-4 w-4" />
            </div>
            Profile Settings
          </Link>

          <div className="my-1.5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <button onClick={() => setIsLogout(true)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
              {isLogout ? <AiOutlineLoading className="spinner-loading h-4 w-4" /> : <FiLogOut className="h-4 w-4" />}
            </div>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}