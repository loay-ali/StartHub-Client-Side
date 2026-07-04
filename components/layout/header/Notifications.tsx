"use client";

import Notification from "@/types/requests/notification";
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";

import { FiBell } from "react-icons/fi";
import { MdError, MdCancel } from "react-icons/md";
import { PiWarningDiamondFill } from "react-icons/pi";
import { RiInformation2Fill } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    {id: '1', name: 'Service Is Done', type: 'DONE', description: "Your requested service has completed successfully.", createdAt: "2026-06-20T00:00:00"},
    {id: '2', name: 'New Feature Added', type: 'INFO', description: "Check out the latest AI updates in your dashboard.", createdAt: "2026-06-21T10:30:00"}
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent bg-transparent text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-indigo-600 hover:border-slate-200"
      >
        <FiBell className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

        {notifications.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
            {notifications.length}
          </span>
        )}
      </button>
    
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(92vw,360px)] rounded-3xl border border-slate-100/80 bg-white/95 p-3 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 sm:w-[360px]">
          <div className="flex items-center justify-between px-3 pt-2 pb-3 border-b border-slate-100 mb-2">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</p>
            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{notifications.length} New</span>
          </div>
          
          <ul className="max-h-[300px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-500">No new notifications</div>
            ) : (
              notifications.map((noti: Notification) => (
                <li className="group flex items-start gap-3 rounded-2xl p-3 transition-all duration-200 hover:bg-slate-50 cursor-pointer" key={noti.id}>
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100 transition-transform duration-200 group-hover:scale-110">
                    {noti.type == 'ERROR' ? <MdError size={18} color="#ef4444" /> :(
                      noti.type == 'WARNING' ? <PiWarningDiamondFill size={18} color="#f59e0b" /> :(
                        noti.type == 'INFO' ? <RiInformation2Fill size={18} color='#6366f1' /> :(
                          noti.type == 'DONE' ? <CiCircleCheck size={18} color='#10b981' /> :(
                            noti.type == 'CANCELLATION' ? <MdCancel size={18} color="#ef4444" /> : null
                          )
                        )
                      )
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">{noti.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{noti.description}</p>
                  </div>
                </li>
              ))
            )}
          </ul>

          <div className="mt-2 pt-2 border-t border-slate-100">
            <Link onClick={() => setOpen(false)} href='/dashboard/notifications' className="flex w-full items-center justify-center rounded-xl bg-slate-50 py-2.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700">
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}