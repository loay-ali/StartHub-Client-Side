import { FiMenu } from "react-icons/fi";

import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import Notifications from "./Notifications";
import TokensInfo from "./TokensInfo";
import UserMenu from "./UserMenu";

interface HeaderProps {
  onMenuClick?: () => void;
  email:string;
  tokensLeft:number;
}

export default function Header({ tokensLeft,email,onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#14b8a6]/10 bg-white/80 backdrop-blur-lg px-4 md:px-6 shadow-[0_1px_0_rgba(20,184,166,0.08)] sticky top-0 z-40 transition-all duration-200">
      {/* Left — mobile toggle + search */}
      <div className="flex items-center flex-1 max-w-md gap-3">
        <button
          onClick={onMenuClick}
          className="mr-1 block md:hidden p-2 rounded-xl border border-[#14b8a6]/15 bg-white/70 hover:bg-slate-50 hover:border-[#14b8a6]/40 transition-all duration-200"
        >
          <FiMenu size={20} className="text-slate-600" />
        </button>

        <SearchBar />
      </div>

      {/* Right — actions */}
      <div className="ml-4 flex items-center gap-1 md:gap-2">
        {/* Vertical divider */}
        <div className="hidden lg:block h-5 w-px bg-slate-200 mx-1" />

        <div className="hidden lg:block">
          <TokensInfo tokensLeft={tokensLeft}/>
        </div>

        <div className="hidden lg:block h-5 w-px bg-slate-200 mx-1" />

        <Notifications />

        <div className="hidden md:block h-5 w-px bg-slate-200 mx-1" />

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        <UserMenu email={email} />
      </div>
    </header>
  );
}
