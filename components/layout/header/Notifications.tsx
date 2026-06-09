import { FiBell } from "react-icons/fi";

export default function Notifications() {
  return (
    <button className="relative rounded-xl border border-border p-3">
      <FiBell size={20} />

      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs font-semibold text-white">
        3
      </span>
    </button>
  );
}
