"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 450 },
  { month: "Mar", value: 700 },
  { month: "Apr", value: 1100 },
  { month: "May", value: 1700 },
  { month: "Jun", value: 2500 },
];

export default function InvestorGrowthChart() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold">
        Investment Growth
      </h2>

      <p className="mt-2 text-lg text-gray-500">
        Investment performance over time
      </p>

      <div className="mt-8 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#0f766e"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}