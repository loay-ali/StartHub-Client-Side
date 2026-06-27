import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from "@react-email/components";

import EmailFooter from "../components/EmailFooter";
import EmailHeader from "../components/EmailHeader";
import { EMAIL_THEME } from "../theme";

interface EmailLayoutProps {
  preview: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function EmailLayout({
  preview,
  title,
  icon,
  children,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />

      <Preview>{preview}</Preview>

      <Body
        style={{
          backgroundColor: EMAIL_THEME.background,
          margin: 0,
          padding: "40px 20px",
          fontFamily: EMAIL_THEME.fontFamily,
        }}
      >
        <Container
          style={{
            backgroundColor: EMAIL_THEME.surface,
            maxWidth: "600px",
            margin: "0 auto",
            borderRadius: EMAIL_THEME.radius.lg,
            overflow: "hidden",
            boxShadow: EMAIL_THEME.shadow,
          }}
        >
          <EmailHeader title={title} icon={icon} />

          <Section
            style={{
              padding: "40px",
            }}
          >
            {children}
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
