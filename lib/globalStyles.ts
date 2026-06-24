// src/lib/globalStyles.ts
// Inject via <style>{globalStyles}</style> in App.tsx root

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,500;0,600;0,700;0,800;0,900;1,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #ffffff;
    color: #0a0f0e;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  a  { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }

  /* ── Keyframes ── */
  @keyframes spin-cw   { to { transform: rotate(360deg);   } }
  @keyframes spin-ccw  { to { transform: rotate(-360deg);  } }
  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(20,184,166,0.3), 0 0 0 12px rgba(20,184,166,0.06); }
    50%     { box-shadow: 0 0 0 10px rgba(20,184,166,0),  0 0 0 24px rgba(20,184,166,0);   }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes float-y {
    0%,100% { transform: translateY(0px);    }
    50%     { transform: translateY(-12px);  }
  }
  @keyframes ticker {
    0%   { transform: translateX(0);    }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes blink-dot {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.3; }
  }

  /* ── Utility classes ── */
  .slide-up   { animation: slide-up .8s cubic-bezier(.16,1,.3,1) both; }
  .float-y    { animation: float-y 5.5s ease-in-out infinite; }

  /* Gradient text — teal only */
  .grad-text {
    background: linear-gradient(125deg, #14b8a6 0%, #0f766e 55%, #0d9488 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  /* Shimmer text for hero */
  .shimmer-text {
    background: linear-gradient(100deg, #0f766e 30%, #14b8a6 50%, #5eead4 55%, #0f766e 70%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  /* Primary button */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #14b8a6, #0f766e);
    color: #fff; font-weight: 700; border-radius: 14px;
    position: relative; overflow: hidden;
    transition: transform .22s ease, box-shadow .22s ease;
    box-shadow: 0 4px 20px rgba(20,184,166,.28);
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #2dd4bf, #0d9488);
    opacity: 0; transition: opacity .22s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(20,184,166,.38); }
  .btn-primary:hover::after { opacity: 1; }
  .btn-primary > * { position: relative; z-index: 1; }

  /* Ghost button */
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1.5px solid #a7f3d0; border-radius: 14px;
    color: #0a0f0e; background: #fff; font-weight: 600;
    transition: all .22s ease;
  }
  .btn-ghost:hover { border-color: #14b8a6; color: #0f766e; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(20,184,166,.12); }

  /* Card hover */
  .card-lift {
    transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s ease, border-color .28s ease;
  }
  .card-lift:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(20,184,166,.13) !important;
    border-color: rgba(20,184,166,.35) !important;
  }

  /* Section reveal */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* Orbit rings */
  .orbit-cw   { position: absolute; inset: 0; animation: spin-cw  65s linear infinite; }
  .orbit-ccw  { position: absolute; inset: 0; animation: spin-ccw 95s linear infinite; }
  .orbit-cancel-cw  { display: inline-block; animation: spin-cw  95s linear infinite; }
  .orbit-cancel-ccw { display: inline-block; animation: spin-ccw 65s linear infinite; }

  /* Ticker */
  .ticker { display: flex; animation: ticker 32s linear infinite; white-space: nowrap; }
  .ticker:hover { animation-play-state: paused; }

  /* Bento grid noise overlay */
  .noise::after {
    content: ''; position: absolute; inset: 0; border-radius: inherit;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.4;
  }

  /* Live indicator dot */
  .live-dot { animation: blink-dot 1.8s ease-in-out infinite; }

  /* Section divider wave */
  .wave-divider { overflow: hidden; line-height: 0; }
  .wave-divider svg { display: block; width: 100%; }

  @media (max-width: 960px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-grid > *:last-child { order: 2; margin-top: 40px; }
  }
  @media (max-width: 640px) {
    .bento-grid { grid-template-columns: 1fr !important; }
    .stats-row  { gap: 24px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: .001ms !important; transition-duration: .001ms !important; }
  }
`;
