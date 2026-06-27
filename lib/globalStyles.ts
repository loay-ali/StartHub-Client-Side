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

  /* Aurora blob — slow breathing radial gradient */
  @keyframes aurora {
    0%, 100% { transform: translate(0px, 0px) scale(1);    opacity: 0.7; }
    33%       { transform: translate(28px, -18px) scale(1.06); opacity: 0.85; }
    66%       { transform: translate(-18px, 14px) scale(0.96); opacity: 0.6; }
  }
  /* Second aurora blob offset phase */
  @keyframes aurora-2 {
    0%, 100% { transform: translate(0px, 0px) scale(1);    opacity: 0.55; }
    40%       { transform: translate(-22px, 18px) scale(1.08); opacity: 0.72; }
    70%       { transform: translate(18px, -12px) scale(0.93); opacity: 0.5; }
  }

  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(20,184,166,0.3), 0 0 0 12px rgba(20,184,166,0.06); }
    50%     { box-shadow: 0 0 0 10px rgba(20,184,166,0),  0 0 0 24px rgba(20,184,166,0);   }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  /* Blur-reveal: opacity + blur + translateY — 2026 pattern */
  @keyframes blur-reveal-in {
    from { opacity: 0; filter: blur(10px); transform: translateY(22px); }
    to   { opacity: 1; filter: blur(0px);  transform: translateY(0);    }
  }
  /* Scale + fade reveal */
  @keyframes scale-reveal-in {
    from { opacity: 0; transform: scale(0.94) translateY(18px); }
    to   { opacity: 1; transform: scale(1) translateY(0);       }
  }
  @keyframes float-y {
    0%,100% { transform: translateY(0px);   }
    50%     { transform: translateY(-12px); }
  }
  /* Premium float with subtle 3D tilt */
  @keyframes float-3d {
    0%,100% { transform: translateY(0px) rotate3d(1,0,0,0deg);  }
    50%     { transform: translateY(-9px) rotate3d(1,0,0,0.8deg); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0);    }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -300% center; }
    100% { background-position:  300% center; }
  }
  /* Rotating gradient border */
  @keyframes gradient-border-spin {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  /* Glow breathe — box-shadow pulse */
  @keyframes glow-breathe {
    0%,100% { box-shadow: 0 0 0 0 rgba(20,184,166,.1), 0 8px 32px rgba(20,184,166,.16); }
    50%     { box-shadow: 0 0 0 8px rgba(20,184,166,.04), 0 16px 56px rgba(20,184,166,.28); }
  }
  @keyframes blink-dot {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.3; }
  }
  /* Ring expand — for orbit core pulse rings */
  @keyframes ring-expand {
    0%   { transform: scale(1);    opacity: 0.55; }
    100% { transform: scale(1.5);  opacity: 0; }
  }
  /* Gradient text sweep */
  @keyframes grad-sweep {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  /* Shimmer sweep across button surface */
  @keyframes btn-shimmer {
    0%   { background-position: -100% 0; }
    100% { background-position:  200% 0; }
  }

  /* ── Utility classes ── */
  .slide-up   { animation: slide-up .8s cubic-bezier(.16,1,.3,1) both; }
  .float-y    { animation: float-y 5.5s ease-in-out infinite; }
  .float-3d   { animation: float-3d 6s ease-in-out infinite; transform-style: preserve-3d; }

  /* Gradient text — animated sweep */
  .grad-text {
    background: linear-gradient(125deg, #14b8a6 0%, #0f766e 50%, #0d9488 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: grad-sweep 6s ease infinite;
  }
  /* Enhanced shimmer text for hero */
  .shimmer-text {
    background: linear-gradient(100deg, #0f766e 20%, #14b8a6 38%, #5eead4 50%, #2dd4bf 62%, #0f766e 80%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* Primary button — shimmer overlay + deeper shadow */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #14b8a6, #0f766e);
    color: #fff; font-weight: 700; border-radius: 14px;
    position: relative; overflow: hidden;
    transition: transform .22s cubic-bezier(.16,1,.3,1), box-shadow .22s ease;
    box-shadow: 0 6px 24px rgba(20,184,166,.26), 0 1px 0 rgba(255,255,255,.12) inset;
  }
  /* Shimmer sweep layer */
  .btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.2) 50%, transparent 70%);
    background-size: 200% 100%;
    background-position: -100% 0;
    transition: background-position .55s ease;
    pointer-events: none; border-radius: inherit;
  }
  /* Darker overlay on hover */
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #2dd4bf, #0d9488);
    opacity: 0; transition: opacity .22s;
    border-radius: inherit;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(20,184,166,.38), 0 1px 0 rgba(255,255,255,.12) inset; }
  .btn-primary:hover::after  { opacity: 1; }
  .btn-primary:hover::before { background-position: 200% 0; }
  .btn-primary:active { transform: translateY(0) scale(0.98); }
  .btn-primary > * { position: relative; z-index: 1; }

  /* Ghost button — enhanced with glass + gradient border hover */
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1.5px solid #a7f3d0; border-radius: 14px;
    color: #0a0f0e; background: rgba(255,255,255,.9);
    backdrop-filter: blur(8px);
    font-weight: 600;
    transition: all .22s ease;
  }
  .btn-ghost:hover {
    border-color: #14b8a6; color: #0f766e;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(20,184,166,.16);
    background: rgba(255,255,255,.98);
  }
  .btn-ghost:active { transform: translateY(0) scale(0.98); }

  /* Card hover — lift + glow + gradient border reveal */
  .card-lift {
    transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .32s ease, border-color .32s ease;
  }
  .card-lift:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(20,184,166,.15), 0 4px 16px rgba(10,15,14,.05) !important;
    border-color: rgba(20,184,166,.32) !important;
  }

  /* Section reveal — opacity + translateY */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* Blur reveal — 2026 premium pattern */
  .blur-reveal {
    opacity: 0; filter: blur(8px); transform: translateY(20px);
    transition: opacity .75s ease, filter .75s ease, transform .75s ease;
  }
  .blur-reveal.visible { opacity: 1; filter: blur(0); transform: translateY(0); }

  /* Scale reveal */
  .scale-reveal {
    opacity: 0; transform: scale(0.96) translateY(14px);
    transition: opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1);
  }
  .scale-reveal.visible { opacity: 1; transform: scale(1) translateY(0); }

  /* Stagger delay utilities */
  .stagger-1 { transition-delay:  80ms; }
  .stagger-2 { transition-delay: 160ms; }
  .stagger-3 { transition-delay: 240ms; }
  .stagger-4 { transition-delay: 320ms; }
  .stagger-5 { transition-delay: 400ms; }

  /* Glassmorphism card surface */
  .glass-card {
    background: rgba(255,255,255,.76);
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    border: 1px solid rgba(20,184,166,.16);
    box-shadow: 0 4px 24px rgba(20,184,166,.08), 0 1px 0 rgba(255,255,255,.9) inset;
  }

  /* Animated gradient border on hover */
  .gradient-border { position: relative; }
  .gradient-border::before {
    content: ''; position: absolute; inset: -1.5px; border-radius: inherit;
    background: linear-gradient(135deg, rgba(20,184,166,.5), rgba(94,234,212,.28), rgba(15,118,110,.42));
    background-size: 300% 300%;
    animation: gradient-border-spin 4s linear infinite;
    z-index: -1; opacity: 0; transition: opacity .3s ease;
  }
  .gradient-border:hover::before { opacity: 1; }

  /* Noise texture overlay — premium depth */
  .noise {
    position: relative;
  }
  .noise::after {
    content: ''; position: absolute; inset: 0; border-radius: inherit;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.45; mix-blend-mode: overlay;
  }

  /* Aurora background section — animated radial blobs */
  .aurora-bg { position: relative; isolation: isolate; }
  .aurora-bg::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 18% 18%, rgba(20,184,166,.08) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 82% 78%, rgba(94,234,212,.06) 0%, transparent 70%);
    animation: aurora 18s ease-in-out infinite; z-index: 0;
  }
  .aurora-bg > * { position: relative; z-index: 1; }

  /* Glow breathe — pulsing box-shadow */
  .glow-breathe { animation: glow-breathe 3.2s ease-in-out infinite; }

  /* Orbit rings */
  .orbit-cw   { position: absolute; inset: 0; animation: spin-cw  65s linear infinite; }
  .orbit-ccw  { position: absolute; inset: 0; animation: spin-ccw 95s linear infinite; }
  .orbit-cancel-cw  { display: inline-block; animation: spin-cw  95s linear infinite; }
  .orbit-cancel-ccw { display: inline-block; animation: spin-ccw 65s linear infinite; }

  /* Ticker */
  .ticker { display: flex; animation: ticker 32s linear infinite; white-space: nowrap; }
  .ticker:hover { animation-play-state: paused; }

  /* Live indicator dot */
  .live-dot { animation: blink-dot 1.8s ease-in-out infinite; }

  /* Section divider */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(20,184,166,.22) 30%, rgba(20,184,166,.22) 70%, transparent);
    border: none; margin: 0;
  }

  /* Hover elevation */
  .hover-elevate { transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s ease; }
  .hover-elevate:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(20,184,166,.14), 0 2px 12px rgba(10,15,14,.05);
  }

  /* Wave divider */
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
    .blur-reveal, .scale-reveal { opacity: 1; filter: none; transform: none; }
  }
`;

