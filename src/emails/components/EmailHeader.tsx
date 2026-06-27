import { Heading, Img, Section } from "@react-email/components";

import { EMAIL_BRAND } from "../constants";
import { EMAIL_THEME } from "../theme";

interface Props {
  title: string;
  icon?: React.ReactNode;
}

export default function EmailHeader({ title, icon }: Props) {
  return (
    <Section
      style={{
        backgroundColor: EMAIL_THEME.primary,
        padding: "20px 30px",
        textAlign: "center",
      }}
    >
      <Img
        src="/starthub.png"
        alt={EMAIL_BRAND.name}
        width="220"
        style={{
          margin: "0 auto",
          display: "block",
        }}
      />

      {icon && (
        <div
          style={{
            fontSize: "55px",
          }}
        >
          {icon}
        </div>
      )}

      <Heading
        style={{
          color: "#ffffff",
          fontSize: "24px",
          fontWeight: "700",
          margin: "12px 0 0",
          lineHeight: "32px",
        }}
      >
        {title}
      </Heading>
    </Section>
  );
}
