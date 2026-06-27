import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import VerifyIcon from "../components/icons/VerifyIcon";
interface VerifyEmailProps {
  name: string;
  verificationLink: string;
}

export default function VerifyEmail({
  name,
  verificationLink,
}: VerifyEmailProps) {
  return (
    <EmailLayout
      preview="Verify your email address"
      title="Verify Your Email"
    >
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

      <Text
        style={{
          color: EMAIL_THEME.textSecondary,
          fontSize: "16px",
          lineHeight: "28px",
          marginBottom: "30px",
        }}
      >
        Welcome to StartHub! We're excited to have you on board. To activate
        your account and access our AI-powered startup intelligence platform,
        please verify your email address.
      </Text>

      <Section
        style={{
          backgroundColor: EMAIL_THEME.surfaceSecondary,
          border: `1px solid ${EMAIL_THEME.border}`,
          borderRadius: EMAIL_THEME.radius.md,
          padding: "24px",
          marginBottom: "30px",
        }}
      >
        <Text
          style={{
            margin: 0,
            color: EMAIL_THEME.textPrimary,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Account Verification Required
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            fontSize: "14px",
            lineHeight: "24px",
            marginBottom: 0,
          }}
        >
          Please confirm your email address to secure your account and access
          all StartHub features.
        </Text>
      </Section>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <EmailButton text="Verify Email" href={verificationLink} />
      </div>

      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        If you didn't create this account, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
