"use client";
// src/components/dashboard/WorkspacePausedDashboard.tsx
//
// Subscription-expired CONTENT for the dashboard. This renders inside
// the existing (dashboard) layout's <main> slot — the header and
// sidebar already come from that layout (the Overview/Features/Company
// nav). The previous version rendered its own top nav + its own
// "Enterprise Plan" sidebar, which is why the screenshot showed two
// stacked sidebars and two headers: this component and the real layout
// were each drawing a full shell.
//
// Locked-feature state (Analytics/Recruitments/Finance/Operations
// greyed out with a lock icon) belongs on the real sidebar, driven by
// FeatureAccessService.resolveStatus() per company — not hardcoded
// here as a second nav. If that's not wired into the sidebar yet, that's
// a sidebar task, not something to re-solve inside this component.

import Link from "next/link";
import { Info, Rocket, X, TrendingUp, FileText, Coins } from "lucide-react";

// Assumption: plans/billing selection lives at this route, as a sibling
// of (dashboard)/billing/page.tsx. Update this one constant if the real
// route differs (e.g. "/dashboard/plans" or "/subscriptions/plans").
const PLANS_HREF = "/plans";

const whyRenew = [
  {
    title: "Continuous AI Monitoring",
    body: "24/7 background agents tracking anomalies.",
    icon: <TrendingUp size={18} className="text-amber-600" />,
    iconBg: "bg-amber-50",
  },
  {
    title: "Weekly Executive Reports",
    body: "AI-driven boardroom insights delivered Friday.",
    icon: <FileText size={18} className="text-teal-700" />,
    iconBg: "bg-teal-50",
  },
];

const DAYS_LEFT = 6;
const GRACE_TOTAL_DAYS = 30;
const RETENTION_PERCENT = Math.round(((GRACE_TOTAL_DAYS - DAYS_LEFT) / GRACE_TOTAL_DAYS) * 100);

const TOKENS_USED = 2450;
const TOKENS_INCLUDED = 10000;
const TOKEN_PERCENT = Math.round((TOKENS_USED / TOKENS_INCLUDED) * 100);

function RingProgress({
  percent,
  size = 88,
  stroke = 8,
  trackColor = "#e5e7eb",
  fillColor = "#0f766e",
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  trackColor?: string;
  fillColor?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={fillColor}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export default function PausedState() {
  return (
    <div className="flex flex-col gap-6">
      {/* Expired-subscription banner. Page-level alert — lives at the
          top of THIS page's content, not the global layout, since it's
          specific to the paused-workspace state. */}
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-amber-500 px-6 py-2.5 text-white">
        <div className="flex items-center gap-2.5">
          <Info size={16} className="flex-shrink-0" />
          <p className="text-sm font-medium">
            Subscription expired. Renew now to continue receiving AI recommendations and operational alerts.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href={PLANS_HREF}
            className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold hover:bg-gray-800"
          >
            Renew
          </Link>
          <button aria-label="Dismiss" className="text-white/80 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Hero card */}
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
          <Rocket size={26} className="text-teal-600" />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Keep your company intelligence running
        </h1>

        <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-500">
          Your AI agents have been paused, but your workspace is safe. Resume now to restore full operational
          capacity.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={PLANS_HREF}
            className="rounded-xl bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800"
          >
            Renew Subscription
          </Link>
          <button className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50">
            View Logs
          </button>
        </div>
      </div>

      {/* Status cards */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Data retention */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <RingProgress percent={RETENTION_PERCENT}>
              <span className="text-xl font-extrabold text-gray-900">{DAYS_LEFT}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">days left</span>
            </RingProgress>
            <div>
              <p className="font-bold text-gray-900">Data Retention</p>
              <p className="mt-1 text-sm text-gray-500">
                Your organization&apos;s model weights and log history will be archived in {DAYS_LEFT} days.
              </p>
            </div>
          </div>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${RETENTION_PERCENT}%` }} />
          </div>
        </div>

        {/* Token consumption */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <RingProgress percent={TOKEN_PERCENT} fillColor="#0d9488">
              <Coins size={16} className="text-teal-700" />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">used</span>
            </RingProgress>
            <div>
              <p className="font-bold text-gray-900">Token Consumption</p>
              <p className="mt-1 text-sm text-gray-500">
                {TOKENS_USED.toLocaleString()} of {TOKENS_INCLUDED.toLocaleString()} monthly tokens used. Usage
                is paused until you renew.
              </p>
            </div>
          </div>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${TOKEN_PERCENT}%` }} />
          </div>
        </div>

        {/* Why renew */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="font-bold text-gray-900">Why renew?</p>
          <div className="mt-4 flex flex-col gap-4">
            {whyRenew.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}