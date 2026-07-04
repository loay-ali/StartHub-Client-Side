import type { Notification, NotificationTransport } from "../types";
import { eventBus } from "../core/eventBus";

// ─── REST Transport Config ────────────────────────────────────────────────────

export interface RestTransportConfig {
  baseUrl: string;
  pollInterval?: number; // ms; default 30 000
  headers?: Record<string, string>;
  onAuthError?: () => void;
}

// ─── REST Transport ───────────────────────────────────────────────────────────

export class RestTransport implements NotificationTransport {
  readonly name = "rest";

  private config: Required<Omit<RestTransportConfig, "onAuthError">> &
    Pick<RestTransportConfig, "onAuthError">;
  private receiveHandlers: Array<(n: Notification) => void> = [];
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private connected = false;
  private lastFetchedAt = 0;

  constructor(config: RestTransportConfig) {
    this.config = {
      baseUrl: config.baseUrl.replace(/\/$/, ""),
      pollInterval: config.pollInterval ?? 30_000,
      headers: config.headers ?? {},
      onAuthError: config.onAuthError,
    };
  }

  async connect(): Promise<void> {
    this.connected = true;
    await this.poll(); // immediate first fetch
    this.pollTimer = setInterval(() => this.poll(), this.config.pollInterval);
    eventBus.emit("transport:connected", { transport: this.name });
  }

  async disconnect(): Promise<void> {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.connected = false;
    eventBus.emit("transport:disconnected", { transport: this.name });
  }

  async send(notification: Notification): Promise<void> {
    if (!this.connected) throw new Error("[RestTransport] Not connected");

    const res = await fetch(`${this.config.baseUrl}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...this.config.headers },
      body: JSON.stringify(notification),
    });

    if (!res.ok) {
      if (res.status === 401) this.config.onAuthError?.();
      throw new Error(`[RestTransport] send failed: ${res.status}`);
    }
  }

  onReceive(handler: (notification: Notification) => void): () => void {
    this.receiveHandlers.push(handler);
    return () => {
      this.receiveHandlers = this.receiveHandlers.filter((h) => h !== handler);
    };
  }

  private async poll(): Promise<void> {
    try {
      const url = this.lastFetchedAt
        ? `${this.config.baseUrl}/notifications?since=${this.lastFetchedAt}`
        : `${this.config.baseUrl}/notifications`;

      const res = await fetch(url, { headers: this.config.headers });

      if (!res.ok) {
        if (res.status === 401) this.config.onAuthError?.();
        eventBus.emit("transport:error", {
          transport: this.name,
          error: new Error(`Poll failed: ${res.status}`),
        });
        return;
      }

      const data: Notification[] = await res.json();
      this.lastFetchedAt = Date.now();

      for (const notification of data) {
        this.receiveHandlers.forEach((h) => h(notification));
      }
    } catch (err) {
      eventBus.emit("transport:error", {
        transport: this.name,
        error: err instanceof Error ? err : new Error(String(err)),
      });
    }
  }
}
