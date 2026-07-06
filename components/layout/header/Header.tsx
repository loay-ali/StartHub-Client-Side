"use client";

import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";

import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import Notifications from "./Notifications";
import TokensInfo from "./TokensInfo";
import UserMenu from "./UserMenu";

interface HeaderProps {
  onMenuClick?: () => void;
  email: string;
}

export default function Header({ email, onMenuClick }: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 px-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-200 sm:h-20 sm:px-4 lg:px-6">
      {/* Left — mobile toggle + search */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onMenuClick}
          className="group flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#14b8a6]/15 bg-white/80 text-slate-600 shadow-sm transition-all duration-200 hover:border-[#14b8a6]/40 hover:bg-slate-50 active:scale-95 md:hidden"
          aria-label="Toggle menu"
        >
          <FiMenu size={20} className="transition-transform duration-200 group-hover:rotate-90" />
        </button>

        {/* Search - hidden on mobile, shown on sm+ */}
        <div className="hidden sm:block min-w-0 flex-1 max-w-2xl">
          <SearchBar />
        </div>

        {/* Mobile search - expandable */}
        {showMobileSearch && (
          <div className="sm:hidden flex-1 animate-in slide-in-from-left duration-200">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Right — actions */}
      <div className="flex flex-shrink-0 items-center gap-1 sm:gap-1.5 lg:gap-2">
        {/* Mobile search toggle */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="flex sm:hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-600 transition-all duration-200 hover:bg-slate-100 active:scale-95"
          aria-label="Toggle search"
        >
          {showMobileSearch ? <FiX size={20} /> : <FiSearch size={20} />}
        </button>

        {/* Desktop-only items */}
        <div className="hidden lg:block">
          <TokensInfo />
        </div>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Notifications />
        </div>

        {/* Divider - desktop only */}
        <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

        {/* User Menu */}
        <div className="relative">
          <UserMenu email={email} />
        </div>
      </div>
    </header>
  );
}