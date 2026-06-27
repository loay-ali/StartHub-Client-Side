import { Button } from "@react-email/components";

import { EMAIL_THEME } from "../theme";

interface EmailButtonProps {
  text: string;
  href: string;
}

export default function EmailButton({ text, href }: EmailButtonProps) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: EMAIL_THEME.primary,
        color: "#ffffff",
        padding: "16px 32px",
        borderRadius: EMAIL_THEME.radius.md,
        textDecoration: "none",
        fontWeight: "700",
        fontSize: "16px",
        display: "inline-block",
      }}
    >
      {text}
    </Button>
  );
}
