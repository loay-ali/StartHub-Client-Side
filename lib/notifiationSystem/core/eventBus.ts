import type { EventKey, EventHandler, EventMap } from "../types";

// ─── Global Event Bus (singleton) ─────────────────────────────────────────────

type Listener<K extends EventKey> = {
  id: string;
  handler: EventHandler<K>;
};

class EventBus {
  private listeners: Map<EventKey, Listener<EventKey>[]> = new Map();
  private idCounter = 0;

  emit<K extends EventKey>(event: K, payload: EventMap[K]): void {
    const handlers = this.listeners.get(event) ?? [];
    for (const { handler } of handlers) {
      try {
        (handler as EventHandler<K>)(payload);
      } catch (err) {
        console.error(`[EventBus] Error in handler for "${event}":`, err);
      }
    }
  }

  subscribe<K extends EventKey>(event: K, handler: EventHandler<K>): () => void {
    const id = String(++this.idCounter);
    const existing = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...existing, { id, handler: handler as EventHandler<EventKey> }]);

    return () => this.unsubscribe(event, id);
  }

  unsubscribe(event: EventKey, id: string): void {
    const existing = this.listeners.get(event) ?? [];
    this.listeners.set(
      event,
      existing.filter((l) => l.id !== id)
    );
  }

  clear(event?: EventKey): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// One instance shared across the entire app
export const eventBus = new EventBus();
