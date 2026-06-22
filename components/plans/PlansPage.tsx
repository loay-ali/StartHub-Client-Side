import Link from 'next/link';

import PlanCard from './PlanCard';

import { getPlans } from '@/src/services/plans';
import { IoHourglassOutline } from "react-icons/io5";
import type Plan from '@/types/requests/plans';

export default async function PlansPage({duration}:{duration:'monthly'|'yearly'}) {

  const plans = await getPlans();

  if( plans.length == 0 ) {
    return (<section className = 'mt-50 flex flex-col gap-10 justify-center items-center'><IoHourglassOutline size = {150} /><strong className = 'text-2xl'>We're crafting something exciting for you! ✨</strong>

<p className = 'max-w-[600px]'>Our plans are currently in the works, designed to help you achieve more and get the most out of your experience.
  <br /><br />Check back soon — great things are coming, and you'll want to be among the first to explore them.
</p></section>);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-text-primary">Pricing Plans</h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          Choose the perfect plan for your startup and scale with confidence.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="flex rounded-2xl border border-border bg-surface p-1">
            <Link
              type="button"
              href="?duration=monthly"
              className={`rounded-xl px-5 py-2 transition ${duration == 'monthly' ? 'bg-black text-white':''}`}
            >
              Monthly
            </Link>

            <Link
              type="button"
              href="?duration=yearly"
              className={`rounded-xl px-5 py-2 transition ${duration == 'yearly' ? 'bg-black text-white':''}`}
            >
              Yearly
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        {plans.map((plan:Plan) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            monthlyPrice={plan.monthlyPrice}
            yearlyPrice={plan.yearlyPrice}
            billingCycle={duration}
            tokens={plan.tokens}
            users={plan.users}
            storage={plan.storage}
            isRecommended={plan.isRecommended}
          />
        ))}
      </div>

      {/*<div className="mt-24">
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
      </div>*/}
    </div>
  );
}
