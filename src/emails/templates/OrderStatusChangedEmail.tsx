import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import StatusIcon from "../components/icons/StatusIcon";
type OrderStatus = "In Progress" | "Completed" | "Declined";

interface OrderStatusChangedEmailProps {
  name: string;
  orderNumber: string;
  status: OrderStatus;
  orderUrl: string;
}

export default function OrderStatusChangedEmail({
  name,
  orderNumber,
  status,
  orderUrl,
}: OrderStatusChangedEmailProps) {
  const statusColor =
    status === "Completed"
      ? EMAIL_THEME.success
      : status === "Declined"
        ? EMAIL_THEME.danger
        : EMAIL_THEME.warning;

  return (
    <EmailLayout
      preview="Your order status has changed"
      title="Order Status Updated"
     
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
        Your order status has been updated. Please review the latest information
        below.
      </Text>

      {/* Status Card */}
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
          Order Details
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "20px",
          }}
        >
          Order Number: {orderNumber}
        </Text>

        <Text
          style={{
            color: statusColor,
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: 0,
          }}
        >
          {status}
        </Text>
      </Section>

      {/* Button */}
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <EmailButton text="View Order" href={orderUrl} />
      </div>

      {/* Footer */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        Thank you for choosing StartHub.
      </Text>
    </EmailLayout>
  );
}
