"use client";

import { CalendarDays, CreditCard, Crown } from "lucide-react";

interface Subscription {
  id: number;
  planName: string;
  status: "Active" | "Expired";
  renewalDate: string;
  price: number;
  billingCycle: string;
}

interface SubscriptionCardProps {
  subscription?: Subscription;
  onRenew?: () => void;
}

export default function SubscriptionCard({
  subscription = {
    id: 1,
    planName: "Premium Investor",
    status: "Active",
    renewalDate: "30 Aug 2026",
    price: 49,
    billingCycle: "Monthly",
  },
  onRenew,
}: SubscriptionCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="bg-gradient-to-r from-teal-700 to-emerald-500 p-5 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Crown size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold">{subscription.planName}</h2>

              <p className="mt-1 text-xs text-teal-50">
                Your current subscription plan
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              subscription.status === "Active"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {subscription.status}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-teal-700" />

          <div>
            <p className="text-xs text-slate-500">Renewal Date</p>

            <h3 className="text-sm font-semibold text-slate-900">
              {subscription.renewalDate}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard size={18} className="text-teal-700" />

          <div>
            <p className="text-xs text-slate-500">Billing</p>

            <h3 className="text-sm font-semibold text-slate-900">
              ${subscription.price} / {subscription.billingCycle}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-start sm:justify-end">
          <button
            onClick={onRenew}
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            Renew Plan
          </button>
        </div>
      </div>
    </section>
  );
}
