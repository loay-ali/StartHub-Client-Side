import InvestorAuthShell from "@/components/investor/InvestorAuthShell";
import InvestorLoginForm from "@/components/investor/InvestorLoginForm";

export default function InvestorLoginPage() {
  return (
    <InvestorAuthShell>
      <InvestorLoginForm />
    </InvestorAuthShell>
  );
}