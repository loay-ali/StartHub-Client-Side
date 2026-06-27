import { Hr, Link, Section, Text } from "@react-email/components";

import { EMAIL_BRAND } from "../constants";
import { EMAIL_THEME } from "../theme";

export default function EmailFooter() {
  return (
    <Section
      style={{
        backgroundColor: EMAIL_THEME.surfaceSecondary,
        padding: "32px",
        textAlign: "center",
      }}
    >
      <Hr
        style={{
          borderColor: EMAIL_THEME.border,
          marginBottom: "24px",
        }}
      />

      {/* Social Links */}
      <div>
        <Link
          href={EMAIL_BRAND.social.linkedin}
          style={{
            color: EMAIL_THEME.primary,
            textDecoration: "none",
            marginRight: "16px",
            fontWeight: "500",
          }}
        >
          LinkedIn
        </Link>

        <Link
          href={EMAIL_BRAND.social.twitter}
          style={{
            color: EMAIL_THEME.primary,
            textDecoration: "none",
            marginRight: "16px",
            fontWeight: "500",
          }}
        >
          Twitter
        </Link>

        <Link
          href={EMAIL_BRAND.social.website}
          style={{
            color: EMAIL_THEME.primary,
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Website
        </Link>
      </div>

      {/* Support */}
      <Text
        style={{
          color: EMAIL_THEME.textSecondary,
          fontSize: "14px",
          marginTop: "24px",
          marginBottom: "8px",
        }}
      >
        Need help?
      </Text>

      <Link
        href={`mailto:${EMAIL_BRAND.support}`}
        style={{
          color: EMAIL_THEME.primary,
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        {EMAIL_BRAND.support}
      </Link>

      {/* Copyright */}
      <Text
        style={{
          color: EMAIL_THEME.textMuted,
          fontSize: "12px",
          marginTop: "24px",
        }}
      >
        © 2026 {EMAIL_BRAND.name}. All rights reserved.
      </Text>
    </Section>
  );
}
