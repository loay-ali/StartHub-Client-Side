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
    <Link href = '/dashboard/notifications' className="group relative rounded-xl border border-border p-3">
      <FiBell size={20} />

      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs font-semibold text-white">
        {notifications.length}
      </span>
    
      <ul className = 'border-b-1 border-gray-500 absolute left-[-150px] top-[100%] pt-5 w-[300px] bg-white z-1 hidden group-hover:block shadow-gray-500'>
        {notifications.map((noti:Notification) => {
          return (<li className = 'p-2' key = {noti.id}>
            <header className = 'flex items-center justify-start'>
              {noti.type == 'ERROR' ? <MdError size = {35} color = "#dc43545" />:(
                noti.type == 'WARNING' ? <PiWarningDiamondFill size = {35} color = "yellow"/>:(
                  noti.type == "INFO" ? <RiInformation2Fill size = {35} color = '#007BFF' />:(
                    noti.type == 'DONE' ? <CiCircleCheck size = {35} color = '#28A745' />:(
                      noti.type == 'CANCELLATION' ? <MdCancel size = {35} color = "#DC3545" />:null
                    )
                  )
                )
              )}
              <strong className = 'm-2'>{noti.name}</strong>
            </header>

            <p className = 'p-5 text-start'>
              {noti.description}
            </p>
          </li>);
        })}
      </ul>
    </Link>
    </>
  );
}
