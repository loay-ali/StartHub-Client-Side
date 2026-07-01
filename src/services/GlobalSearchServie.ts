// services/GlobalSearchService.ts

export type SearchCategory =
  | "dashboard"
  | "analytics"
  | "recruitment"
  | "finance"
  | "operations"
  | "reports"
  | "tasks"
  | "employees"
  | "companies"
  | "notifications"
  | "settings";

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category: SearchCategory;
  icon?: string;
  url: string;
  score?: number;
}

class GlobalSearchService {
  private readonly SEARCH_API = "/api/search";
  private readonly SUGGESTIONS_API = "/api/search/suggestions";

  async search(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    try {
      const response = await fetch(
        `${this.SEARCH_API}?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Global search error:", error);
      return [];
    }
  }

  async suggestions(page: string): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `/api/search/suggestions?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Suggestions failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Suggestions error:", error);
      return [];
    }
  }
  recent(): SearchResult[] {
    return this.getRecent();
  }

  clearRecent() {
    localStorage.removeItem("starhub_recent_searches");
  }

  private getRecent(): SearchResult[] {
    try {
      return JSON.parse(
        localStorage.getItem("starhub_recent_searches") ?? "[]"
      );
    } catch {
      return [];
    }
  }

  saveRecent(item: SearchResult) {
    const recent = this.getRecent();

    const filtered = recent.filter(
      (r) => r.id !== item.id
    );

    filtered.unshift(item);

    localStorage.setItem(
      "starhub_recent_searches",
      JSON.stringify(filtered.slice(0, 10))
    );
  }


  async askAI(prompt: string) {
    const response = await fetch("/api/ai/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("AI search failed");
    }

    return response.json();
  }

}

const globalSearchService = new GlobalSearchService();

export default globalSearchService;