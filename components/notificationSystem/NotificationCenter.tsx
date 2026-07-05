"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  CheckCheck,
  Trash2,
  Filter,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Info,
  Settings,
  Plug,
  Bot,
  Zap,
  TrendingUp,
  ShieldAlert,
  Activity,
  Lightbulb,
  Star,
} from "lucide-react";
import type { Notification, NotificationType, ActionType } from "../../lib/notifiationSystem/types";
import { useNotificationContext } from "./NotificationProvider";
import { formatRelativeTime } from "../../lib/notifiationSystem/utils/time";

// ─── Type meta ────────────────────────────────────────────────────────────────

const TYPE_META: Record<
  NotificationType,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  success:        { icon: CheckCheck,   color: "text-emerald-400", bg: "bg-emerald-500/10",  label: "Success" },
  error:          { icon: AlertCircle,  color: "text-red-400",     bg: "bg-red-500/10",      label: "Error" },
  warning:        { icon: AlertTriangle,color: "text-amber-400",   bg: "bg-amber-500/10",    label: "Warning" },
  info:           { icon: Info,         color: "text-teal-400",    bg: "bg-teal-500/10",     label: "Info" },
  system:         { icon: Settings,     color: "text-violet-400",  bg: "bg-violet-500/10",   label: "System" },
  integration:    { icon: Plug,         color: "text-cyan-400",    bg: "bg-cyan-500/10",     label: "Integration" },
  automation:     { icon: Zap,          color: "text-yellow-400",  bg: "bg-yellow-500/10",   label: "Automation" },
  insight:        { icon: Lightbulb,    color: "text-orange-400",  bg: "bg-orange-500/10",   label: "Insight" },
  recommendation: { icon: Star,         color: "text-teal-300",    bg: "bg-teal-500/10",     label: "Recommendation" },
  risk:           { icon: ShieldAlert,  color: "text-red-300",     bg: "bg-red-500/10",      label: "Risk" },
  critical:       { icon: AlertCircle,  color: "text-red-500",     bg: "bg-red-600/15",      label: "Critical" },
  ai:             { icon: Bot,          color: "text-teal-400",  bg: "bg-teal-500/10",   label: "AI" },
  activity:       { icon: Activity,     color: "text-gray-400",    bg: "bg-gray-500/10",     label: "Activity" },
};

const ACTION_LABELS: Record<ActionType, string> = {
  open: "Open",
  retry: "Retry",
  assign: "Assign",
  undo: "Undo",
  dismiss: "Dismiss",
  accept_recommendation: "Accept",
  create_task: "Create Task",
  chat: "Chat",
};

type FilterTab = "all" | "unread" | "ai" | "critical";

// ─── NotificationItem ─────────────────────────────────────────────────────────

function NotificationItem({
  notification,
  onMarkRead,
  onArchive,
  onDismiss,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const meta = TYPE_META[notification.type];
  const Icon = meta.icon;

  return (
    <div
      className={`group relative flex gap-3 border-b border-white/5 px-4 py-3.5 transition-colors hover:bg-white/[0.03] ${
        !notification.read ? "bg-white/[0.02]" : ""
      }`}
      onClick={() => !notification.read && onMarkRead(notification.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && !notification.read && onMarkRead(notification.id)}
    >
      {/* Unread dot */}
      {!notification.read && (
        <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal-500" />
      )}

      {/* Icon */}
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.bg}`}>
        <Icon size={14} className={meta.color} />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-white leading-snug">{notification.title}</p>
          <span className="mt-0.5 shrink-0 text-[11px] text-gray-500">
            {formatRelativeTime(notification.timestamp)}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-gray-400 leading-relaxed line-clamp-2">
          {notification.message}
        </p>

        {/* AI metadata */}
        {notification.ai && (
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-teal-500/15 px-2 py-0.5 text-[10px] font-medium text-teal-300">
              {notification.ai.agent}
            </span>
            <span className="text-[10px] text-gray-500">
              {Math.round(notification.ai.confidence * 100)}% confidence
            </span>
          </div>
        )}

        {/* Actions */}
        {notification.actions && notification.actions.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {notification.actions
              .filter((a) => a.type !== "dismiss")
              .map((action) => (
                <button
                  key={action.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.handler?.();
                    if (action.type === "dismiss") onDismiss(notification.id);
                  }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    action.variant === "primary"
                      ? "bg-teal-500/20 text-teal-300 hover:bg-teal-500/30"
                      : action.variant === "danger"
                      ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {ACTION_LABELS[action.type] ?? action.label}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Hover controls */}
      <div className="absolute right-3 top-3 hidden items-center gap-1 group-hover:flex">
        <button
          title="Archive"
          onClick={(e) => { e.stopPropagation(); onArchive(notification.id); }}
          className="rounded p-1 text-gray-500 hover:bg-white/10 hover:text-gray-200"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── NotificationCenter ───────────────────────────────────────────────────────

interface NotificationCenterProps {
  onClose?: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const { notifications, unreadCount, markRead, markAllRead, archive, dismiss, clear } =
    useNotificationContext();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const visible = useMemo(() => {
    return notifications
      .filter((n: Notification) => !n.archived)
      .filter((n: Notification) => {
        if (activeTab === "unread") return !n.read;
        if (activeTab === "ai") return n.type === "ai" || n.type === "recommendation" || n.type === "insight";
        if (activeTab === "critical") return n.type === "critical" || n.type === "risk" || n.priority === "urgent";
        return true;
      });
  }, [notifications, activeTab]);

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "ai", label: "AI" },
    { key: "critical", label: "Critical" },
  ];

  return (
    <div className="flex w-[400px] flex-col rounded-2xl border border-white/10 bg-[#0f1117] shadow-2xl overflow-hidden max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Notifications</span>
          {unreadCount > 0 && (
            <span className="rounded-full bg-teal-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              title="Mark all read"
              onClick={markAllRead}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <CheckCheck size={14} />
            </button>
          )}
          <button
            title="Clear all"
            onClick={clear}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <Trash2 size={14} />
          </button>
          {onClose && (
            <button
              title="Close"
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "border-teal-500 text-teal-400"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="rounded-full bg-teal-500/20 px-1.5 text-[10px] text-teal-300">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-500">
            <Filter size={20} className="opacity-40" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          visible.map((n: Notification) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={markRead}
              onArchive={archive}
              onDismiss={dismiss}
            />
          ))
        )}
      </div>
    </div>
  );
}
