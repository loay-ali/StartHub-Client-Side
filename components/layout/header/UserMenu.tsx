"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FiChevronDown, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

import config from '@/constants/config';
import Link from "next/link";

export default function UserMenu({email}:{email:string}) {
  const [open, setOpen] = useState(false);

  const [isLogout,setIsLogout] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if( ! isLogout ) {

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }else {
      fetch(config.apiUrl +'/auth/logout',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.json())
      .then(res => {
        //[edit]
      });
    }
  }, [isLogout]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-xl border border-[#14b8a6]/15 bg-white/70 py-1.5 px-2.5 hover:border-[#14b8a6]/40 hover:bg-slate-50/80 transition-all duration-200"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0f766e] font-bold text-white text-sm shadow-sm">
          S
        </div>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">{email}</p>
        </div>

        <FiChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-md p-2 shadow-xl">
          <Link href="/dashboard/profile" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left font-medium text-slate-700 transition hover:bg-[#14b8a6]/5 hover:text-[#14b8a6]">
            <FiUser className="h-4 w-4" />
            Profile
          </Link>

          <hr className="my-1.5 border-slate-100" />

          <button onClick={() => setIsLogout(true)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left font-medium text-red-500 transition hover:bg-red-50">
            {isLogout ? <AiOutlineLoading className="spinner-loading h-4 w-4" /> : <FiLogOut className="h-4 w-4" />}
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
