import { render } from "@react-email/render";

import VerifyEmail from "../../../emails/templates/VerifyEmail";
import WelcomeEmail from "../../../emails/templates/WelcomeEmail";
import PaymentDoneEmail from "../../../emails/templates/PaymentDoneEmail";
import ServiceOrderPlacedEmail from "../../../emails/templates/ServiceOrderPlacedEmail";
import OrderStatusChangedEmail from "../../../emails/templates/OrderStatusChangedEmail";
import PaymentRenewalEmail from "../../../emails/templates/PaymentRenewalEmail";
import MonthlySummaryEmail from "../../../emails/templates/MonthlySummaryEmail";
import NewOfferEmail from "../../../emails/templates/NewOfferEmail";
import AddedToCompanyEmail from "../../../emails/templates/AddedToCompanyEmail";
import PendingPaymentEmail from "../../../emails/templates/PendingPaymentEmail";

export default async function EmailPreviewPage() {
  // 👇 غيري هنا فقط
  const template = "verify";
  const templates = {
    verify: (
      <VerifyEmail
        name="Ahmed"
        verificationLink="https://starthub.com/verify"
      />
    ),

    welcome: (
      <WelcomeEmail
        name="Ahmed"
        dashboardUrl="https://starthub.com/dashboard"
      />
    ),

    payment: (
      <PaymentDoneEmail
        name="Ahmed"
        amount="$49.99"
        invoiceNumber="#INV-001"
        invoiceUrl="https://starthub.com/invoice"
      />
    ),

    order: (
      <ServiceOrderPlacedEmail
        name="Ahmed"
        orderNumber="#ORD-001"
        serviceName="Business Analysis"
        orderUrl="https://starthub.com/orders"
      />
    ),

    status: (
      <OrderStatusChangedEmail
        name="Ahmed"
        orderNumber="#ORD-001"
        status="In Progress"
        orderUrl="https://starthub.com/orders"
      />
    ),

    renewal: (
      <PaymentRenewalEmail
        name="Ahmed"
        planName="Professional Plan"
        renewalDate="July 30, 2026"
        amount="$49.99"
        renewalUrl="https://starthub.com/payment"
      />
    ),

    summary: (
      <MonthlySummaryEmail
        name="Ahmed"
        companyName="Tech Solutions"
        growth="+15%"
        insights={28}
        employees={43}
        orders={128}
        dashboardUrl="https://starthub.com/dashboard"
      />
    ),

    offer: (
      <NewOfferEmail
        name="Ahmed"
        offerTitle="Premium Plan"
        discount="30% OFF"
        description="Upgrade and unlock all AI features."
        offerUrl="https://starthub.com/plans"
      />
    ),

    company: (
      <AddedToCompanyEmail
        name="Ahmed"
        companyName="Tech Solutions"
        role="Project Manager"
        dashboardUrl="https://starthub.com/dashboard"
      />
    ),

    "pending-payment": (
      <PendingPaymentEmail
        name="Ahmed"
        planName="Professional Plan"
        amount="$49.99"
        dueDate="July 30, 2026"
        paymentUrl="https://starthub.com/payment"
      />
    ),
  };

  const html = await render(templates[template as keyof typeof templates], {
    pretty: true,
  });

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <iframe
        srcDoc={html}
        style={{
          width: "100%",
          maxWidth: "700px",
          height: "1000px",
          border: "none",
          margin: "0 auto",
          display: "block",
          background: "#fff",
        }}
      />
    </div>
  );
}
