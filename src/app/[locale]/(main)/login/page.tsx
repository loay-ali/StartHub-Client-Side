import LoginForm from "@/components/auth/LoginForm";
import AuthSlider from "@/components/auth/AuthSlider";

export default function LoginPage() {

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthSlider />

      <LoginForm />
    </main>
  );
}
