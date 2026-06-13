import { FiCheck, FiCreditCard, FiCalendar } from "react-icons/fi";

export default function PaymentStep() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Choose Your Subscription</h2>

        <p className="mt-3 text-text-secondary">
          Select a plan and billing cycle to activate your workspace.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FiCalendar />
          Billing Cycle
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <button className="rounded-2xl border-2 border-primary bg-primary/5 p-5 text-left">
            <h4 className="font-semibold">Monthly</h4>

            <p className="mt-2 text-sm text-text-secondary">
              Flexible monthly billing.
            </p>
          </button>

          <button className="rounded-2xl border border-border p-5 text-left transition hover:border-primary">
            <h4 className="font-semibold">Yearly</h4>

            <p className="mt-2 text-sm text-text-secondary">
              Save up to 20% annually.
            </p>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Select Plan</h3>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border p-8">
            <h4 className="text-xl font-semibold">Starter</h4>

            <p className="mt-4 text-5xl font-bold">$19</p>

            <p className="mt-2 text-text-secondary">per month</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />1 Workspace
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Basic Analytics
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Email Support
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border-2 border-primary p-8 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
              Most Popular
            </div>

            <h4 className="text-xl font-semibold">Professional</h4>

            <p className="mt-4 text-5xl font-bold">$49</p>

            <p className="mt-2 text-text-secondary">per month</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Unlimited Workspaces
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Advanced Analytics
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Priority Support
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                AI Insights
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border p-8">
            <h4 className="text-xl font-semibold">Enterprise</h4>

            <p className="mt-4 text-5xl font-bold">Custom</p>

            <p className="mt-2 text-text-secondary">Contact sales</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Dedicated Support
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Custom Integrations
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                SLA Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border p-6">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
          <FiCreditCard />
          Payment Method
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            placeholder="Card Holder Name"
            className="rounded-xl border border-border px-4 py-3"
          />

          <input
            placeholder="Card Number"
            className="rounded-xl border border-border px-4 py-3"
          />

          <input
            placeholder="MM / YY"
            className="rounded-xl border border-border px-4 py-3"
          />

          <input
            placeholder="CVV"
            className="rounded-xl border border-border px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
}
