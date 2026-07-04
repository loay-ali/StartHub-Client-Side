
'use client';

import { BiCog } from "react-icons/bi";
import { FiUsers, FiBriefcase, FiDollarSign, FiActivity } from "react-icons/fi";
import type { IconType } from "react-icons";

import StatsCard from "./StatsCard";
import RecentCompaniesTable from "./RecentCompaniesTable";

import AIWindow from "../ai/window/window";
import { useEffect, useState } from "react";
import SettingsWindow from "./Settings";
import config from "@/constants/config";

import { MdOutlineGeneratingTokens } from "react-icons/md";
import { useTranslations } from "next-intl";


export default function DashboardHome() {
  const [openSettingsWindow,setOpenSettingsWindow] = useState(false);
  const [dashboardWidgets,setDashboardWidgets] = useState([]);

  const [loadingDashboard,setLoadingDashboard] = useState(true);

  const icons: Record<string, IconType> = {
    'tokens': MdOutlineGeneratingTokens
  };

  useEffect(() => {
    if( loadingDashboard ) {
      fetch(config.apiUrl +'/dashboard/getClientDashboard',{credentials: 'include'})
        .then(res => res.status == 200 ? res.json():Promise.reject())
        .then(res => {
          setDashboardWidgets(res);
        }).finally(() => setLoadingDashboard(false))
    }
  },[]);

  const t = useTranslations()

  return (
    <>
      {openSettingsWindow ? (<SettingsWindow setDashboardWidgets = {setDashboardWidgets} closeSettingsWindow = {() => setOpenSettingsWindow(false)}/>):null}
      <button
        onClick = {() => {
          setOpenSettingsWindow(true);
        }}
        className = 'button w-[40px]! h-[40px]! flex justify-center items-center p-0! opacity-[0.5] hover:opacity-[1]'>
        <BiCog />
      </button>
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
