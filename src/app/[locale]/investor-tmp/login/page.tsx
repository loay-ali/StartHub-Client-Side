import InvestorLoginForm from "@/components/auth/InvestorLoginForm";
import AuthSlider from "@/components/auth/AuthSlider";

export default function InvestorLoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthSlider />
      <InvestorLoginForm />
    </main>
  );
}
