import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";

interface WelcomeEmailProps {
  name: string;
  dashboardUrl: string;
}

export default function WelcomeEmail({
  name,
  dashboardUrl,
}: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to StartHub" title="Welcome To StartHub">
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
        Welcome to StartHub! Your account has been successfully created and
        you're now ready to explore our AI-powered startup intelligence
        platform.
      </Text>

      {/* Features */}
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
            fontSize: "16px",
            fontWeight: "600",
            marginTop: 0,
            marginBottom: "18px",
          }}
        >
          You now have access to:
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            fontSize: "15px",
            lineHeight: "30px",
            margin: 0,
          }}
        >
          • AI Business Analytics
          <br />
          • Startup Performance Reports
          <br />
          • Smart Recruitment Tools
          <br />
          • Business Model Evaluation
          <br />• Monthly AI Insights
        </Text>
      </Section>

      {/* Button */}
      <div
        style={{
          marginTop: "30px",
          marginBottom: "35px",
        }}
      >
        <EmailButton text="Open Dashboard" href={dashboardUrl} />
      </div>

      {/* Footer Text */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        We're excited to support your startup journey. Welcome aboard!
      </Text>
    </EmailLayout>
  );
}
