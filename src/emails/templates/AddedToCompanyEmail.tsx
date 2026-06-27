import { Heading, Section } from "@react-email/components";
import { Building2 } from "lucide-react";

import { EMAIL_THEME } from "../theme";
import CompanyIcon from "../components/icons/CompanyIcon";
interface Props {
  title: string;
}

export default function EmailHeader({ title }: Props) {
  return (
    <Section
      style={{
        backgroundColor: EMAIL_THEME.primary,
        padding: "20px 30px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <Building2 size={48} color="#ffffff" strokeWidth={2} />
      </div>

      <Heading
        style={{
          color: "#ffffff",
          fontSize: "24px",
          fontWeight: "700",
          margin: 0,
          lineHeight: "32px",
        }}
      >
        {title}
      </Heading>
    </Section>
  );
}
