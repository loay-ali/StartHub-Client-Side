// ─── StarHub Design Tokens ────────────────────────────────────────────────
// Pure white bg, teal-only palette, no blue
// MUI + Tailwind compatible — use these everywhere

export const C = {
  // Backgrounds
  bg:        "#ffffff",   // page root — pure white
  surface:   "#f8fffe",   // very faint teal tint
  surfaceAlt:"#f0fdf9",   // section alternates
  card:      "#ffffff",
  glass:     "rgba(255,255,255,0.72)", // glassmorphism

  // Borders
  border:    "#e2faf5",
  borderMd:  "#a7f3d0",
  borderStr: "#5eead4",

  // Text
  text:      "#0a0f0e",   // near-black with warm tint
  textSub:   "#1a2e2b",
  muted:     "#4b6b65",
  textMuted: "#7fa89e",

  // Brand — teal only
  primary:   "#14b8a6",
  primaryDk: "#0f766e",
  primaryDkk:"#0a5c55",
  primaryLt: "#5eead4",
  primaryXL: "#ccfbf1",
  primaryXXL:"#f0fdf9",
  teal2:     "#0d9488",
  teal3:     "#0f8c7e",

  // Accents
  green:     "#22c55e",
  greenDk:   "#16a34a",
  amber:     "#f59e0b",
  red:       "#f43f5e",   // rose-500 — softer than red-500
};

export const FONTS = {
  display: "'Inter Tight', system-ui, sans-serif",
  body:    "'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, monospace",
};

export const SHADOW = {
  card:   "0 1px 3px rgba(10,15,14,.04), 0 4px 16px rgba(10,15,14,.04)",
  hover:  "0 12px 40px rgba(20,184,166,.12), 0 2px 8px rgba(10,15,14,.04)",
  glow:   "0 0 0 12px rgba(20,184,166,.07), 0 24px 48px rgba(20,184,166,.2)",
  section:"0 32px 80px rgba(20,184,166,.08)",
};
