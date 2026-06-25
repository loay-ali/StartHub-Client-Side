import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />

      <input
        type="text"
        placeholder="Search anything..."
        className="w-full rounded-xl border border-[#14b8a6]/15 bg-white/60 backdrop-blur-sm py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#14b8a6]/50 focus:ring-2 focus:ring-[#14b8a6]/10 focus:bg-white/90"
      />
    </div>
  );
}