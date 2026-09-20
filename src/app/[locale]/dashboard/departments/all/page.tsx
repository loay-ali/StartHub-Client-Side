'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import Department from "@/types/requests/departments";
import { forbidden, useRouter, useSearchParams } from "next/navigation";
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import AreYouSureWindow from "@/components/window/AreYouSure";
import AISection, { ActionType } from "@/components/ai/section/AISection";
import { Bot } from "lucide-react";

export default function AllDepartments() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [data,setData] = useState<Department[]>([]);

    const [loading,setLoading] = useState(true);
    const [deleting,setDeleting] = useState('');
    const [confirmDeleting,setConfirmDeleting] = useState(false);

    const t = useTranslations();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/departments',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setData(res);
            }).catch(() => {
                return forbidden();
            }).finally(() => {
                setLoading(false);
            })
        }

        if( deleting != '' && confirmDeleting == true ) {
            fetch(config.apiUrl + '/departments/' + deleting, {
                    credentials: 'include',
                    method: 'DELETE',
                })
                .then(res => res.status === 200 ? res.json():Promise.reject())
                .then(() => {
                    notificationService.success("Department deleted",t('dasbhoard.departments.the-department-was-removed-successfully'));
                    router.refresh();
                })
                .catch(() => {
                    notificationService.error("Delete failed", t('dashboard.departments.could-not-delete-the-department-please-try-again'));
                })
                .finally(() => {
                    setDeleting('');
                    setConfirmDeleting(false);
                });
        }
    },[confirmDeleting])

    if( loading ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30}/>
        </div>
    }

    return (
        <section className="flex items-start gap-5 max-w-[1200px] mx-auto">
            {deleting != '' && confirmDeleting == false && <AreYouSureWindow
            title = {t('dashboard.departments.remove-department')}
            confirmCallback={() => setConfirmDeleting(true)}
            setWindowState={(row:any) => setDeleting(row.id)}/>}
            <CollectionPage
                currentPage={searchParams.has('p') ? Math.abs(Number(searchParams.get('p'))):1}
                onAdd={() => router.push('/dashboard/departments/new')}
                onEdit={(row: any) => {
                    router.push('/dashboard/departments/' + row.id);
                }}
                onDelete={(row: any) => {
                    setDeleting(row.id);
                }}
                data={data}
                columns={[
                    { key: 'id', label: "#", sortable: false },
                    { key: 'name', label: t('dashboard.common.title'), sortable: true },
                    {key: 'employees',label: t('dashboard.employees.employees')}
                ]}
                title="Departments"
            />
            <AISection
                Icon = {Bot}
                title = {t('dashboard.ai.need-help')}
                initialActions={[
                    {title: t('dashboard.departments.create-department'),type: ActionType.CHAT,action: "createDepartment"}
                ]}/>
        </section>
    );
}