import SubscriptionCard from "../../../../../../components/dashboard/investor/subscription/SubscriptionCard";
import PlanFeatures from "../../../../../../components/dashboard/investor/subscription/PlanFeatures";
import BillingInfo from "../../../../../../components/dashboard/investor/subscription/BillingInfo";
import PaymentMethod from "../../../../../../components/dashboard/investor/subscription/PaymentMethod";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6 p-6">
      <SubscriptionCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <PlanFeatures />

        <BillingInfo />
      </div>

      <PaymentMethod />
    </div>
  );
}
