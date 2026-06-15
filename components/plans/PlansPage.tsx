"use client";

import { useState } from "react";

import PlanCard from "./PlanCard";
import { plans } from "./plans";

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const basicPlan = plans[0];
  const premiumPlan = plans[1];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-text-primary">Pricing Plans</h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          Choose the perfect plan for your startup and scale with confidence.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="flex rounded-2xl border border-border bg-surface p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-xl px-5 py-2 transition ${
                billingCycle === "monthly" ? "bg-primary text-white" : ""
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-xl px-5 py-2 transition ${
                billingCycle === "yearly" ? "bg-primary text-white" : ""
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            price={
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
            }
            billingCycle={billingCycle}
            tokens={plan.tokens}
            users={plan.users}
            storage={plan.storage}
            isRecommended={plan.isRecommended}
            selected={selectedPlan === plan.id}
            onSelect={() => setSelectedPlan(plan.id)}
          />
        ))}
      </div>

      <div className="mt-24">
        <h2 className="text-center text-3xl font-bold text-text-primary">
          Compare Plans
        </h2>

        <p className="mt-3 text-center text-text-secondary">
          Compare features and choose the best plan for your startup.
        </p>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="p-5 text-left font-semibold">Features</th>

                <th className="p-5 text-center font-semibold">Basic</th>

                <th className="p-5 text-center font-semibold text-primary">
                  Premium
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-border">
                <td className="p-5">Tokens</td>
                <td className="p-5 text-center">{basicPlan.tokens}</td>
                <td className="p-5 text-center">{premiumPlan.tokens}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="p-5">Users</td>
                <td className="p-5 text-center">{basicPlan.users}</td>
                <td className="p-5 text-center">{premiumPlan.users}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="p-5">Storage</td>
                <td className="p-5 text-center">{basicPlan.storage}</td>
                <td className="p-5 text-center">{premiumPlan.storage}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="p-5">Support</td>
                <td className="p-5 text-center">{basicPlan.support}</td>
                <td className="p-5 text-center">{premiumPlan.support}</td>
              </tr>

              <tr>
                <td className="p-5">AI Credits</td>
                <td className="p-5 text-center">{basicPlan.aiCredits}</td>
                <td className="p-5 text-center">{premiumPlan.aiCredits}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
