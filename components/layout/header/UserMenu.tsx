"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
          <p className="font-semibold text-text-primary">StartHub</p>

          <p className="text-sm text-text-secondary">Admin</p>
        </div>

        <FiChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg transition hover:shadow-xl">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50">
            <FiUser />
            Profile
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50">
            <FiSettings />
            Settings
          </button>

          <hr className="my-2 border-border" />

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-danger transition hover:bg-red-50">
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
