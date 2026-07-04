'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPayroll() {
    const {id} = useParams();

    if( ! id ) {
        return <>Invalid</>
    }

    const [payroll,setPayroll] = useState({
        employee: '',
        baseSalary: 0,
        bonus: 0,
        deduction: 0,
        date: ''
    });

    const [loadingPayroll,setLoadingPayroll] = useState(true);
    const [error,setError] = useState(false);

    useEffect(() => {
        if( loadingPayroll ) {
            fetch(config.apiUrl +'/payroll/'+ id,{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setPayroll(res);
                    setLoadingPayroll(false);
                }).catch(() => {
                    setError(true);
                })
        }
    },[]);

    if( error ) {
        return <>Payroll Not found</>
    }

    if( loadingPayroll ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    return (
        <section className = 'flex items-start gap-10'>
            <section className = 'bg-white p-2 rounded shadow'>
                <h2>New Payroll</h2>

                <div className = 'form-group'>
                    <label htmlFor="employee">Employee</label>
                    <input type = 'text' value = {payroll.employee} disabled = {true} />
                </div>

                {/*<div className = 'form-group'>
                    <label htmlFor="employee">Employee</label>
                    <div className = 'flex items-center gap-5'><input
                        value = {payroll.baseSalary}
                        type = 'number'
                        min = '0'
                        onInput = {ele => setPayroll((payroll:any) => {
                            payroll.baseSalary = ele.currentTarget.value;
                            return payroll;
                        })}/> USD</div>
                </div>*/}

                <div className = 'form-group'>
                    <label htmlFor="employee">Bonus</label>
                    <div className = 'flex items-center gap-5'><input
                        readOnly = {true}
                        value = {payroll.bonus}
                        type = 'number'/> USD</div>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="employee">Deduction</label>
                    <div className = 'flex items-center gap-5'><input
                        readOnly = {true}
                        value = {payroll.deduction}
                        type = 'number'/> USD</div>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="employee">Date</label>
                    <input
                        readOnly = {true}
                        value = {payroll.date}
                        type = 'date'/>
                </div>
            </section>
        </section>
    )
}