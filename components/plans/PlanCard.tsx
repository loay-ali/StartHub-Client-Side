import { FiUsers, FiDatabase, FiZap, FiCheck } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
type PlanCardProps = {
  name: string;
  monthlyPrice: number;
  yearlyPrice:number;
  billingCycle: "monthly" | "yearly";
  tokens: string;
  users: number;
  storage: string;
  isRecommended?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};

export default function PlanCard({
  name,
  monthlyPrice,
  yearlyPrice,
  billingCycle,
  tokens,
  users,
  storage,
  isRecommended,
  selected,
  onSelect,
}: PlanCardProps) {
  
  return (
    <div
      className={`relative rounded-3xl border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        selected
          ? "border-2 border-green-500 shadow-2xl ring-4 ring-green-100"
          : isRecommended
            ? "scale-105 border-2 border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-2xl"
            : "border-border"
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-4 right-14 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg">
          <FiStar size={14} />

          <span>Most Popular</span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary">{name}</h3>

        <div className="mt-6">
          <span className="text-5xl font-bold">${billingCycle == 'monthly' ? monthlyPrice:yearlyPrice}</span>

          <span className="text-text-secondary">
            /{billingCycle === "monthly" ? "month" : "year"}
          </span>

          {billingCycle === "yearly" && (
            <p className="mt-2 text-sm font-medium text-green-600">Save <strong>{Math.round((((monthlyPrice * 12) - yearlyPrice)) / (monthlyPrice * 12) * 100)}%</strong></p>
          )}
        </div>
      </div>

      <div className="my-8 border-t border-border" />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FiZap className="text-primary" />
          <span>{tokens} Tokens</span>
        </div>

        <div className="flex items-center gap-3">
          <FiUsers className="text-primary" />
          <span>{users} Users</span>
        </div>

        <div className="flex items-center gap-3">
          <FiDatabase className="text-primary" />
          <span>{storage} Storage</span>
        </div>

        <div className="flex items-center gap-3">
          <FiCheck className="text-green-500" />
          <span>Priority Support</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={`mt-8 w-full rounded-xl py-3 font-medium transition ${
          selected
            ? "bg-green-500 text-white"
            : isRecommended
              ? "bg-primary text-white hover:opacity-90"
              : "border border-border hover:bg-slate-50"
        }`}
      >
        {selected ? "✓ Selected" : "Select Plan"}
      </button>
    </div>
  );
}
