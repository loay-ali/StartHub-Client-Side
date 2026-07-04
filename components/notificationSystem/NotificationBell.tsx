"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useNotificationContext } from "./NotificationProvider";
import { NotificationCenter } from "./NotificationCenter";

// ─── NotificationBell ─────────────────────────────────────────────────────────

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className = "" }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotificationContext();

  return (
    <div className={`fixed bottom-5 right-5 z-[9999] ${className}`}>
      <button
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-gray-200 shadow-2xl backdrop-blur-xl transition-colors hover:bg-slate-800 hover:text-white"
      >
        <Bell size={17} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-11 z-50">
            <NotificationCenter onClose={() => setOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}
