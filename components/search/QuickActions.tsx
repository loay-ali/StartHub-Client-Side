"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCheckSquare,
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiBarChart2,
  FiArrowRight,
} from "react-icons/fi";

const quickActions = [
  {
    id: 1,
    title: "Create Task",
    subtitle: "Add a new task",
    href: "/tasks/create",
    icon: FiCheckSquare,
  },
  {
    id: 2,
    title: "Invite Employee",
    subtitle: "Send an invitation",
    href: "/employees/invite",
    icon: FiUsers,
  },
  {
    id: 3,
    title: "Generate Report",
    subtitle: "Create a business report",
    href: "/reports",
    icon: FiFileText,
  },
  {
    id: 4,
    title: "Add Company",
    subtitle: "Register a company",
    href: "/companies/create",
    icon: FiBriefcase,
  },
  {
    id: 5,
    title: "Open Analytics",
    subtitle: "View dashboards",
    href: "/analytics",
    icon: FiBarChart2,
  },
];

export default function QuickActions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-slate-200 p-4"
    >
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Quick Actions
      </h4>

      <div className="space-y-2">
        {quickActions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
            >
              <Link
                href={action.href}
                className="group flex items-center justify-between rounded-xl p-3 transition-all duration-200 hover:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-teal-600 transition-colors group-hover:bg-teal-50">
                    <Icon size={18} />
                  </div>

                  <div>
                    <div className="font-medium text-slate-900">
                      {action.title}
                    </div>

                    <div className="text-sm text-slate-500">
                      {action.subtitle}
                    </div>
                  </div>
                </div>

                <FiArrowRight className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-teal-600" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}