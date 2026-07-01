"use client";

import { useCallback, useEffect, useReducer } from "react";
import type {
  Notification,
  NotificationInput,
  NotificationStoreState,
  Toast,
  UseNotificationsReturn,
} from "@/lib/notifiationSystem/types";
import { notificationStore } from "@/lib/notifiationSystem/store/NotificationStore";
import { notificationService } from "@/lib/notifiationSystem/core/NotificationService";

// ─── useNotifications ─────────────────────────────────────────────────────────

export function useNotifications(): UseNotificationsReturn {
  // Force re-render when store changes
  const [, rerender] = useReducer((c: number) => c + 1, 0);

  useEffect(() => {
    const unsub = notificationStore.subscribe(rerender);
    return unsub;
  }, []);

  const state: NotificationStoreState = notificationStore.getState();

  const add = useCallback(
    (input: NotificationInput): Notification => notificationStore.add(input),
    []
  );

  const update = useCallback(
    (id: string, patch: Partial<Notification>): void => notificationStore.update(id, patch),
    []
  );

  const remove = useCallback(
    (id: string): void => notificationStore.remove(id),
    []
  );

  const markRead = useCallback(
    (id: string): void => notificationStore.markRead(id),
    []
  );

  const markAllRead = useCallback(
    (): void => notificationStore.markAllRead(),
    []
  );

  const archive = useCallback(
    (id: string): void => notificationStore.archive(id),
    []
  );

  const dismiss = useCallback(
    (id: string): void => notificationStore.dismiss(id),
    []
  );

  const clear = useCallback(
    (): void => notificationStore.clear(),
    []
  );

  const showToast = useCallback(
    (toast: Omit<Toast, "id">): void => notificationStore.showToast(toast),
    []
  );

  const dismissToast = useCallback(
    (id: string): void => notificationStore.dismissToast(id),
    []
  );

  return {
    ...state,
    add,
    update,
    remove,
    markRead,
    markAllRead,
    archive,
    dismiss,
    clear,
    showToast,
    dismissToast,
    service: notificationService,
  };
}
