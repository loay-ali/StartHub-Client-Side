import { notificationService } from "../core/NotificationService";
import { eventBus } from "../core/eventBus";
import { buildAction } from "../factory/NotificationFactory";

// ─── API Client Config ────────────────────────────────────────────────────────

export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  /** Map HTTP methods → success notification copy */
  successMessages?: Partial<Record<string, string>>;
  /** Set false to suppress success toasts globally */
  notifyOnSuccess?: boolean;
  /** Set false to suppress error toasts globally */
  notifyOnError?: boolean;
}

export interface ApiRequestOptions extends RequestInit {
  /** Override per-request: suppress success notification */
  silent?: boolean;
  /** Override per-request: custom success title */
  successTitle?: string;
  /** Override per-request: custom success message */
  successMessage?: string;
  /** Override per-request: custom error title */
  errorTitle?: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

// ─── Default copy ─────────────────────────────────────────────────────────────

const DEFAULT_SUCCESS: Record<string, string> = {
  POST: "Created successfully",
  PUT: "Updated successfully",
  PATCH: "Updated successfully",
  DELETE: "Deleted successfully",
};

// ─── API Client ───────────────────────────────────────────────────────────────

export class ApiClient {
  private config: Required<ApiClientConfig>;

  constructor(config: ApiClientConfig) {
    this.config = {
      baseUrl: config.baseUrl.replace(/\/$/, ""),
      headers: config.headers ?? {},
      successMessages: { ...DEFAULT_SUCCESS, ...config.successMessages },
      notifyOnSuccess: config.notifyOnSuccess ?? true,
      notifyOnError: config.notifyOnError ?? true,
    };
  }

  async request<T = unknown>(
    path: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { silent, successTitle, successMessage, errorTitle, ...fetchOptions } = options;
    const method = (fetchOptions.method ?? "GET").toUpperCase();
    const url = `${this.config.baseUrl}${path}`;

    eventBus.emit("api:request", { url, method });

    const res = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers,
        ...(fetchOptions.headers as Record<string, string> | undefined),
      },
    });

    if (res.ok) {
      const data: T = res.status === 204 ? (undefined as unknown as T) : await res.json();
      eventBus.emit("api:success", { url, method, status: res.status });

      if (!silent && this.config.notifyOnSuccess && method !== "GET") {
        const title = successTitle ?? "Success";
        const message =
          successMessage ?? this.config.successMessages[method] ?? "Operation completed.";
        notificationService.success(title, message);
      }

      return { data, status: res.status, headers: res.headers };
    }

    // ── Error path ──────────────────────────────────────────────────────────────
    let errorMessage = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      errorMessage = body?.message ?? body?.error ?? errorMessage;
    } catch {
      // body not JSON
    }

    eventBus.emit("api:error", { url, method, status: res.status, message: errorMessage });

    if (!silent && this.config.notifyOnError) {
      const title = errorTitle ?? this.resolveErrorTitle(res.status);
      notificationService.error(title, errorMessage, {
        actions: [
          buildAction("retry", {
            handler: () =>
              this.request<T>(path, options).then(() => { }),
          }),
          buildAction("dismiss"),
        ],
        metadata: { url, method, status: res.status },
      });
    }

    const error = new Error(errorMessage) as Error & { status: number };
    error.status = res.status;
    throw error;
  }

  // ─── Convenience methods ──────────────────────────────────────────────────────

  get<T = unknown>(path: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T = unknown>(path: string, body: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "POST", body: JSON.stringify(body) });
  }

  put<T = unknown>(path: string, body: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "PUT", body: JSON.stringify(body) });
  }

  patch<T = unknown>(path: string, body: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "PATCH", body: JSON.stringify(body) });
  }

  delete<T = unknown>(path: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  private resolveErrorTitle(status: number): string {
    if (status === 401) return "Authentication Required";
    if (status === 403) return "Access Denied";
    if (status === 404) return "Not Found";
    if (status === 409) return "Conflict";
    if (status === 422) return "Validation Error";
    if (status >= 500) return "Server Error";
    return "Request Failed";
  }
}

// ─── Singleton (configure once at app boot) ───────────────────────────────────

export let apiClient: ApiClient;

export function initApiClient(config: ApiClientConfig): ApiClient {
  apiClient = new ApiClient(config);
  return apiClient;
}
