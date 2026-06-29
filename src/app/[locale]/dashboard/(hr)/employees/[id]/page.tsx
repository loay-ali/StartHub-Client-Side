'use client';

import { useParams } from "next/navigation";

export default function EmployeePage() {
    const {id} = useParams();

    if( ! id ) {
        return <>Invalid Request</>
    }

    return <></>
}