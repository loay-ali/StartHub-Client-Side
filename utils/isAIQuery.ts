// utils/isAIQuery.ts

const patterns = [
  /^why/i,
  /^show/i,
  /^compare/i,
  /^generate/i,
  /^forecast/i,
  /^summarize/i,
  /^find/i,
  /\?$/,
];

export function isAIQuery(query: string) {
  return patterns.some((pattern) => pattern.test(query.trim()));
}