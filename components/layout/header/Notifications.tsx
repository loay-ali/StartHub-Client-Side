import { getNotifications } from "@/src/services/auth";
import Notification from "@/types/requests/notification";

import Link from 'next/link';

import { FiBell } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { PiWarningDiamondFill } from "react-icons/pi";
import { RiInformation2Fill } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

export default function Notifications() {
  //const notifications:Notification[] = await getNotifications() ?? [];
  const notifications:Notification[] = [{id: 'hll',name: 'Service Is Done',type: 'DONE',description: "Service Is Done",createdAt: "2026-06-20T00:00:00"}];

  return (
    <>
    <Link href='/dashboard/notifications' className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[#14b8a6]/15 bg-white/80 text-slate-600 shadow-sm transition-all duration-200 hover:border-[#14b8a6]/40 hover:bg-slate-50/80">
      <FiBell size={18} />

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-bold text-white shadow-sm">
        {notifications.length}
      </span>
    
      <div className="absolute right-0 top-[calc(100%+10px)] z-50 hidden w-[min(92vw,320px)] rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-xl backdrop-blur-md group-hover:block sm:w-[320px]">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">Notifications</p>
        <ul className="space-y-0.5">
          {notifications.map((noti: Notification) => {
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
        </ul>
      </div>
    </Link>
    </>
  );
}
