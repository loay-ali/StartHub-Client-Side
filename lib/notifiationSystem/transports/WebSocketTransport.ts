import type { Notification, NotificationTransport } from "../types";
import { eventBus } from "../core/eventBus";

// ─── WebSocket Transport Config ───────────────────────────────────────────────

export interface WebSocketTransportConfig {
  url: string;
  protocols?: string[];
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  headers?: Record<string, string>; // passed as query params (WS limitation)
}

// ─── WebSocket Transport ──────────────────────────────────────────────────────

export class WebSocketTransport implements NotificationTransport {
  readonly name = "websocket";

  private config: Required<WebSocketTransportConfig>;
  private ws: WebSocket | null = null;
  private receiveHandlers: Array<(n: Notification) => void> = [];
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private intentionalDisconnect = false;

  constructor(config: WebSocketTransportConfig) {
    this.config = {
      url: config.url,
      protocols: config.protocols ?? [],
      reconnectDelay: config.reconnectDelay ?? 3_000,
      maxReconnectAttempts: config.maxReconnectAttempts ?? 10,
      heartbeatInterval: config.heartbeatInterval ?? 25_000,
      headers: config.headers ?? {},
    };
  }

  async connect(): Promise<void> {
    this.intentionalDisconnect = false;
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.buildUrl(), this.config.protocols);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        eventBus.emit("transport:connected", { transport: this.name });
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const notification: Notification = JSON.parse(event.data);
          this.receiveHandlers.forEach((h) => h(notification));
        } catch {
          // ignore malformed frames
        }
      };

      this.ws.onerror = (event) => {
        const error = new Error("[WebSocketTransport] Connection error");
        eventBus.emit("transport:error", { transport: this.name, error });
        reject(error);
      };

      this.ws.onclose = () => {
        this.stopHeartbeat();
        eventBus.emit("transport:disconnected", { transport: this.name });
        if (!this.intentionalDisconnect) this.scheduleReconnect();
      };
    });
  }

  async disconnect(): Promise<void> {
    this.intentionalDisconnect = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.stopHeartbeat();
    this.ws?.close();
  }

  async send(notification: Notification): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("[WebSocketTransport] Not connected");
    }
    this.ws.send(JSON.stringify(notification));
  }

  onReceive(handler: (notification: Notification) => void): () => void {
    this.receiveHandlers.push(handler);
    return () => {
      this.receiveHandlers = this.receiveHandlers.filter((h) => h !== handler);
    };
  }

  private buildUrl(): string {
    const extra = Object.entries(this.config.headers)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    return extra ? `${this.config.url}?${extra}` : this.config.url;
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) return;
    this.reconnectAttempts++;
    const delay = this.config.reconnectDelay * this.reconnectAttempts;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, this.config.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
  }
}
