'use client';

import CollectionPage from "@/components/collection/CollectionPage";
import { useRouter } from "next/navigation";

export default function AttendanceList() {
    const router = useRouter();

    return (
        <CollectionPage
        currentPage={1}
            onAdd={() => {
                router.push('/dashboard/attendance/new/date');
            }}
            title = "Attendance By Date"
            data = {[]}
            columns={[]}/>
    );
}