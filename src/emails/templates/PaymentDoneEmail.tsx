import { Section, Text } from "@react-email/components";
import EmailIcon from "../components/EmailIcon";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import PaymentIcon from "../components/icons/PaymentIcon";

interface PaymentDoneEmailProps {
  name: string;
  amount: string;
  invoiceNumber: string;
  invoiceUrl: string;
}

export default function PaymentDoneEmail({
  name,
  amount,
  invoiceNumber,
  invoiceUrl,
}: PaymentDoneEmailProps) {
  return (
    <EmailLayout
      preview="Your payment was successful"
      title="Payment Successful"
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
        Your payment has been successfully processed. Thank you for choosing
        StartHub.
      </Text>

      {/* Payment Card */}
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
          Payment Details
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "10px",
          }}
        >
          Invoice Number: {invoiceNumber}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.success,
            fontSize: "30px",
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
        <EmailButton text="View Invoice" href={invoiceUrl} />
      </div>

      {/* Footer */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        Need assistance? Our support team is always here to help.
      </Text>
    </EmailLayout>
  );
}
