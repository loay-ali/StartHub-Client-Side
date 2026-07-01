import type {
  Notification,
  NotificationInput,
  NotificationType,
  NotificationPriority,
  NotificationAction,
  ActionType,
} from "../types";

// ─── ID Generator ─────────────────────────────────────────────────────────────

let seq = 0;
export function generateId(prefix = "n"): string {
  return `${prefix}_${Date.now()}_${++seq}`;
}

// ─── Priority map ─────────────────────────────────────────────────────────────

const TYPE_PRIORITY: Record<NotificationType, NotificationPriority> = {
  success: "low",
  info: "low",
  activity: "low",
  insight: "medium",
  recommendation: "medium",
  automation: "medium",
  integration: "medium",
  warning: "medium",
  ai: "medium",
  system: "high",
  risk: "high",
  error: "high",
  critical: "urgent",
};

// ─── Default toast duration map ───────────────────────────────────────────────

const TYPE_TOAST_DURATION: Record<NotificationType, number> = {
  success: 4000,
  info: 5000,
  activity: 4000,
  insight: 6000,
  recommendation: 7000,
  automation: 5000,
  integration: 5000,
  warning: 6000,
  ai: 7000,
  system: 8000,
  risk: 8000,
  error: 8000,
  critical: 0, // persistent
};

// ─── Default actions per type ─────────────────────────────────────────────────

function defaultActions(type: NotificationType): NotificationAction[] {
  const map: Partial<Record<NotificationType, ActionType[]>> = {
    error: ["retry", "dismiss"],
    critical: ["open", "assign", "dismiss"],
    recommendation: ["accept_recommendation", "dismiss"],
    risk: ["open", "assign"],
    ai: ["accept_recommendation", "chat", "dismiss"],
    automation: ["open", "undo"],
    integration: ["open", "retry"],
  };

  const types = map[type] ?? [];
  return types.map((t) => buildAction(t));
}

// ─── Action builder ───────────────────────────────────────────────────────────

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

const ACTION_VARIANT: Record<ActionType, NotificationAction["variant"]> = {
  open: "primary",
  retry: "secondary",
  assign: "secondary",
  undo: "ghost",
  dismiss: "ghost",
  accept_recommendation: "primary",
  create_task: "secondary",
  chat: "secondary",
};

export function buildAction(
  type: ActionType,
  overrides?: Partial<NotificationAction>
): NotificationAction {
  return {
    id: generateId("a"),
    type,
    label: ACTION_LABELS[type],
    variant: ACTION_VARIANT[type],
    ...overrides,
  };
}

// ─── Notification Factory ─────────────────────────────────────────────────────

export class NotificationFactory {
  static create(input: NotificationInput): Notification {
    const now = Date.now();

    return {
      id: input.id ?? generateId(),
      type: input.type,
      priority: input.priority ?? TYPE_PRIORITY[input.type],
      status: input.status ?? "unread",
      title: input.title,
      message: input.message,
      timestamp: input.timestamp ?? now,
      expiresAt: input.expiresAt,
      groupId: input.groupId,
      sourceId: input.sourceId,
      actions: input.actions ?? defaultActions(input.type),
      ai: input.ai,
      metadata: input.metadata,
      read: input.read ?? false,
      archived: input.archived ?? false,
    };
  }

  static toastDuration(type: NotificationType): number {
    return TYPE_TOAST_DURATION[type];
  }
}
