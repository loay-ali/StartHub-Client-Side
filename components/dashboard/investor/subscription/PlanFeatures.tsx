"use client";

import { CheckCircle2 } from "lucide-react";

interface PlanFeaturesProps {
  features?: string[];
}

export default function PlanFeatures({
  features = [
    "Unlimited Opportunity Posts",
    "Unlimited Favorite Companies",
    "Access to Startup Profiles",
    "Exclusive Investment Events",
    "Priority Support",
    "Dashboard Analytics",
  ],
}: PlanFeaturesProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Plan Features</h2>

        <p className="mt-1 text-sm text-slate-500">
          Everything included in your subscription.
        </p>
      </div>

      {/* Features */}

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <CheckCircle2
              size={18}
              className="text-emerald-600 flex-shrink-0"
            />

            <span className="text-sm font-medium text-slate-700">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
