
'use client';

import { BiCog } from "react-icons/bi";
import { Sparkles } from "lucide-react";
import { FiUsers, FiBriefcase, FiDollarSign, FiActivity } from "react-icons/fi";
import type { IconType } from "react-icons";

import StatsCard from "./StatsCard";
import RecentCompaniesTable from "./RecentCompaniesTable";

import { useAIContext } from "@/components/providers/AIProvider";
import { useEffect, useState } from "react";
import SettingsWindow from "./Settings";
import config from "@/constants/config";

import { FaUsers } from "react-icons/fa";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

import { useTranslations } from "next-intl";
import { ButtonLoader } from "../preloader/ButtonLoader";


interface DashboardWidget {
  slug: string;
  value: string;
  change?: string;
  icon?: string;
}

export default function DashboardHome() {
  const ai = useAIContext();
  const [openSettingsWindow, setOpenSettingsWindow] = useState(false);
  const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidget[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const icons: Record<string, IconType> = {
    'tokens': MdOutlineGeneratingTokens,
    'users': FaUsers,
    'building': FaBuilding
  };

  useEffect(() => {
    fetch(config.apiUrl + '/dashboard/getClientDashboard', { credentials: 'include' })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        return [];
      })
      .then((data: DashboardWidget[]) => {
        setDashboardWidgets(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Failed to load client dashboard:", err);
        setDashboardWidgets([]);
      })
      .finally(() => {
        setLoadingDashboard(false);
      });
  }, []);

  const t = useTranslations()

  if( loadingDashboard ) {
    return <div className = 'flex justify-center items-center p-10'>
      <ButtonLoader size = {40} />
    </div>
  }

  return (
    <>
      {openSettingsWindow ? (<SettingsWindow setDashboardWidgets = {setDashboardWidgets} closeSettingsWindow = {() => setOpenSettingsWindow(false)}/>):null}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Open AI Assistant"
          onClick={() => {
            ai.setPurpose?.('dashboard');
            if (!ai.open) ai.toggleAI();
          }}
          className='button w-[40px]! h-[40px]! flex justify-center items-center p-0! opacity-[0.5] hover:opacity-[1]'>
          <Sparkles size={18} />
        </button>
        <button
          onClick = {() => {
            setOpenSettingsWindow(true);
          }}
          className = 'button w-[40px]! h-[40px]! flex justify-center items-center p-0! opacity-[0.5] hover:opacity-[1]'>
          <BiCog />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardWidgets.length == 0 ? (<strong>
          Welcome To The Dashboard !
        </strong>):dashboardWidgets.map((widget:{slug:string,value:string,change?:string,icon?:string}) => {
          const Icon = widget.icon ? icons[widget.icon]:null;
          return (
          <StatsCard 
            key = {widget.slug}
            title = {t('dashboard.home.'+ widget.slug)}
            value = {widget.value}
            change= {''}
            icon  = {Icon ? <Icon />:''}
          />
        )})}
      </div>
    </>
  );
}
