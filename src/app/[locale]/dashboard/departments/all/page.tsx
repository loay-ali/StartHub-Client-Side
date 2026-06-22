'use client';

import CollectionPage from "@/components/collection/CollectionPage";

import { getAllDepartments,deleteDepartment } from "@/src/services/departments";

import Department from "@/types/requests/departments";

import { useRouter } from "next/navigation";

import Link from 'next/link';

import {useState,useEffect} from 'react';

export default async function AllDepartments() {
    const data:Department[] = [
        {id:"hello-world",name: "HR",created_at: "2026-06-22T00:00:00"}
    ];//await getAllDepartments();

    const router = useRouter();

    const [deletingId,setDeletingId] = useState('');

    useEffect(() => {
        if( deletingId != '' ) {
            deleteDepartment(deletingId).then((res:boolean) => {
                if( res == true ) {
                    router.refresh();
                }else {
                    //Do Something
                }
            });
        }
    },[deletingId]);

    return (
        <>
        <CollectionPage
        onEdit={(row) => {
            
            router.replace('/dashboard/departments/'+ row.id);
        }}
        onDelete={(row) => {
            setDeletingId(row.id ?? '');
        }}
        onAdd={() => {

        }}
        data = {data}
        columns = {[
            {key: 'id',label: "#",sortable:false},
            {key: 'name',label: "Title",sortable: true},
            {key: 'created_at',label: "Date of Creation",sortable: true,value:(row) => {
                const d = new Date(row.created_at as string);

                return <>{d.getFullYear() +' / '+ (d.getMonth() + 1) +' / '+ d.getDate()}</>;
            }}
        ]} title = "Departments"/>
        </>
    );
}