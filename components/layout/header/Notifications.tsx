'use client';

import Notification from "@/types/requests/notification";

import Link from 'next/link';

import { FiBell } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { PiWarningDiamondFill } from "react-icons/pi";
import { RiInformation2Fill } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import config from "@/constants/config";

export default function Notifications() {
  const [notifications,setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications,setLoadingNotifications] = useState(true);

  const [cleared,setCleared] = useState(0);

  const [error,setError] = useState(false);

  const [open,setOpen] = useState(false);

  useEffect(() => {
    if( cleared == 1 ) {
      fetch(config.apiUrl +'/user/checkNotifications',{
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          where: 'upperNav',
          lastIndex: 0
        })
      }).then(() => {
        setCleared(2);
      })
    }

    if( loadingNotifications ) {
      fetch(config.apiUrl +'/user/notifications',{credentials: 'include'})
        .then(res => res.status == 200 ? res.json():Promise.reject())
        .then(res => {
          setNotifications(res.data);
        })
        .catch((err) => { setError(true)})
        .finally(() => {setLoadingNotifications(false)})
    }
  },[cleared]);

  //Don't Show Anything On Error
  if( error ) {
    return <></>
  }

  if( loadingNotifications ) {
    return <AiOutlineLoading className = 'spinner-loading' />
  }

  return (
    <>
    <button onClick = {() => {
        if( cleared == 0 && notifications.length > 0 ) setCleared(1);
        setOpen(s => !s)
      }} className="group relative rounded-xl border border-[#14b8a6]/15 bg-white/70 p-2.5 hover:border-[#14b8a6]/40 hover:bg-slate-50/80 transition-all duration-200">
      <FiBell size={18} className="text-slate-600" />

      <span className={(notifications.length == 0 ? "bg-gray-400":"bg-[#ef4444]") +" absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"}>
        {notifications.length}
      </span>
    
      <div className={(open ? 'block':'hidden') +" absolute right-0 top-[calc(100%+8px)] w-[320px] rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-md shadow-xl p-2 z-50"}>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">Notifications</p>
        <ul className="space-y-0.5">
          {notifications.length == 0 ? <span className = 'text-sm text-gray-600'>No Notifications</span>:notifications.map((noti: Notification) => {
            return (
              <li className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 transition-colors" key={noti.id}>
                <div className="mt-0.5 flex-shrink-0">
                  {noti.type == 'ERROR' ? <MdError size={22} color="#ef4444" /> :(
                    noti.type == 'WARNING' ? <PiWarningDiamondFill size={22} color="#f59e0b" /> :(
                      noti.type == 'INFO' ? <RiInformation2Fill size={22} color='#3b82f6' /> :(
                        noti.type == 'DONE' ? <CiCircleCheck size={22} color='#22c55e' /> :(
                          noti.type == 'CANCELLATION' ? <MdCancel size={22} color="#ef4444" /> : null
                        )
                      )
                    )
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{noti.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{noti.description}</p>
                </div>
              </li>
            );
          })}
          <li>
            <Link className = 'button secondary mt-5 block' href = '/dashboard/notifications'>
              All Notifications
            </Link>
          </li>
        </ul>
      </div>
    </button>
    </>
  );
}
