"use client";

const activities = [
  {
    title: "Invested in TechNova",
    time: "2 hours ago",
  },
  {
    title: "Created Startup Event",
    time: "Yesterday",
  },
  {
    title: "Reviewed Green Energy",
    time: "2 days ago",
  },
  {
    title: "Published Investment Opportunity",
    time: "Last week",
  },
];

export default function InvestorActivity() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-bold">Recent Activity</h2>

      <div className="space-y-8">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-5">
            <div className="mt-3 h-4 w-4 rounded-full bg-teal-600" />

            <div>
              <p className="text-xl font-semibold">{activity.title}</p>

              <p className="mt-2 text-lg text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
