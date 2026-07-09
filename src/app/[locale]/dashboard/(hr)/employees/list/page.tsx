'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { useRouter } from "next/navigation";

export default function EmployeesList() {
    const router = useRouter();

    return (
    <CollectionPage
    currentPage={1}
            onAdd = {() => {
                router.push('/dashboard/employees/new');
            }}
            title = "Employees List"
            data = {[]}
            columns={[]}/>)
}