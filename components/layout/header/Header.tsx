"use client";

import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import Notifications from "./Notifications";
import TokensInfo from "./TokensInfo";
import UserMenu from "./UserMenu";

interface HeaderProps {
  onMenuClick?: () => void;
  email: string;
  tokens: number;
}

/** Turns "/dashboard/jobs/list" → "Jobs / List" */
function buildBreadcrumb(pathname: string): { label: string; crumbs: string[] } {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "en" && s !== "ar" && s !== "dashboard");

  if (segments.length === 0) return { label: "Dashboard", crumbs: [] };

  const humanise = (s: string) =>
    s
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const crumbs = segments.map(humanise);
  return { label: crumbs[crumbs.length - 1], crumbs: crumbs.slice(0, -1) };
}

export default function Header({ tokens, email, onMenuClick }: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname();
  const { label, crumbs } = buildBreadcrumb(pathname);

  return (
    <header className="sticky top-0 z-40 flex flex-col border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
      {/* Teal accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600" />

      <div className="flex h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* ── Left ─────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile sidebar toggle */}
          <button
            onClick={onMenuClick}
            className="group flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-teal-300 hover:text-teal-600 active:scale-95 md:hidden"
            aria-label="Toggle menu"
          >
            <FiMenu size={18} className="transition-transform duration-200 group-hover:rotate-90" />
          </button>

          {/* Page breadcrumb — desktop */}
          <div className="hidden md:flex flex-col leading-none select-none">
            {crumbs.length > 0 && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {crumbs.join(" / ")}
              </span>
            )}
            <span className="text-[15px] font-bold text-slate-800 leading-tight">
              {label}
            </span>
          </div>

          {/* Search - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:block min-w-0 flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Mobile search expanded */}
          {showMobileSearch && (
            <div className="sm:hidden flex-1 animate-in slide-in-from-left duration-200">
              <SearchBar />
            </div>
          )}
        </div>

        {/* ── Right ────────────────────────────────────────── */}
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-1.5">
          {/* Mobile search toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-500 transition-all duration-200 hover:bg-slate-100 active:scale-95"
            aria-label="Toggle search"
          >
            {showMobileSearch ? <FiX size={18} /> : <FiSearch size={18} />}
          </button>

          {/* Tokens chip — md+ */}
          <div className="hidden md:block">
            <TokensInfo tokens={tokens} />
          </div>

          {/* Language switcher — lg+ */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Thin divider */}
          <div className="mx-1 h-7 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden sm:block" />

          {/* Notifications */}
          <div className="relative">
            <Notifications />
          </div>

          {/* Thin divider */}
          <div className="mx-1 h-7 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block" />

          {/* User Menu */}
          <div className="relative">
            <UserMenu email={email} />
          </div>
        </div>
      </div>
    </header>
  );
}