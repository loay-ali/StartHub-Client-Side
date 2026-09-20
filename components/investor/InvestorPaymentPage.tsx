// src/components/investor/InvestorPaymentPage.tsx
//
// Final step of the investor flow: Register -> Email Verification ->
// here. Single-plan membership page — no plan picker, just the one
// plan's benefits, live platform stats, and a placeholder for the real
// payment gateway (see PaymentGatewayPlaceholder for the Stripe/Paymob
// integration notes). No payment logic runs on this page.
import { Check, ShieldCheck } from "lucide-react";
import { investorPaymentStats } from "@/constants/investor-stats";
import { investorPlan } from "@/constants/investor-plan";
import PaymentGatewayPlaceholder from "./PaymentGatewayPlaceholder";
import styles from "./investor.module.css";

export default function InvestorPaymentPage() {
  return (
    <section className={styles.paymentPage}>
      <div className={styles.paymentBlob1} />
      <div className={styles.paymentBlob2} />

      <div className={styles.paymentInner}>
        <div className={styles.paymentHeader}>
          <span className={styles.paymentEyebrow}>
            <ShieldCheck size={11} />
            Investor Membership
          </span>
          <h1 className={styles.paymentH1}>One membership. Full access.</h1>
          <p className={styles.paymentSub}>
            You&apos;re verified — activate your membership to start reviewing
            AI-matched deal flow today.
          </p>
        </div>

        {/* Platform stats — swap investorPaymentStats for a live query
            result whenever the backend endpoint exists; nothing else on
            this page needs to change. */}
        <div className={styles.paymentStats}>
          {investorPaymentStats.map((stat) => (
            <div key={stat.key} className={styles.paymentStatCard}>
              <div className={styles.paymentStatValue}>
                {stat.value.toLocaleString()}
                {stat.suffix ?? ""}
              </div>
              <div className={styles.paymentStatLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.paymentGrid}>
          {/* Single membership plan — intentionally no plan-selection UI. */}
          <div className={styles.planCard}>
            <span className={styles.planBadge}>Membership</span>

            <h2 className={styles.planName}>{investorPlan.name}</h2>

            <div className={styles.planPriceRow}>
              <span className={styles.planPrice}>
                {investorPlan.currency}
                {investorPlan.price}
              </span>
              <span className={styles.planPriceUnit}>{investorPlan.billingPeriod}</span>
            </div>

            <p className={styles.planDesc}>{investorPlan.description}</p>

            <div className={styles.planFeatures}>
              {investorPlan.features.map((feature) => (
                <div key={feature.key} className={styles.planFeatureRow}>
                  <span className={styles.planFeatureIcon}>
                    <Check size={12} />
                  </span>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.planNote}>{investorPlan.note}</p>
          </div>

          <PaymentGatewayPlaceholder />
        </div>
      </div>
    </section>
  );
}