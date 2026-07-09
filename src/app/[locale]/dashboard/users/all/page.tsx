'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { deleteUser, getUsers } from "@/src/services/users";
import User from "@/types/requests/users";
import { refresh } from "next/cache";

import { redirect, useRouter } from 'next/navigation';
import config from "@/constants/config";
import { useEffect, useState } from "react";
import AreYouSureWindow from "@/components/window/AreYouSure";
import { useTranslations } from "next-intl";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";

export default function UsersList() {
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const router = useRouter();

    const t = useTranslations();

    const [deleting, setDeleting] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('');

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/user',{credentials: "include"})
                .then(res => {
                    console.log(res);
                    return res.status == 200 ? res.json():Promise.reject()})
                .then(res => {
                    setAllUsers(res);
                })
                .catch(() => setError('public.errors.invalid-request'))
                .finally(() => setLoading(false))
        }
    },[]);

    if( loading ) {
        return <div className = 'h-[200px] flex justify-center items-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    if( error ) {
        return <>{t(error)}</>
    }

    return (<section>
        {deleting != '' && confirmDelete == false && <AreYouSureWindow
            title={t("dashboard.common.are-you-sure")}
            setWindowState={() => setDeleting('')}
            confirmCallback={() => setConfirmDelete(true)} />}
        <CollectionPage
            currentPage={1}
            onAdd={async () => {
                router.push('/dashboard/users/new');
            }}
            onDelete={(row: User) => {
                setDeleting(row.id ?? '');
            }}
            onEdit={(row: User) => {
                router.push('/dashboard/users/' + row.id);
            }}
            title="All Users"
            data={allUsers}
            columns={[
                { key: "index", label: "#", sortable: false },
                { key: "name", label: "Name", sortable: true,value: (row:any) => {

                    return (row.firstName && row.lastName) ? (row.firstName +' '+ row.lastName):row.email;
                }},
                { key: "role", label: "Role", sortable: true },
                { key: "createdAt", label: "Join In", sortable: true,value: (row:any) => {
                    const d = new Date(row.createdAt);

                    return d.getFullYear() +' / '+ (d.getMonth() + 1) +' / '+ d.getDate();
                }}
            ]} />
    </section>)
}