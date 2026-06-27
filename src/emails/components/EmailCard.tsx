import { Section } from "@react-email/components";
import { EMAIL_THEME } from "../theme";

interface Props {
  children: React.ReactNode;
}

export default function EmailCard({ children }: Props) {
  return (
    <Section
      style={{
        backgroundColor: EMAIL_THEME.surfaceSecondary,
        border: `1px solid ${EMAIL_THEME.border}`,
        borderRadius: EMAIL_THEME.radius.md,
        padding: "24px",
        margin: "20px 0",
      }}
    >
      {children}
    </Section>
  );
}
