import { FiMenu } from "react-icons/fi";

import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import Notifications from "./Notifications";
import TokensInfo from "./TokensInfo";
import UserMenu from "./UserMenu";

interface HeaderProps {
  onMenuClick?: () => void;
  email: string;
  tokens:number;
}

export default function Header({ tokens,email, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 px-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-200 sm:h-20 sm:px-4 lg:px-6">
      {/* Left — mobile toggle + search */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#14b8a6]/15 bg-white/80 text-slate-600 shadow-sm transition-all duration-200 hover:border-[#14b8a6]/40 hover:bg-slate-50 md:hidden"
        >
          <FiMenu size={18} />
        </button>

        <div className="min-w-0 flex-1 max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {/* Right — actions */}
      <div className="ml-3 flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
        <div className="hidden lg:block">
          <TokensInfo tokens = {tokens} />
        </div>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <Notifications />

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        <UserMenu email={email} />
      </div>
    </header>
  );
}