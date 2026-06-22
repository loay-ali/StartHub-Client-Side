import { getSingleDepartment } from "@/src/services/departments";
import { GrDocumentMissing } from "react-icons/gr";

import { redirect } from 'next/navigation';
import Link from "next/link";

export default async function EditDeparment({params}:{params:{id:string}}) {

    const paramSnapshot = await params;

    if( ! paramSnapshot.id ) {
        redirect('/dashboard/departments/new');
    }

    const departmentData = await getSingleDepartment(params.id);

    if( ! departmentData ) {
        return (<section className = 'flex flex-col justify-center items-center gap-5'>
            <GrDocumentMissing size = {50} />
            <strong>Wrong Department ID</strong>
            <Link href = "/dashboard/departments/all" className = 'button'>
                Back To Departments List
            </Link>
        </section>);
    }

    return (<>

    </>);
}