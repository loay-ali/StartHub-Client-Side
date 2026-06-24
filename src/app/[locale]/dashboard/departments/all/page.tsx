import CollectionPage from "@/components/collection/CollectionPage";

import { getAllDepartments, } from "@/src/services/departments";

import Department from "@/types/requests/departments";

import { redirect } from "next/navigation";

import Link from 'next/link';
import config from "@/constants/config";

async function removeDepartment(id:string) {
    const res = await fetch(config.apiUrl +'/deparments/'+ id,{credentials: 'include',method: 'DELETE'});

    if( res.status == 200 ) {
        return true;
    }

    return false;
}

export default async function AllDepartments() {
    const data:Department[] = await getAllDepartments();

    return (
        <>
        <CollectionPage
        onEdit={async (row:any) => {
            'use server';

            redirect('/dashboard/departments/'+ row.id);
        }}
        data = {data}
        columns = {[
            {key: 'id',label: "#",sortable:false},
            {key: 'name',label: "Title",sortable: true},
           
        ]} title = "Departments"/>
        </>
    );
}