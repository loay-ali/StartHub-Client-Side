"use client";

import { useState } from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa6";

import CompanyIdentity from "./CompanyIdentity";
import SidebarLink from "./SidebarLink";
import SidebarSection from "./SidebarSection";
import SidebarBrand from "./SidebarBrand";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen border-r border-border bg-surface p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarBrand
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {collapsed && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setCollapsed(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition hover:bg-slate-50"
          >
            →
          </button>
        </div>
      )}

      {!collapsed && (
        <CompanyIdentity companyName="StartHub" companyPlan="Enterprise Plan" />
      )}

      <div className="mt-8 space-y-1">
        {!collapsed && <SidebarSection title="Overview" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Dashboard",
            href: "/dashboard",
            icon: <FiHome />,
          }}
        />

        {!collapsed && <SidebarSection title="Features" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Companies",
            href: "/companies",
            icon: <FiUsers />,
            children: [
              {
                title: "All Companies",
                href: "/companies",
              },
              {
                title: "Pending Companies",
                href: "/companies/pending",
              },
              {
                title: "Suspended Companies",
                href: "/companies/suspended",
              },
            ],
          }}
        />

        {!collapsed && <SidebarSection title="Services" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Services",
            href: "/dashboard/order-service",
            icon: <FaClipboardList />,
            children: [
              {
                title: "Order Service",
                href: "/dashboard/order-service"
              },
              {
                title: "My Orders",
                href: "/dashboard/my-orders"
              }
            ]
          }} />

        {!collapsed && <SidebarSection title="Account Management" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Settings",
            href: "/settings",
            icon: <FiSettings />
          }}
        />
      </div>
    </aside>
  );
}
