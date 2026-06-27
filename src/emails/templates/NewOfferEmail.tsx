import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import OfferIcon from "../components/icons/OfferIcon";
interface NewOfferEmailProps {
  name: string;
  offerTitle: string;
  discount: string;
  description: string;
  offerUrl: string;
}

export default function NewOfferEmail({
  name,
  offerTitle,
  discount,
  description,
  offerUrl,
}: NewOfferEmailProps) {
  return (
    <EmailLayout
      preview="A new offer is available for you"
      title="Special Offer"
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

      {/* Intro */}
      <Text
        style={{
          color: EMAIL_THEME.textSecondary,
          fontSize: "16px",
          lineHeight: "28px",
          marginBottom: "32px",
        }}
      >
        Great news! We've prepared an exclusive offer for you to help grow your
        business with StartHub.
      </Text>

      {/* Offer Card */}
      <Section
        style={{
          backgroundColor: EMAIL_THEME.surfaceSecondary,
          border: `1px solid ${EMAIL_THEME.border}`,
          borderRadius: EMAIL_THEME.radius.md,
          padding: "28px",
          marginBottom: "35px",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            color: EMAIL_THEME.textPrimary,
            fontSize: "18px",
            fontWeight: "700",
            marginTop: 0,
          }}
        >
          {offerTitle}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.primary,
            fontSize: "42px",
            fontWeight: "700",
            margin: "20px 0",
          }}
        >
          {discount}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            fontSize: "15px",
            lineHeight: "26px",
            marginBottom: 0,
          }}
        >
          {description}
        </Text>
      </Section>

      {/* Button */}
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <EmailButton text="View Offer" href={offerUrl} />
      </div>

      {/* Footer */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        This offer is available for a limited time.
      </Text>
    </EmailLayout>
  );
}
