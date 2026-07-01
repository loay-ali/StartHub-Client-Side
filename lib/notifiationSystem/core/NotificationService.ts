import type {
  Notification,
  NotificationInput,
  NotificationServiceAPI,
  AIMetadata,
} from "../types";
import { notificationStore } from "../store/NotificationStore";
import { buildAction } from "../factory/NotificationFactory";

// ─── Notification Service ─────────────────────────────────────────────────────

class NotificationService implements NotificationServiceAPI {
  private add(input: NotificationInput): Notification {
    return notificationStore.add(input);
  }

  success(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "success", priority: "low", title, message, ...options });
  }

  error(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({
      type: "error",
      priority: "high",
      title,
      message,
      actions: options?.actions ?? [buildAction("retry"), buildAction("dismiss")],
      ...options,
    });
  }

  warning(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "warning", priority: "medium", title, message, ...options });
  }

  info(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "info", priority: "low", title, message, ...options });
  }

  system(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "system", priority: "high", title, message, ...options });
  }

  ai(
    title: string,
    message: string,
    aiMeta: AIMetadata,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({
      type: "ai",
      priority: "medium",
      title,
      message,
      ai: aiMeta,
      actions: options?.actions ?? [
        buildAction("accept_recommendation"),
        buildAction("chat"),
        buildAction("dismiss"),
      ],
      ...options,
    });
  }

  critical(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({
      type: "critical",
      priority: "urgent",
      title,
      message,
      actions: options?.actions ?? [
        buildAction("open"),
        buildAction("assign"),
        buildAction("dismiss"),
      ],
      ...options,
    });
  }

  // ─── Extra helpers ───────────────────────────────────────────────────────────

  integration(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "integration", priority: "medium", title, message, ...options });
  }

  automation(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "automation", priority: "medium", title, message, ...options });
  }

  insight(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "insight", priority: "medium", title, message, ...options });
  }

  recommendation(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({
      type: "recommendation",
      priority: "medium",
      title,
      message,
      actions: options?.actions ?? [
        buildAction("accept_recommendation"),
        buildAction("create_task"),
        buildAction("dismiss"),
      ],
      ...options,
    });
  }

  risk(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({
      type: "risk",
      priority: "high",
      title,
      message,
      actions: options?.actions ?? [buildAction("open"), buildAction("assign")],
      ...options,
    });
  }

  activity(
    title: string,
    message: string,
    options?: Partial<NotificationInput>
  ): Notification {
    return this.add({ type: "activity", priority: "low", title, message, ...options });
  }
}

export const notificationService = new NotificationService();
