import { FiFilter, FiSearch, FiMoreHorizontal } from "react-icons/fi";

const companies = [
  {
    id: 1,
    name: "StartHub",
    industry: "AI",
    plan: "Enterprise",
    status: "Active",
  },
  {
    id: 2,
    name: "TechNova",
    industry: "FinTech",
    plan: "Pro",
    status: "Active",
  },
  {
    id: 3,
    name: "ByteForge",
    industry: "SaaS",
    plan: "Basic",
    status: "Pending",
  },
  {
    id: 4,
    name: "CloudNet",
    industry: "Cloud",
    plan: "Enterprise",
    status: "Active",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function RecentCompaniesTable() {
  return (
    <div className="mt-8 rounded-2xl bg-surface p-4 md:p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">Recent Companies</h2>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />

            <input
              type="text"
              placeholder="Search company..."
              className="w-full sm:w-64 rounded-xl border border-border py-2 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button className="flex items-center justify-center rounded-xl border border-border p-3 transition hover:bg-slate-50">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-4 font-medium">Company</th>

              <th className="pb-4 font-medium">Industry</th>

              <th className="pb-4 font-medium">Plan</th>

              <th className="pb-4 font-medium">Status</th>

              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-border transition hover:bg-slate-50"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {company.name.charAt(0)}
                    </div>

                    <span className="font-medium">{company.name}</span>
                  </div>
                </td>

                <td className="py-4">{company.industry}</td>

                <td className="py-4">{company.plan}</td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusClass(
                      company.status,
                    )}`}
                  >
                    {company.status}
                  </span>
                </td>

                <td className="py-4">
                  <button className="rounded-lg p-2 transition hover:bg-slate-100">
                    <FiMoreHorizontal />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-text-secondary">
          Showing {companies.length} of 125 companies
        </p>

        <div className="flex gap-2">
          <button className="rounded-lg border border-border px-4 py-2 transition hover:bg-slate-50">
            Previous
          </button>

          <button className="rounded-lg border border-border px-4 py-2 transition hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
