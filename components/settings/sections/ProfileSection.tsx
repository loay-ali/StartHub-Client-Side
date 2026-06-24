export default function ProfileSection() {
  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
          S
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-text-primary">StartHub</h2>

          <p className="mt-1 text-text-secondary">admin@starthub.com</p>

          <button className="mt-4 rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-slate-50">
            Upload Logo
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Company Information</h3>

        <p className="mt-1 text-sm text-text-secondary">
          Update your company details and contact information.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Company Name</label>

          <input
            type="text"
            defaultValue="StartHub"
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            defaultValue="admin@starthub.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <input
            type="text"
            defaultValue="+20 100 000 0000"
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Industry</label>

          <input
            type="text"
            defaultValue="Artificial Intelligence"
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="rounded-xl bg-primary px-6 py-3 font-medium text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
