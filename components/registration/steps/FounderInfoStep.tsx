import { FiUser, FiMail, FiPhone, FiLock, FiUploadCloud } from "react-icons/fi";

export default function FounderInfoStep() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Founder Information</h2>

        <p className="mt-3 text-text-secondary">
          Create the primary account owner for your company.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-4 text-xl font-semibold">Profile Photo</h3>

          <label className="block cursor-pointer">
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center transition hover:border-primary">
              <FiUploadCloud className="mx-auto mb-4 text-5xl text-primary" />

              <p className="font-medium">Upload Profile Photo</p>

              <p className="mt-2 text-sm text-text-secondary">
                Optional • PNG, JPG
              </p>
            </div>

            <input type="file" accept=".png,.jpg,.jpeg" className="hidden" />
          </label>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Personal Information</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                placeholder="First Name"
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                placeholder="Last Name"
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                placeholder="Phone Number"
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Account Security</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
