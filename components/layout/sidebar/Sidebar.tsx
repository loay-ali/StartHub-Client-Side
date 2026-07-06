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
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { LuLogs } from "react-icons/lu";

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
      className={`relative h-screen border-r border-border bg-surface p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarBrand
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

        {collapsed && (
          <div className="mb-6 flex justify-center absolute top-14 -right-4 z-[999]">
            <button
              onClick={() => setCollapsed(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white shadow-md transition hover:bg-slate-50 text-slate-600"
              title="Expand sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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
            title: t("dashboard.sidebar.recruitments"),
            href: "/dashboard/jobs/list",
            icon: <FaRankingStar />,
            children: [
              {
                title: t("dashboard.sidebar.postedjobs"),
                href: "/dashboard/jobs/list"
              },
              {
                title: t("dashboard.sidebar.candidates"),
                href: "/dashboard/candidates/list"
              },
              {
                title: t("dashboard.sidebar.interviews"),
                href: "/dashboard/interviews/list"
              }
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.HR"),
            href: "/feature/employees/list",
            icon: <BsClipboard2Data />,
            children: [
              {title: "Employees",href: "/dashboard/employees/list"},
              {title: "Attendance",href: "/dashboard/attendance/list"},
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.teams"),
            href: "/feature/teams",
            icon: <AiOutlineTeam />,
            children: [
              {href: "/dashboard/teams/list",title: t('dashboard.sidebar.manage-teams')},
              {href: "/dashboard/tasks/list",title: t('dashboard.sidebar.manage-tasks')}
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.finance"),
            href: "/feature/finance",
            icon: <TbCoins />,
            children: [
              {title: t("dashboard.sidebar.new-revenue-bill"),href: "/dashboard/bills/new/revenue"},
              {title: t("dashboard.sidebar.new-expense-bill"),href: "/dashboard/bills/new/expenses"},

              {title: t("dashboard.sidebar.payrolls"),href: "/dashboard/payrolls/list"},

              {title: t("dashboard.sidebar.reports"),href: "/dashboard/reports/list"},

              {title: t("dashboard.sidebar.accounts"),href: "/dashboard/accounts/list"},
              {title: t("dashboard.sidebar.transactions"),href: "/dashboard/transactions/list"},
            ]
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.BMC"),
            href: "/dashboard/bmc",
            icon: <LuBriefcaseBusiness />,
            children: [
              {href: "/dashboard/bmc/new",title: t("dashboard.sidebar.create-bmc")},
              {href: "/dashboard/bmc/list",title: t("dashboard.sidebar.my-list-of-bmcs")}
            ]
          }}
        />

        {!collapsed && <SidebarSection title="Company" />}

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.users"),
            href: "/users",
            icon: <FiUsers />,
            children: [
              {
                title: t("dashboard.sidebar.all-users"),
                href: "/dashboard/users/all",
              },
              {
                title: t("dashboard.sidebar.add-user"),
                href: "/dashboard/users/new",
              }
            ],
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.departments"),
            href: "dashboard/departments/all",
            icon: <FaBuilding />,
            children: [
              {
                title: t("dashboard.sidebar.all-departments"),
                href: "/dashboard/departments/all",
              },
              {
                title: t("dashboard.sidebar.add-department"),
                href: "/dashboard/departments/new",
              }
            ],
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.services"),
            href: "/dashboard/order-service",
            icon: <FaClipboardList />,
            children: [
              {
                title: t("dashboard.sidebar.order-service"),
                href: "/dashboard/order-service"
              },
              {
                title: t("dashboard.sidebar.my-orders"),
                href: "/dashboard/my-orders"
              }
            ]
          }} />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.integrations"),
            href: "/dashboard/integrations",
            icon: <MdOutlineIntegrationInstructions />,
          }}
        />

        <SidebarLink
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.usage"),
            href: "/dashboard/usage",
            icon: <LuLogs />,
          }}
        />

        <SidebarLink
          action = {() => setIsLogout(true)}
          className = "bg-red-50"
          collapsed={collapsed}
          item={{
            title: t("dashboard.sidebar.logout"),
            href: "#",
            icon: isLogout ? <AiOutlineLoading className = 'loading-spinner' />:<RiLogoutBoxFill />
          }}
        />
      </div>
    </aside>
  );
}
