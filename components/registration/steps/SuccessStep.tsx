import { FiCheckCircle } from "react-icons/fi";

export default function SuccessStep() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <FiCheckCircle className="mx-auto text-green-500" size={90} />

      <h2 className="mt-6 text-4xl font-bold">Registration Complete</h2>

      <p className="mt-4 text-lg text-text-secondary">
        Your company workspace has been created successfully.
      </p>

      <div className="mt-10 rounded-3xl border border-border p-8">
        <h3 className="text-xl font-semibold">Welcome to StartHub 🚀</h3>

        <p className="mt-3 text-text-secondary">
          You can now access your dashboard, manage your company, and start
          using the platform.
        </p>
      </div>

      <button className="mt-8 rounded-xl bg-primary px-8 py-4 font-medium text-white">
        Go To Dashboard
      </button>
    </div>
  );
}
