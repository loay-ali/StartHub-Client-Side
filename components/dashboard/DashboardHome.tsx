import StatsCard from "./StatsCard";
import RecentCompaniesTable from "./RecentCompaniesTable";
import { FiUsers, FiBriefcase, FiDollarSign, FiActivity } from "react-icons/fi";
export default function DashboardHome() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Companies"
          value="125"
          change="+12% this month"
          icon={<FiBriefcase size={20} />}
        />

        <StatsCard
          title="Active Users"
          value="1,240"
          change="+8% this month"
          icon={<FiUsers size={20} />}
        />

        <StatsCard
          title="Tokens Used"
          value="45K"
          change="+22% this month"
          icon={<FiActivity size={20} />}
        />

        <StatsCard
          title="Revenue"
          value="$12.5K"
          change="+15% this month"
          icon={<FiDollarSign size={20} />}
        />
      </div>

      <RecentCompaniesTable />
    </>
  );
}
