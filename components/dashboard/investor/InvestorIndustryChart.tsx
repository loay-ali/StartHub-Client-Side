"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Technology", value: 40 },
  { name: "Healthcare", value: 25 },
  { name: "Finance", value: 20 },
  { name: "Energy", value: 15 },
];

const COLORS = ["#0f766e", "#14b8a6", "#5eead4", "#99f6e4"];

export default function InvestorIndustryChart() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold">Top Industries</h2>

      <p className="mt-2 text-lg text-gray-500">Most invested sectors</p>

      <div className="mt-8 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={140} label>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
