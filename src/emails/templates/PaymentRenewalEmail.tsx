import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import RenewalIcon from "../components/icons/RenewalIcon";
interface PaymentRenewalEmailProps {
  name: string;
  planName: string;
  renewalDate: string;
  amount: string;
  renewalUrl: string;
}

export default function PaymentRenewalEmail({
  name,
  planName,
  renewalDate,
  amount,
  renewalUrl,
}: PaymentRenewalEmailProps) {
  return (
    <EmailLayout
      preview="Your subscription renewal is required"
      title="Subscription Renewal"
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
        Your subscription plan is approaching its renewal date. Please renew
        your subscription to continue enjoying all StartHub features.
      </Text>

      {/* Subscription Card */}
      <Section
        style={{
          backgroundColor: EMAIL_THEME.surfaceSecondary,
          border: `1px solid ${EMAIL_THEME.border}`,
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
          Subscription Details
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "12px",
          }}
        >
          Plan: {planName}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "12px",
          }}
        >
          Renewal Date: {renewalDate}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.warning,
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: 0,
          }}
        >
          {amount}
        </Text>
      </Section>

      {/* Button */}
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <EmailButton text="Renew Subscription" href={renewalUrl} />
      </div>

      {/* Footer */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        Renewing your subscription ensures uninterrupted access to all StartHub
        services.
      </Text>
    </EmailLayout>
  );
}
