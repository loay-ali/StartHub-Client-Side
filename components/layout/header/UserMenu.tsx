"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FiChevronDown, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

import config from '@/constants/config';
import Link from "next/link";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const [isGettingWhoAmI,setIsGettingWhoAmI] = useState(true);
  const [isLogout,setIsLogout] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [whoAmI,setWhoAmI] = useState({fullname: "Loay Ali",role: "ADMIN"})

  useEffect(() => {
    if( ! isLogout ) {

      if( isGettingWhoAmI ) {
        fetch(config.apiUrl +'/auth/me',{credentials: 'include'})
          .then(res => res.json())
          .then(res => setWhoAmI(res))
          .finally(() => setIsGettingWhoAmI(false));
      }

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
  }, [isLogout,isGettingWhoAmI]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
          S
        </div>

        <div className="hidden text-left md:block">
          <p className="font-semibold text-text-primary">{whoAmI.fullname}</p>

          <p className="text-sm text-text-secondary">{whoAmI.role}</p>
        </div>

        <FiChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg transition hover:shadow-xl">
          <Link href = "/dashboard/profile" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50">
            <FiUser />
            Profile
          </Link>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50">
            <FiSettings />
            Settings
          </button>

          <hr className="my-2 border-border" />

          <button onClick = {() => setIsLogout(true)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-danger transition hover:bg-red-50">
            { isLogout ? <AiOutlineLoading className = 'spinner-loading'/>:<FiLogOut />}
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
