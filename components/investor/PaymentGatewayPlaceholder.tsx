// src/components/investor/PaymentGatewayPlaceholder.tsx
//
// Visual placeholder for the real payment gateway integration.
// Intentionally renders no functional card/billing fields and performs
// no network calls — this component's only job right now is to hold
// the spot in the layout and communicate what's coming.
//
// ─── INTEGRATION NOTE ────────────────────────────────────────────────
// Replace the skeleton block below with the real Stripe Elements
// (or Paymob iframe/checkout) mount point once credentials and the
// backend session/intent endpoint are ready, e.g.:
//
//   Stripe:
//     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
//     <Elements stripe={stripe} options={{ clientSecret }}>
//       <PaymentElement />
//     </Elements>
//
//   Paymob:
//     Fetch a payment_key from your backend (POST /payments/paymob/intent)
//     and mount Paymob's iframe with that key:
//     <iframe src={`https://accept.paymob.com/api/acceptance/iframes/{IFRAME_ID}?payment_token=${paymentKey}`} />
//
// The submit button below is disabled and purely illustrative until
// that wiring exists.
import { Lock, ShieldCheck } from "lucide-react";
import styles from "./investor.module.css";

export default function PaymentGatewayPlaceholder() {
  return (
    <div className={styles.gatewayCard}>
      <div className={styles.gatewayHeader}>
        <div className={styles.gatewayIconWrap}>
          <Lock size={18} />
        </div>
        <div>
          <div className={styles.gatewayTitle}>Payment Gateway</div>
          <div className={styles.gatewaySub}>Coming soon — Stripe integration</div>
        </div>
      </div>

      <div className={styles.gatewayBody}>
        <div className={styles.gatewayLogos}>
          <span className={styles.gatewayLogoChip}>Stripe</span>
        </div>

        <div className={styles.gatewayFieldsSkeleton} aria-hidden="true">
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
        </div>
      </div>

      <p className={styles.gatewayNote}>
        <ShieldCheck size={14} style={{ flexShrink: 0, marginTop: 2 }} />
        Payments will be processed securely once the gateway is connected. No
        card details are collected on this screen yet.
      </p>

      <button type="button" className={`btn-primary ${styles.gatewayCta}`} disabled>
        <Lock size={15} />
        Complete Membership Payment
      </button>
    </div>
  );
}