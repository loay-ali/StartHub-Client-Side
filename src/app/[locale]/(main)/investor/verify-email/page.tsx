import InvestorAuthShell from "@/components/investor/InvestorAuthShell";
import InvestorVerifyEmailForm from "@/components/investor/InvestorVerifyEmailForm";

export default function InvestorVerifyEmailPage() {
  return (
    <InvestorAuthShell>
      <InvestorVerifyEmailForm />
    </InvestorAuthShell>
  );
}