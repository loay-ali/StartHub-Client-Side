import type { Notification, NotificationTransport } from "../types";
import { eventBus } from "../core/eventBus";

// ─── Mock Transport ───────────────────────────────────────────────────────────
// Simulates a live push channel in development / tests.

export class MockTransport implements NotificationTransport {
  readonly name = "mock";

  private receiveHandlers: Array<(n: Notification) => void> = [];
  private connected = false;
  private simulationTimer: ReturnType<typeof setInterval> | null = null;

  // Seed notifications for demo purposes
  private seedPool: Array<Partial<Notification>> = [
    {
      type: "ai",
      title: "Revenue Anomaly Detected",
      message: "MRR dropped 12% vs. last week — possible churn spike.",
    },
    {
      type: "recommendation",
      title: "Upsell Opportunity",
      message: "3 accounts are likely candidates for plan upgrades this month.",
    },
    {
      type: "risk",
      title: "High Churn Risk",
      message: "Acme Corp has been inactive for 14 days.",
    },
    {
      type: "integration",
      title: "Stripe Webhook Delayed",
      message: "Stripe events are 8 minutes behind expected delivery.",
    },
    {
      type: "system",
      title: "Scheduled Maintenance",
      message: "Platform maintenance window: tonight 02:00–03:00 UTC.",
    },
  ];

  async connect(): Promise<void> {
    this.connected = true;
    eventBus.emit("transport:connected", { transport: this.name });

    // Optionally simulate incoming notifications every 20 s
    if (process.env.NODE_ENV === "development") {
      let i = 0;
      this.simulationTimer = setInterval(() => {
        const seed = this.seedPool[i % this.seedPool.length];
        const notification: Notification = {
          id: `mock_${Date.now()}`,
          type: seed.type ?? "info",
          priority: "medium",
          status: "unread",
          title: seed.title ?? "Notification",
          message: seed.message ?? "",
          timestamp: Date.now(),
          read: false,
          archived: false,
        };
        this.receiveHandlers.forEach((h) => h(notification));
        i++;
      }, 20_000);
    }
  }

  async disconnect(): Promise<void> {
    if (this.simulationTimer) clearInterval(this.simulationTimer);
    this.connected = false;
    eventBus.emit("transport:disconnected", { transport: this.name });
  }

  async send(notification: Notification): Promise<void> {
    if (!this.connected) throw new Error("[MockTransport] Not connected");
    // Echo back to simulate a round-trip
    setTimeout(() => {
      this.receiveHandlers.forEach((h) => h(notification));
    }, 50);
  }

  onReceive(handler: (notification: Notification) => void): () => void {
    this.receiveHandlers.push(handler);
    return () => {
      this.receiveHandlers = this.receiveHandlers.filter((h) => h !== handler);
    };
  }

  /** Manually push a notification (useful in tests) */
  push(notification: Notification): void {
    this.receiveHandlers.forEach((h) => h(notification));
  }
}
