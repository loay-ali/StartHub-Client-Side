import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />

      <input
        type="text"
        placeholder="Search anything..."
        className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}