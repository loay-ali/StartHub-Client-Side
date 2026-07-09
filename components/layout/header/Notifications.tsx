"use client";

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from "react";

import { FiBell, FiRefreshCw } from "react-icons/fi";
import { MdError, MdCancel } from "react-icons/md";
import { PiWarningDiamondFill } from "react-icons/pi";
import { RiInformation2Fill } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import config from "@/constants/config";

type BackendNotification = {
  id: string;
  name: string;
  details?: string;
  type: 'WARNING' | 'INFO' | 'ERROR' | 'DONE' | 'CANCELLATION';
  seen: boolean;
  createdAt: string;
};

function NotificationIcon({ type }: { type: BackendNotification['type'] }) {
  const size = 18;
  switch (type) {
    case 'ERROR':      return <MdError size={size} color="#ef4444" />;
    case 'WARNING':    return <PiWarningDiamondFill size={size} color="#f59e0b" />;
    case 'INFO':       return <RiInformation2Fill size={size} color="#6366f1" />;
    case 'DONE':       return <CiCircleCheck size={size} color="#10b981" />;
    case 'CANCELLATION': return <MdCancel size={size} color="#ef4444" />;
    default:           return <RiInformation2Fill size={size} color="#6366f1" />;
  }
}

function typeLabel(type: BackendNotification['type']): string {
  switch (type) {
    case 'ERROR':        return 'Error';
    case 'WARNING':      return 'Warning';
    case 'INFO':         return 'Info';
    case 'DONE':         return 'Done';
    case 'CANCELLATION': return 'Cancelled';
    default:             return 'Notification';
  }
}

function typePill(type: BackendNotification['type']): string {
  switch (type) {
    case 'ERROR':
    case 'CANCELLATION': return 'bg-red-50 text-red-500 border-red-100';
    case 'WARNING':      return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'INFO':         return 'bg-indigo-50 text-indigo-500 border-indigo-100';
    case 'DONE':         return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    default:             return 'bg-slate-50 text-slate-500 border-slate-100';
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<BackendNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(config.apiUrl + '/user/notifications', {
        credentials: 'include',
      });
      if (res.ok) {
        const json = await res.json();
        setNotifications(json.data ?? []);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark top notifications as seen via backend
  const markAsSeen = useCallback(async () => {
    try {
      await fetch(config.apiUrl + '/user/checkNotifications', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ where: 'upperNav', lastIndex: 0 }),
      });
      // Optimistically mark current notifications as seen in UI
      setNotifications(prev => prev.map(n => ({ ...n, seen: true })));
    } catch {
      // silently fail – not critical
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When dropdown opens: mark as seen
  const handleToggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      markAsSeen();
    }
  };

  const unseenCount = notifications.filter(n => !n.seen).length;

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        id="notifications-bell-btn"
        onClick={handleToggle}
        aria-label="Open notifications"
        className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent bg-transparent text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-teal-600 hover:border-slate-200"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin opacity-60" />
        ) : (
          <FiBell className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
        )}

        {/* Unseen badge */}
        {unseenCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
            {unseenCount > 9 ? '9+' : unseenCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(92vw,380px)] rounded-3xl border border-slate-100/80 bg-white/95 p-3 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:w-[380px]"
          style={{ animation: 'fadeSlideIn 0.18s ease-out' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-3 pt-2 pb-3 border-b border-slate-100 mb-2">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</p>
            <div className="flex items-center gap-2">
              {unseenCount > 0 && (
                <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                  {unseenCount} unread
                </span>
              )}
              <button
                id="notifications-refresh-btn"
                onClick={(e) => { e.stopPropagation(); fetchNotifications(); }}
                className="p-1 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 transition"
                title="Refresh notifications"
              >
                <FiRefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <ul className="max-h-[320px] overflow-y-auto space-y-1 pr-0.5 custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                <span className="text-sm">Loading…</span>
              </div>
            ) : error ? (
              <div className="py-6 text-center">
                <p className="text-sm text-red-400 font-medium">Failed to load notifications</p>
                <button
                  onClick={fetchNotifications}
                  className="mt-2 text-xs text-teal-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center">
                <FiBell className="mx-auto mb-2 text-slate-300" size={28} />
                <p className="text-sm text-slate-400">No notifications yet</p>
              </div>
            ) : (
              notifications.map((noti) => (
                <li
                  key={noti.id}
                  className={`group flex items-start gap-3 rounded-2xl p-3 transition-all duration-200 cursor-pointer
                    ${noti.seen
                      ? 'hover:bg-slate-50 opacity-75'
                      : 'hover:bg-teal-50/30 bg-teal-50/10 border border-teal-100/50'
                    }`}
                >
                  {/* Icon */}
                  <div className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100 transition-transform duration-200 group-hover:scale-110`}>
                    <NotificationIcon type={noti.type} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold truncate transition-colors
                        ${noti.seen ? 'text-slate-600' : 'text-slate-800 group-hover:text-teal-700'}`}>
                        {noti.name}
                      </p>
                      {!noti.seen && (
                        <span className="flex-shrink-0 h-2 w-2 rounded-full bg-teal-500 mt-1.5" />
                      )}
                    </div>
                    {noti.details && (
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {noti.details}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${typePill(noti.type)}`}>
                        {typeLabel(noti.type)}
                      </span>
                      {noti.createdAt && (
                        <span className="text-[10px] text-slate-400">
                          {timeAgo(noti.createdAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Footer */}
          <div className="mt-2 pt-2 border-t border-slate-100">
            <Link
              id="notifications-view-all-link"
              onClick={() => setOpen(false)}
              href='/dashboard/notifications'
              className="flex w-full items-center justify-center rounded-xl bg-slate-50 py-2.5 text-xs font-semibold text-teal-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}