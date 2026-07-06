"use client";

import {
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";

import InvestorStatsCard from "./InvestorStatsCard";
import InvestorGrowthChart from "./InvestorGrowthChart";
import InvestorIndustryChart from "./InvestorIndustryChart";
import InvestorActivity from "./InvestorActivity";
import RecommendedStartups from "./RecommendedStartups";

export default function InvestorDashboardHome() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Welcome Back, Investor 👋</h1>

        <p className="mt-3 max-w-2xl text-teal-100">
          Discover promising startups and grow your investment portfolio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InvestorStatsCard
          title="Total Investment"
          value="$2.5M"
          subtitle="+18% this month"
          icon={<FiDollarSign size={24} />}
        />

        <InvestorStatsCard
          title="Startups Reviewed"
          value="124"
          subtitle="+12 this week"
          icon={<FiUsers size={24} />}
        />

        <InvestorStatsCard
          title="Active Investments"
          value="18"
          subtitle="+2 this month"
          icon={<FiTrendingUp size={24} />}
        />

        <InvestorStatsCard
          title="Events"
          value="42"
          subtitle="5 upcoming"
          icon={<FiCalendar size={24} />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <InvestorGrowthChart />
        <InvestorIndustryChart />
      </div>

      {/* Recent Activity */}
      <InvestorActivity />

      {/* Recommended Startups */}
      <RecommendedStartups />
    </div>
  );
}
