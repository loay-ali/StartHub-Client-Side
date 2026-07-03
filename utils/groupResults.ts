import { SearchResult } from "@/src/services/GlobalSearchServie";

export interface SearchGroup {
  title: string;
  items: SearchResult[];
}

export function groupResults(
  results: SearchResult[]
): SearchGroup[] {
  const grouped = new Map<string, SearchResult[]>();

  results.forEach((item) => {
    const list = grouped.get(item.category) ?? [];
    list.push(item);
    grouped.set(item.category, list);
  });

  return [...grouped.entries()].map(([title, items]) => ({
    title,
    items,
  }));
}