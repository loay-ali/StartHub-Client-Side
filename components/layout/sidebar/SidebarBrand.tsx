import Link from "next/link";

interface SidebarBrandProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function SidebarBrand({
  collapsed,
  onToggle,
}: SidebarBrandProps) {
  return (
    <div
      className={`mb-6 flex items-center ${
        collapsed ? "justify-center" : "justify-between"
      }`}
    >
      {/*<Link
        href="/dashboard"
        className="flex items-center gap-3 overflow-hidden"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-white">
          S
        </div>

        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold text-text-primary">StartHub</h1>

            <p className="text-xs text-text-secondary">Client Dashboard</p>
          </div>
        )}
      </Link>*/}

      {!collapsed && (
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:bg-slate-50"
        >
          ←
        </button>
      )}
    </div>
  );
}
