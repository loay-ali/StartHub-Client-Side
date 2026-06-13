import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: ReactNode;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary">{title}</p>

          <h2 className="mt-3 text-4xl font-bold text-text-primary">{value}</h2>

          {change && (
            <p className="mt-2 text-sm font-medium text-green-600">{change}</p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl bg-primary-light p-3 text-primary-dark">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
