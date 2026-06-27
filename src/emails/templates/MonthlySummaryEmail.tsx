import { Section, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailLayout from "../layouts/EmailLayout";
import { EMAIL_THEME } from "../theme";
import SummaryIcon from "../components/icons/SummaryIcon";
interface MonthlySummaryEmailProps {
  name: string;
  companyName: string;
  growth: string;
  insights: number;
  employees: number;
  orders: number;
  dashboardUrl: string;
}

export default function MonthlySummaryEmail({
  name,
  companyName,
  growth,
  insights,
  employees,
  orders,
  dashboardUrl,
}: MonthlySummaryEmailProps) {
  return (
    <EmailLayout
      preview="Your monthly business summary is ready"
      title="Monthly Business Summary"
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
        Your monthly business report for <strong>{companyName}</strong> is now
        available. Here are your key insights for this month.
      </Text>

      {/* Stats Card */}
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
            marginBottom: "20px",
          }}
        >
          Monthly Overview
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.success,
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          Revenue Growth: {growth}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "12px",
          }}
        >
          AI Insights Generated: {insights}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: "12px",
          }}
        >
          Team Members: {employees}
        </Text>

        <Text
          style={{
            color: EMAIL_THEME.textSecondary,
            marginBottom: 0,
          }}
        >
          Orders Processed: {orders}
        </Text>
      </Section>

      {/* CTA */}
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <EmailButton text="Open Dashboard" href={dashboardUrl} />
      </div>

      {/* Footer */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "14px",
          lineHeight: "24px",
        }}
      >
        Keep tracking your business performance with StartHub AI insights.
      </Text>
    </EmailLayout>
  );
}
