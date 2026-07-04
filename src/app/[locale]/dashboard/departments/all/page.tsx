import CollectionPage from "@/components/collection/CollectionPage";
import { getAllDepartments } from "@/src/services/departments";
import Department from "@/types/requests/departments";
import { redirect } from "next/navigation";
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";

async function removeDepartment(id: string) {
    const res = await fetch(config.apiUrl + '/departments/' + id, {
        credentials: 'include',
        method: 'DELETE',
    });

    if (res.status === 200) {
        notificationService.success("Department deleted", "The department was removed successfully.");
        return true;
    }

    notificationService.error("Delete failed", "Could not delete the department. Please try again.");
    return false;
}

export default async function AllDepartments() {
    const data: Department[] = await getAllDepartments();

    return (
        <CollectionPage
            onEdit={async (row: any) => {
                'use server';
                redirect('/dashboard/departments/' + row.id);
            }}
            onDelete={async (row: any) => {
                'use server';
                await removeDepartment(row.id);
            }}
            data={data}
            columns={[
                { key: 'id', label: "#", sortable: false },
                { key: 'name', label: "Title", sortable: true },
            ]}
            title="Departments"
        />
    );
}