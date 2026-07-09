import InvestorRegisterForm from "@/components/auth/InvestorRegisterForm";
import AuthSlider from "@/components/auth/AuthSlider";

export default function InvestorRegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthSlider />
      <InvestorRegisterForm />
    </main>
  );
}
