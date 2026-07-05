"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
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
  X,
} from "lucide-react";
import type { Toast, NotificationType, ActionType, NotificationAction } from "../../lib/notifiationSystem/types";
import { useNotificationContext } from "./NotificationProvider";

// ─── Toast icon & color map ───────────────────────────────────────────────────

const TOAST_META: Record<
  NotificationType,
  { icon: React.ElementType; border: string; iconColor: string }
> = {
  success:        { icon: CheckCircle2,  border: "border-emerald-500/30", iconColor: "text-emerald-400" },
  error:          { icon: XCircle,       border: "border-red-500/30",     iconColor: "text-red-400" },
  warning:        { icon: AlertTriangle, border: "border-amber-500/30",   iconColor: "text-amber-400" },
  info:           { icon: Info,          border: "border-teal-500/30",    iconColor: "text-teal-400" },
  system:         { icon: Settings,      border: "border-violet-500/30",  iconColor: "text-violet-400" },
  integration:    { icon: Plug,          border: "border-cyan-500/30",    iconColor: "text-cyan-400" },
  automation:     { icon: Zap,           border: "border-yellow-500/30",  iconColor: "text-yellow-400" },
  insight:        { icon: Lightbulb,     border: "border-orange-500/30",  iconColor: "text-orange-400" },
  recommendation: { icon: Star,          border: "border-teal-400/30",    iconColor: "text-teal-300" },
  risk:           { icon: ShieldAlert,   border: "border-red-400/30",     iconColor: "text-red-300" },
  critical:       { icon: XCircle,       border: "border-red-600/50",     iconColor: "text-red-500" },
  ai:             { icon: Bot,           border: "border-teal-500/30",  iconColor: "text-teal-400" },
  activity:       { icon: Activity,      border: "border-gray-500/30",    iconColor: "text-gray-400" },
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

// ─── ToastItem ────────────────────────────────────────────────────────────────

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const meta = TOAST_META[toast.type];
  const Icon = meta.icon;

  const primaryActions = toast.actions?.filter((a) => a.type !== "dismiss").slice(0, 2) ?? [];

  return (
    <div
      className={`flex w-[360px] gap-3 rounded-xl border bg-[#0f1117]/95 px-4 py-3.5 shadow-2xl backdrop-blur-md ${meta.border}`}
    >
      <Icon size={16} className={`mt-0.5 shrink-0 ${meta.iconColor}`} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{toast.title}</p>
        <p className="mt-0.5 text-xs text-gray-400 leading-relaxed">{toast.message}</p>

        {/* AI badge */}
        {toast.ai && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="rounded-full bg-teal-500/15 px-2 py-0.5 text-[10px] font-medium text-teal-300">
              {toast.ai.agent}
            </span>
            <span className="text-[10px] text-gray-500">
              {Math.round(toast.ai.confidence * 100)}% confidence
            </span>
          </div>
        )}

        {/* Action buttons */}
        {primaryActions.length > 0 && (
          <div className="mt-2.5 flex gap-2">
            {primaryActions.map((action: NotificationAction) => (
              <button
                key={action.id}
                onClick={() => {
                  action.handler?.();
                  onDismiss(toast.id);
                }}
                className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition-colors"
              >
                {ACTION_LABELS[action.type] ?? action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        aria-label="Dismiss toast"
        onClick={() => onDismiss(toast.id)}
        className="mt-0.5 shrink-0 text-gray-500 hover:text-gray-200 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  );
}

// ─── ToastContainer ───────────────────────────────────────────────────────────

export function ToastContainer() {
  const { toasts, dismissToast } = useNotificationContext();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed top-5 right-5 z-[9999] flex flex-col gap-2"
    >
      {toasts.map((toast: Toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}