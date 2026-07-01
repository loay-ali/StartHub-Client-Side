// ─── Types ────────────────────────────────────────────────────────────────────
export * from "./types";

// ─── Core ─────────────────────────────────────────────────────────────────────
export { eventBus } from "./core/eventBus";
export { notificationService } from "./core/NotificationService";

// ─── Store ────────────────────────────────────────────────────────────────────
export { notificationStore } from "./store/NotificationStore";

// ─── Factory ──────────────────────────────────────────────────────────────────
export { NotificationFactory, buildAction, generateId } from "./factory/NotificationFactory";

// ─── Transport ────────────────────────────────────────────────────────────────
export { MockTransport } from "./transports/MockTransport";
export { RestTransport } from "./transports/RestTransport";
export type { RestTransportConfig } from "./transports/RestTransport";
export { WebSocketTransport } from "./transports/WebSocketTransport";
export type { WebSocketTransportConfig } from "./transports/WebSocketTransport";

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useNotifications } from "../../src/hooks/useNotifications";
export { useEventBus } from "../../src/hooks/useEventBus";

// ─── Components ───────────────────────────────────────────────────────────────
export { NotificationProvider, useNotificationContext } from "@/components/notificationSystem/NotificationProvider";
export { NotificationBell } from "@/components/notificationSystem/NotificationBell";
export { NotificationCenter } from "@/components/notificationSystem/NotificationCenter";
export { ToastContainer } from "@/components/notificationSystem/ToastContainer";

// ─── API ──────────────────────────────────────────────────────────────────────
export { ApiClient, initApiClient } from "./api/ApiClient";
export type { ApiClientConfig, ApiRequestOptions, ApiResponse } from "./api/ApiClient";

// ─── Utils ────────────────────────────────────────────────────────────────────
export { formatRelativeTime } from "./utils/time";