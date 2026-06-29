"use client";

import { useState, useCallback } from "react";
import {
  Sparkles,
  Plug,
  UserPlus,
  Building,
  Briefcase,
  AlertCircle,
  UserMinus,
  BuildingIcon,
  CircuitBoard,
  Unlink,
  X,
  Info,
  ShieldOff,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BannerType = "info" | "danger";

interface BannerTemplate {
  icon: React.ElementType;
  text: string;
  cta: string | null;
}

interface Banner {
  id: string;
  type: BannerType;
  icon: React.ElementType;
  text: string;
  cta: string | null;
  time: string;
}

interface TriggerDef {
  key: string;
  type: BannerType;
  icon: React.ElementType;
  label: string;
  sub: string;
}

// ─── Templates ────────────────────────────────────────────────────────────────

const TEMPLATES: Record<BannerType, Record<string, BannerTemplate>> = {
  info: {
    feat: {
      icon: Sparkles,
      text: "AI recommendations enabled — smart alerts will now surface in your dashboard.",
      cta: "View features",
    },
    service: {
      icon: Plug,
      text: "Stripe connected. Revenue data will sync within a few minutes.",
      cta: "See integrations",
    },
    user: {
      icon: UserPlus,
      text: "Layla Hassan invited to Engineering. They'll get an email shortly.",
      cta: "Manage members",
    },
    dept: {
      icon: Building,
      text: "Product & Design department created. Invite members to get started.",
      cta: "Add members",
    },
    job: {
      icon: Briefcase,
      text: "Senior Backend Engineer posted. It's live on your job board.",
      cta: "View posting",
    },
  },
  danger: {
    err: {
      icon: AlertCircle,
      text: "Could not delete the Logistics service — active dependencies detected. Resolve them first.",
      cta: "View dependencies",
    },
    "del-user": {
      icon: UserMinus,
      text: "Omar Khalil removed from your workspace. All their data has been unlinked.",
      cta: null,
    },
    "del-dept": {
      icon: BuildingIcon,
      text: "Finance department deleted. 4 members are now unassigned.",
      cta: "Reassign members",
    },
    "del-feat": {
      icon: CircuitBoard,
      text: "Advanced analytics removed from your plan. Existing reports stay accessible.",
      cta: "Restore",
    },
    "del-svc": {
      icon: Unlink,
      text: "HubSpot disconnected. CRM sync has stopped — reconnect to resume.",
      cta: "Reconnect",
    },
  },
};

// ─── Trigger definitions ───────────────────────────────────────────────────────

const TRIGGERS: TriggerDef[] = [
  { key: "feat",     type: "info",   icon: Sparkles,    label: "Add feature",    sub: "AI recommendations" },
  { key: "service",  type: "info",   icon: Plug,        label: "Add service",    sub: "Connect Stripe" },
  { key: "user",     type: "info",   icon: UserPlus,    label: "Add user",       sub: "Invite member" },
  { key: "dept",     type: "info",   icon: Building,    label: "Add department", sub: "New team" },
  { key: "job",      type: "info",   icon: Briefcase,   label: "Post job",       sub: "Open role" },
  { key: "err",      type: "danger", icon: AlertCircle, label: "Error",          sub: "Action failed" },
  { key: "del-user", type: "danger", icon: UserMinus,   label: "Delete user",    sub: "Remove member" },
  { key: "del-dept", type: "danger", icon: BuildingIcon,label: "Delete department", sub: "Remove team" },
  { key: "del-feat", type: "danger", icon: CircuitBoard,label: "Delete feature", sub: "Remove module" },
  { key: "del-svc",  type: "danger", icon: Unlink,      label: "Delete service", sub: "Disconnect integration" },
];

// ─── BannerItem ───────────────────────────────────────────────────────────────

function BannerItem({
  banner,
  onDismiss,
}: {
  banner: Banner;
  onDismiss: (id: string) => void;
}) {
  const Icon = banner.icon;

  const isInfo = banner.type === "info";

  const containerCls = isInfo
    ? "bg-blue-50 border-blue-200 text-blue-800"
    : "bg-red-50 border-red-200 text-red-800";

  const ctaCls = isInfo
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-red-600 text-white hover:bg-red-700";

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 animate-in slide-in-from-top-2 duration-200 ${containerCls}`}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug">{banner.text}</p>
        <p className="text-xs mt-0.5 opacity-60">{banner.time}</p>
        {banner.cta && (
          <button
            className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${ctaCls}`}
          >
            {banner.cta}
          </button>
        )}
      </div>

      <button
        aria-label="Dismiss"
        onClick={() => onDismiss(banner.id)}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── BannerColumn ─────────────────────────────────────────────────────────────

function BannerColumn({
  type,
  banners,
  onDismiss,
}: {
  type: BannerType;
  banners: Banner[];
  onDismiss: (id: string) => void;
}) {
  const isInfo = type === "info";
  const label = isInfo ? "Info" : "Alerts";
  const EmptyIcon = isInfo ? Info : ShieldOff;
  const emptyText = isInfo ? "No info messages yet" : "No alerts yet";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium tracking-widest uppercase text-gray-400">
          {label}
        </span>
        {banners.length > 0 && (
          <span className="text-[11px] text-gray-400">({banners.length})</span>
        )}
      </div>

      {banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-10 text-gray-400">
          <EmptyIcon size={22} className="opacity-40" />
          <p className="text-xs">{emptyText}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {banners.map((b) => (
            <BannerItem key={b.id} banner={b} onDismiss={onDismiss} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TriggerButton ────────────────────────────────────────────────────────────

function TriggerButton({
  trigger,
  onClick,
}: {
  trigger: TriggerDef;
  onClick: () => void;
}) {
  const Icon = trigger.icon;
  const isInfo = trigger.type === "info";

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-left transition-colors hover:bg-white"
    >
      <Icon
        size={15}
        className={`shrink-0 ${isInfo ? "text-blue-500" : "text-red-500"}`}
      />
      <span className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">{trigger.label}</span>
        <span className="text-xs text-gray-400">{trigger.sub}</span>
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MessageBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);

  const fire = useCallback((type: BannerType, key: string) => {
    const tpl = TEMPLATES[type][key];
    const banner: Banner = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      icon: tpl.icon,
      text: tpl.text,
      cta: tpl.cta,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setBanners((prev) => [banner, ...prev]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const infoBanners   = banners.filter((b) => b.type === "info");
  const dangerBanners = banners.filter((b) => b.type === "danger");

  const infoTriggers   = TRIGGERS.filter((t) => t.type === "info");
  const dangerTriggers = TRIGGERS.filter((t) => t.type === "danger");

  return (
    <div className="flex min-h-screen gap-5 p-6 font-sans">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 flex flex-col gap-2">
        <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 px-1 mb-1">
          Trigger event
        </p>

        <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 px-1 mt-2">
          Info
        </p>
        {infoTriggers.map((t) => (
          <TriggerButton key={t.key} trigger={t} onClick={() => fire(t.type, t.key)} />
        ))}

        <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 px-1 mt-4">
          Danger
        </p>
        {dangerTriggers.map((t) => (
          <TriggerButton key={t.key} trigger={t} onClick={() => fire(t.type, t.key)} />
        ))}
      </aside>

      {/* Message columns */}
      <main className="flex-1 flex flex-col gap-6 min-w-0">
        <BannerColumn type="info"   banners={infoBanners}   onDismiss={dismiss} />
        <BannerColumn type="danger" banners={dangerBanners} onDismiss={dismiss} />
      </main>
    </div>
  );
}