"use client";

const startups = [
  {
    name: "TechNova",
    industry: "Technology",
    budget: "$500K",
    score: "92%",
  },
  {
    name: "Green Energy",
    industry: "Energy",
    budget: "$1.2M",
    score: "88%",
  },
  {
    name: "HealthAI",
    industry: "Healthcare",
    budget: "$750K",
    score: "95%",
  },
];

export default function RecommendedStartups() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Recommended Startups</h2>

        <p className="mt-2 text-lg text-gray-500">
          Opportunities matching your investment profile
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {startups.map((startup) => (
          <div
            key={startup.name}
            className="
              rounded-xl
              border
              p-6
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700">
              {startup.name[0]}
            </div>

            <h3 className="text-2xl font-bold">{startup.name}</h3>

            <p className="mt-2 text-lg text-gray-500">{startup.industry}</p>

            <div className="mt-6 flex justify-between text-lg">
              <span className="text-gray-500">Requested</span>

              <span className="font-semibold">{startup.budget}</span>
            </div>

            <div className="mt-3 flex justify-between text-lg">
              <span className="text-gray-500">BMC Score</span>

              <span className="font-semibold text-green-600">
                {startup.score}
              </span>
            </div>

            <button
              className="
                mt-6
                w-full
                rounded-lg
                bg-teal-700
                py-3
                text-lg
                text-white
                transition
                hover:bg-teal-800
              "
            >
              View Company
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
