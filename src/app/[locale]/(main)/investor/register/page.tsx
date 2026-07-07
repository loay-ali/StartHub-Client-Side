import InvestorAuthShell from "@/components/investor/InvestorAuthShell";
import InvestorRegisterForm from "@/components/investor/InvestorRegisterForm";

export default function InvestorRegisterPage() {
  return (
    <InvestorAuthShell>
      <InvestorRegisterForm />
    </InvestorAuthShell>
  );
}