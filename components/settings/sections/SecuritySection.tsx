import { FiCheckCircle } from "react-icons/fi";

export default function SecuritySection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Security Settings</h2>

      <p className="mt-2 text-text-secondary">
        Update your password and secure your account.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Current Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border border-border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">New Password</label>

          <input
            type="password"
            className="w-full rounded-xl border border-border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border border-border px-4 py-3"
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-background p-5">
        <h3 className="mb-4 font-semibold">Password Requirements</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />
            <span>Minimum 8 characters</span>
          </div>

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />
            <span>One uppercase letter</span>
          </div>

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />
            <span>One number</span>
          </div>

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-green-500" />
            <span>One special character</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="rounded-xl bg-primary px-6 py-3 text-white">
          Change Password
        </button>
      </div>
    </div>
  );
}
