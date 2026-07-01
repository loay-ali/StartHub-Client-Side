"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import type {
  Notification,
  NotificationProviderProps,
  NotificationTransport,
  UseNotificationsReturn,
} from "@/lib/notifiationSystem/types";
import { notificationStore } from "@/lib/notifiationSystem/store/NotificationStore";
import { useNotifications } from "@/src/hooks/useNotifications";
import { eventBus } from "@/lib/notifiationSystem/core/eventBus";
import { RestTransport } from "@/lib/notifiationSystem/transports/RestTransport";
import { WebSocketTransport } from "@/lib/notifiationSystem/transports/WebSocketTransport";
import { MockTransport } from "@/lib/notifiationSystem/transports/MockTransport";

const NotificationContext = createContext<UseNotificationsReturn | null>(null);

function buildTransport(
  config: NotificationProviderProps["transportConfig"]
): NotificationTransport | undefined {
  if (!config) return undefined;

  if (config.type === "rest" && config.baseUrl) {
    return new RestTransport({ baseUrl: config.baseUrl });
  }
  if (config.type === "websocket" && config.url) {
    return new WebSocketTransport({ url: config.url });
  }
  if (config.type === "mock") {
    return new MockTransport();
  }
  return undefined;
}

export function NotificationProvider({
  children,
  transportConfig,
  maxToasts = 5,
  defaultToastDuration = 5000,
  persistKey,
}: NotificationProviderProps) {
  const transportRef = useRef<NotificationTransport | undefined>(undefined);
  if (!transportRef.current) {
    transportRef.current = buildTransport(transportConfig);
  }

  const value = useNotifications();

  useEffect(() => {
    notificationStore.configure({ maxToasts });
  }, [maxToasts]);

  useEffect(() => {
    if (!persistKey) return;
    try {
      const raw = localStorage.getItem(persistKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved)) {
          saved.forEach((n) => notificationStore.add(n));
        }
      }
    } catch {
      // ignore
    }
  }, [persistKey]);

  useEffect(() => {
    if (!persistKey) return;
    try {
      const toSave = value.notifications
        .filter((n: Notification) => !n.archived)
        .slice(0, 100);
      localStorage.setItem(persistKey, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [value.notifications, persistKey]);

  useEffect(() => {
    const t = transportRef.current;
    if (!t) return;

    let unsub: (() => void) | undefined;

    t.connect().then(() => {
      unsub = t.onReceive((notification) => {
        notificationStore.add(notification);
      });
    });

    return () => {
      unsub?.();
      t.disconnect();
    };
  }, []);

  useEffect(() => {
    return eventBus.subscribe("transport:error", ({ transport: name, error }) => {
      notificationStore.add({
        type: "error",
        priority: "high",
        title: "Transport Error",
        message: `[${name}] ${error.message}`,
      });
    });
  }, []);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext(): UseNotificationsReturn {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotificationContext must be used within <NotificationProvider>");
  }
  return ctx;
}