import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import OrderIcon from "../components/icons/OrderIcon";
interface ServiceOrderPlacedEmailProps {
  name: string;
  orderNumber: string;
  serviceName: string;
  orderUrl: string;
}

export default function ServiceOrderPlacedEmail({
  name,
  orderNumber,
  serviceName,
  orderUrl,
}: ServiceOrderPlacedEmailProps) {
  return (
    <EmailLayout
      preview="Your service order has been received"
      title="Service Order Received"
   
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
        Thank you for your order. We have successfully received your service
        request and our team will start reviewing it shortly.
      </Text>

      {/* Order Card */}
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
            marginBottom: "10px",
          }}
        >
          Order Number: {orderNumber}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: 0,
          }}
        >
          Service: {serviceName}
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
        You will receive updates as your order progresses through our review
        process.
      </Text>
    </EmailLayout>
  );
}
