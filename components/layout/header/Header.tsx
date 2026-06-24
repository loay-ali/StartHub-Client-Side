import { FiMenu } from "react-icons/fi";

import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import Notifications from "./Notifications";
import TokensInfo from "./TokensInfo";
import UserMenu from "./UserMenu";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-4 md:px-6">
      <div className="flex items-center flex-1 max-w-md">
        <button onClick={onMenuClick} className="mr-3 block md:hidden">
          <FiMenu size={24} />
        </button>

        <SearchBar />
      </div>

      <div className="ml-4 flex items-center gap-2 md:gap-4">
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <div className="hidden lg:block">
          <TokensInfo />
        </div>

        <Notifications />

        <UserMenu />
      </div>
    </header>
  );
}
