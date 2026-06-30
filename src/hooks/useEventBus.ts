"use client";

import { useEffect } from "react";
import type { EventKey, EventHandler } from "@/lib/notifiationSystem/types";
import { eventBus } from "@/lib/notifiationSystem/core/eventBus";

// ─── useEventBus ──────────────────────────────────────────────────────────────
// Subscribe to global event bus inside React components safely.

export function useEventBus<K extends EventKey>(
  event: K,
  handler: EventHandler<K>
): void {
  useEffect(() => {
    return eventBus.subscribe(event, handler);
  }, [event, handler]);
}
