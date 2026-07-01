"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FiHome, FiUsers } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { TbCoins } from "react-icons/tb";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FaRankingStar } from "react-icons/fa6";

import CompanyIdentity from "./CompanyIdentity";
import SidebarLink from "./SidebarLink";
import SidebarSection from "./SidebarSection";
import SidebarBrand from "./SidebarBrand";
import config from "@/constants/config";
import { useTranslations } from "next-intl";


export default function Sidebar({email,companyName}:{email:string,companyName:string}) {
  const [collapsed, setCollapsed] = useState(true);

  const [isLogout,setIsLogout] = useState(false);

  const router = useRouter();

  const t = useTranslations();

  useEffect(() => {
    if( isLogout ) {
      fetch(config.apiUrl +'/auth/logout',{
        method: "POST",
        credentials: 'include'
      }).then(res => {
        if( res.status === 200 ) {
          router.replace('/');
        }else {
          setIsLogout(false);
        }
      });
    }
  },[isLogout]);

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
            title: t("dashboard.sidebar.dashboard"),
            href: "/dashboard",
            icon: <FiHome />,
          }}
        />

        {!collapsed && <SidebarSection title="Features" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Recruitments",
            href: "/dashboard/jobs/list",
            icon: <FaRankingStar />,
            children: [
              {
                title: "Posted Jobs",
                href: "/dashboard/jobs/list"
              },
              {
                title: "Candidates",
                href: "/dashboard/candidates/list"
              },
              {
                title: "Interviews",
                href: "/dashboard/interviews/list"
              }
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "HR",
            href: "/feature/employees/list",
            icon: <BsClipboard2Data />,
            children: [
              {title: "Employees",href: "/dashboard/employees/list"},
              {title: "Attendance",href: "/dasboard/attendance/list"}
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Teams",
            href: "/feature/teams",
            icon: <AiOutlineTeam />,
            children: [
              {href: "/dashboard/teams/list",title: "Manage Teams"},
              {href: "/dashboard/tasks/list",title: "Manage Tasks"}
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Finance",
            href: "/feature/finance",
            icon: <TbCoins />,
            children: [
              {title: "New Revenue Bill",href: "/dashboard/bills/new/revenue"},
              {title: "New Expense Bill",href: "/dashboard/bills/new/expenses"},

              {title: "Reports",href: "/dashboard/reports/list"},

              {title: "Accounts",href: "/dashboard/accounts/list"},
              {title: "Transactions",href: "/dashboard/transactions/list"},
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "BMC",
            href: "/feature/bmc",
            icon: <LuBriefcaseBusiness />,
          }}
        />

        {!collapsed && <SidebarSection title="Company" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Users",
            href: "/users",
            icon: <FiUsers />,
            children: [
              {
                title: "All Users",
                href: "/dashboard/users/all",
              },
              {
                title: "Add User",
                href: "/dashboard/users/new",
              }
            ],
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: "Departments",
            href: "/departments",
            icon: <FaBuilding />,
            children: [
              {
                title: "All Departments",
                href: "/dashboard/departments/all",
              },
              {
                title: "Add Department",
                href: "/dashboard/departments/new",
              }
            ],
          }}
        />

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

        <SidebarLink
          action = {() => setIsLogout(true)}
          className = "bg-red-50"
          collapsed={collapsed}
          item={{
            title: "logout",
            href: "#",
            icon: isLogout ? <AiOutlineLoading className = 'loading-spinner' />:<RiLogoutBoxFill />
          }}
        />
      </div>
    </aside>
  );
}
