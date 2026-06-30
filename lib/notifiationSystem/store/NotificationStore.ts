import type {
  Notification,
  NotificationInput,
  NotificationStoreState,
  NotificationStoreActions,
  Toast,
} from "../types";
import { NotificationFactory, generateId } from "../factory/NotificationFactory";
import { eventBus } from "../core/eventBus";

// ─── Subscriber type ──────────────────────────────────────────────────────────

type StoreListener = (state: NotificationStoreState) => void;

// ─── Notification Store ───────────────────────────────────────────────────────

class NotificationStore implements NotificationStoreActions {
  private state: NotificationStoreState = {
    notifications: [],
    toasts: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  };

  private listeners: Set<StoreListener> = new Set();
  private maxToasts: number = 5;

  // ─── Subscribe / notify ──────────────────────────────────────────────────────

  subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): NotificationStoreState {
    return this.state;
  }

  private setState(patch: Partial<NotificationStoreState>): void {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((l) => l(this.state));
  }

  private recalcUnread(): void {
    this.setState({
      unreadCount: this.state.notifications.filter((n) => !n.read && !n.archived).length,
    });
  }

  configure(options: { maxToasts?: number }): void {
    if (options.maxToasts !== undefined) this.maxToasts = options.maxToasts;
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  add(input: NotificationInput): Notification {
    const notification = NotificationFactory.create(input);

    this.setState({
      notifications: [notification, ...this.state.notifications],
    });
    this.recalcUnread();

    eventBus.emit("notification:created", notification);

    // Auto-show toast
    this.showToast({
      notificationId: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      duration: NotificationFactory.toastDuration(notification.type),
      actions: notification.actions,
      ai: notification.ai,
    });

    return notification;
  }

  update(id: string, patch: Partial<Notification>): void {
    const updated = this.state.notifications.map((n) =>
      n.id === id ? { ...n, ...patch } : n
    );
    const notification = updated.find((n) => n.id === id);
    this.setState({ notifications: updated });
    this.recalcUnread();
    if (notification) eventBus.emit("notification:updated", notification);
  }

  remove(id: string): void {
    this.setState({
      notifications: this.state.notifications.filter((n) => n.id !== id),
    });
    this.recalcUnread();
  }

  markRead(id: string): void {
    this.update(id, { read: true, status: "read" });
    eventBus.emit("notification:read", { id });
  }

  markAllRead(): void {
    const updated = this.state.notifications.map((n) =>
      !n.read ? { ...n, read: true, status: "read" as const } : n
    );
    this.setState({ notifications: updated, unreadCount: 0 });
  }

  archive(id: string): void {
    this.update(id, { archived: true, status: "archived", read: true });
    eventBus.emit("notification:archived", { id });
  }

  dismiss(id: string): void {
    this.update(id, { status: "dismissed", archived: true, read: true });
    eventBus.emit("notification:dismissed", { id });
  }

  clear(): void {
    this.setState({ notifications: [], unreadCount: 0 });
    eventBus.emit("notification:cleared", undefined as void);
  }

  // ─── Toasts ──────────────────────────────────────────────────────────────────

  showToast(toast: Omit<Toast, "id">): void {
    const id = generateId("t");
    const newToast: Toast = { id, ...toast };
    const toasts = [newToast, ...this.state.toasts].slice(0, this.maxToasts);
    this.setState({ toasts });
    eventBus.emit("toast:show", newToast);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => this.dismissToast(id), toast.duration);
    }
  }

  dismissToast(id: string): void {
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
    eventBus.emit("toast:dismiss", { id });
  }

  // ─── Loading / error ─────────────────────────────────────────────────────────

  setLoading(isLoading: boolean): void {
    this.setState({ isLoading });
  }

  setError(error: string | null): void {
    this.setState({ error });
  }
}

export const notificationStore = new NotificationStore();
