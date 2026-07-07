"use client";

import { CalendarDays, CreditCard, DollarSign, Receipt } from "lucide-react";

interface BillingInfoProps {
  billing?: {
    plan: string;
    cycle: string;
    nextPayment: string;
    amount: number;
  };
}

export default function BillingInfo({
  billing = {
    plan: "Premium Investor",
    cycle: "Monthly",
    nextPayment: "30 Aug 2026",
    amount: 49,
  },
}: BillingInfoProps) {
  const cards = [
    {
      title: "Current Plan",
      value: billing.plan,
      icon: CreditCard,
    },
    {
      title: "Billing Cycle",
      value: billing.cycle,
      icon: Receipt,
    },
    {
      title: "Next Payment",
      value: billing.nextPayment,
      icon: CalendarDays,
    },
    {
      title: "Amount",
      value: `$${billing.amount}`,
      icon: DollarSign,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Billing Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your current billing details.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                <Icon size={18} className="text-teal-700" />
              </div>

              <p className="text-xs text-slate-500">{card.title}</p>

              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                {card.value}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
