import { FiBell, FiGlobe, FiLock, FiUser } from "react-icons/fi";

interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function SettingsSidebar({ activeTab, onChange }: Props) {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
    },
    {
      id: "security",
      label: "Security",
      icon: FiLock,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FiBell,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: FiGlobe,
    },
  ];

  return (
    <div className="h-fit rounded-3xl border border-border bg-surface p-4 shadow-sm">
      <div className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
