// ─── Notification Types ────────────────────────────────────────────────────────

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "system"
  | "integration"
  | "automation"
  | "insight"
  | "recommendation"
  | "risk"
  | "critical"
  | "ai"
  | "activity";

export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export type NotificationStatus = "unread" | "read" | "archived" | "dismissed";

export type ActionType =
  | "open"
  | "retry"
  | "assign"
  | "undo"
  | "dismiss"
  | "accept_recommendation"
  | "create_task"
  | "chat";

// ─── Action Button ─────────────────────────────────────────────────────────────

export interface NotificationAction {
  id: string;
  type: ActionType;
  label: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  payload?: Record<string, unknown>;
  handler?: () => void | Promise<void>;
}

// ─── AI Metadata ───────────────────────────────────────────────────────────────

export interface AIMetadata {
  confidence: number; // 0–1
  agent: string;
  model?: string;
  reasoning?: string;
  actions?: NotificationAction[];
  tags?: string[];
  source?: string;
}

// ─── Core Notification ────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  timestamp: number;
  expiresAt?: number;
  groupId?: string;
  sourceId?: string;
  actions?: NotificationAction[];
  ai?: AIMetadata;
  metadata?: Record<string, unknown>;
  read: boolean;
  archived: boolean;
}

// ─── Notification Input (create) ──────────────────────────────────────────────

export type NotificationInput = Omit<
  Notification,
  "id" | "timestamp" | "status" | "read" | "archived"
> & {
  id?: string;
  timestamp?: number;
  status?: NotificationStatus;
  read?: boolean;
  archived?: boolean;
};

// ─── Toast ────────────────────────────────────────────────────────────────────

export interface Toast {
  id: string;
  notificationId: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // ms; 0 = persistent
  actions?: NotificationAction[];
  ai?: AIMetadata;
}

// ─── Event Bus ────────────────────────────────────────────────────────────────

export type EventMap = {
  "notification:created": Notification;
  "notification:updated": Notification;
  "notification:read": { id: string };
  "notification:archived": { id: string };
  "notification:dismissed": { id: string };
  "notification:cleared": void;
  "toast:show": Toast;
  "toast:dismiss": { id: string };
  "transport:connected": { transport: string };
  "transport:disconnected": { transport: string };
  "transport:error": { transport: string; error: Error };
  "api:request": { url: string; method: string };
  "api:success": { url: string; method: string; status: number };
  "api:error": { url: string; method: string; status: number; message: string };
};

export type EventKey = keyof EventMap;
export type EventHandler<K extends EventKey> = (payload: EventMap[K]) => void;

// ─── Transport ────────────────────────────────────────────────────────────────

export interface NotificationTransport {
  readonly name: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(notification: Notification): Promise<void>;
  onReceive(handler: (notification: Notification) => void): () => void;
}

// ─── Store State ──────────────────────────────────────────────────────────────

export interface NotificationStoreState {
  notifications: Notification[];
  toasts: Toast[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

// ─── Store Actions ────────────────────────────────────────────────────────────

export interface NotificationStoreActions {
  add(input: NotificationInput): Notification;
  update(id: string, patch: Partial<Notification>): void;
  remove(id: string): void;
  markRead(id: string): void;
  markAllRead(): void;
  archive(id: string): void;
  dismiss(id: string): void;
  clear(): void;
  showToast(toast: Omit<Toast, "id">): void;
  dismissToast(id: string): void;
}

// ─── Service API ──────────────────────────────────────────────────────────────

export interface NotificationServiceAPI {
  success(title: string, message: string, options?: Partial<NotificationInput>): Notification;
  error(title: string, message: string, options?: Partial<NotificationInput>): Notification;
  warning(title: string, message: string, options?: Partial<NotificationInput>): Notification;
  info(title: string, message: string, options?: Partial<NotificationInput>): Notification;
  system(title: string, message: string, options?: Partial<NotificationInput>): Notification;
  ai(title: string, message: string, aiMeta: AIMetadata, options?: Partial<NotificationInput>): Notification;
  critical(title: string, message: string, options?: Partial<NotificationInput>): Notification;
}

// ─── Provider Props ───────────────────────────────────────────────────────────

export interface NotificationProviderProps {
  children: React.ReactNode;
  transportConfig?: {
    type: "rest" | "websocket" | "mock";
    baseUrl?: string;
    url?: string;
  };
  maxToasts?: number;
  defaultToastDuration?: number;
  persistKey?: string;
}

// ─── Hook Return ──────────────────────────────────────────────────────────────

export interface UseNotificationsReturn
  extends NotificationStoreState,
    NotificationStoreActions {
  service: NotificationServiceAPI;
}