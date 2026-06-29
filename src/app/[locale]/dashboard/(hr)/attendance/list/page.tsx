'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { useRouter } from "next/navigation";

export default function AttendanceList() {
    const router = useRouter();

    return (
        <CollectionPage
            onAdd={() => {
                router.push('/dashboard/attendance/new');
            }}
            title = "Attendance"
            data = {[]}
            columns={[]}/>
    );
}