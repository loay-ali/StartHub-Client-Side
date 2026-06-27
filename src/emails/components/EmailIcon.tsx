interface EmailIconProps {
  type:
    | "verify"
    | "welcome"
    | "payment"
    | "order"
    | "status"
    | "renewal"
    | "summary"
    | "offer"
    | "company"
    | "warning";
}

export default function EmailIcon({ type }: EmailIconProps) {
  const icons = {
    verify: "✉",
    welcome: "🚀",
    payment: "✓",
    order: "📋",
    status: "↻",
    renewal: "🔔",
    summary: "📊",
    offer: "🎁",
    company: "👥",
    warning: "!",
  };

  return (
    <div
      style={{
        width: "64px",
        height: "64px",
        background: "#CCFBF1",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px auto 0",
        color: "#0F766E",
        fontSize: "28px",
        fontWeight: "700",
      }}
    >
      {icons[type]}
    </div>
  );
}
