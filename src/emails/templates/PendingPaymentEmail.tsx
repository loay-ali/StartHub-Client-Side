import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import WarningIcon from "../components/icons/WarningIcon";
interface PendingPaymentEmailProps {
  name: string;
  planName: string;
  amount: string;
  dueDate: string;
  paymentUrl: string;
}

export default function PendingPaymentEmail({
  name,
  planName,
  amount,
  dueDate,
  paymentUrl,
}: PendingPaymentEmailProps) {
  return (
    <EmailLayout
      preview="Action required: pending payment"
      title="Pending Payment"
    >
      {/* Greeting */}
      <Text
        style={{
          color: EMAIL_THEME.textPrimary,
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Hello {name},
      </Text>

      {/* Description */}
      <Text
        style={{
          color: EMAIL_THEME.textSecondary,
          fontSize: "16px",
          lineHeight: "28px",
          marginBottom: "32px",
        }}
      >
        We noticed that your subscription payment is still pending. To avoid
        interruption of your StartHub services, please complete your payment
        before the due date.
      </Text>

      {/* Warning Card */}
      <Section
        style={{
          backgroundColor: EMAIL_THEME.surfaceSecondary,
          border: `2px solid ${EMAIL_THEME.warning}`,
          borderRadius: EMAIL_THEME.radius.md,
          padding: "28px",
          marginBottom: "35px",
        }}
      >
        <Text
          style={{
            color: EMAIL_THEME.textPrimary,
            fontWeight: "600",
            marginTop: 0,
          }}
        >
          Payment Information
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "12px",
          }}
        >
          Subscription: {planName}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "12px",
          }}
        >
          Due Date: {dueDate}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.warning,
            fontSize: "30px",
            fontWeight: "700",
            marginBottom: 0,
          }}
        >
          {amount}
        </Text>
      </Section>

      {/* Warning Message */}
      <Text
        style={{
          color: EMAIL_THEME.warning,
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "24px",
          marginBottom: "30px",
        }}
      >
        Please note: Your dashboard access may be temporarily suspended until
        payment is completed.
      </Text>

      {/* Button */}
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <EmailButton text="Complete Payment" href={paymentUrl} />
      </div>

      {/* Footer */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        If you have already completed your payment, please disregard this email.
      </Text>
    </EmailLayout>
  );
}
