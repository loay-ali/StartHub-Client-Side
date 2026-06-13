import { FiUploadCloud } from "react-icons/fi";

export default function CompanyInfoStep() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Company Information</h2>

        <p className="mt-3 text-text-secondary">
          Tell us more about your company and business.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-4 text-xl font-semibold">Company Logo</h3>

          <label className="block cursor-pointer">
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center transition hover:border-primary">
              <FiUploadCloud className="mx-auto mb-4 text-5xl text-primary" />

              <p className="font-medium">Upload Company Logo</p>

              <p className="mt-2 text-sm text-text-secondary">
                Optional • PNG, JPG, SVG
              </p>
            </div>

            <input
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="hidden"
            />
          </label>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Company Details</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              placeholder="Company Name"
              className="rounded-xl border border-border px-4 py-3"
            />

            <select className="rounded-xl border border-border px-4 py-3">
              <option>Industry</option>
              <option>Technology</option>
              <option>Artificial Intelligence</option>
              <option>Education</option>
              <option>Healthcare</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Online Presence</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              placeholder="Website URL"
              className="rounded-xl border border-border px-4 py-3"
            />

            <input
              placeholder="Country"
              className="rounded-xl border border-border px-4 py-3"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Company Metrics</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <select className="rounded-xl border border-border px-4 py-3">
              <option>Company Size</option>
              <option>1-10 Employees</option>
              <option>11-50 Employees</option>
              <option>51-200 Employees</option>
              <option>200+ Employees</option>
            </select>

            <input
              type="number"
              placeholder="Founded Year"
              className="rounded-xl border border-border px-4 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
