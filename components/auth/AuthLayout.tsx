import LoginForm from "./LoginForm";
import AuthSlider from "./AuthSlider";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSlider />

      <LoginForm />
    </div>
  );
}
