// utils/fuzzySearch.ts

import Fuse from "fuse.js";
import { SearchResult } from "@/src/services/GlobalSearchServie";

const options: Fuse.IFuseOptions<SearchResult> = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.7 },
    { name: "subtitle", weight: 0.2 },
    { name: "category", weight: 0.1 },
  ],
};

export function fuzzySearch(
  items: SearchResult[],
  query: string
) {
  if (!query.trim()) return items;

  const fuse = new Fuse(items, options);

  return fuse.search(query).map((r) => ({
    ...r.item,
    score: r.score,
  }));
}