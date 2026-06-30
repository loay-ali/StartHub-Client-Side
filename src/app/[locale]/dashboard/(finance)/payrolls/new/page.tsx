'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPayroll() {
    const router = useRouter();

    const [saving,setSaving] = useState(false);
    const [payroll,setPayroll] = useState({
        employee: '',
        baseSalary: 0,
        bonus: 0,
        deduction: 0,
        date: (new Date).toDateString()
    });

    const [employees,setEmployees] = useState<any[]>([]);
    const [loadingEmployees,setLoadingEmployees] = useState(true);

    useEffect(() => {
        if( loadingEmployees ) {
            fetch(config.apiUrl +'/employees',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setEmployees(res);
                })
        }

        if( saving ) {
            fetch(config.apiUrl +'/payroll',{
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    employeeId: payroll.employee,
                    date: payroll.date,
                    bonus: payroll.bonus,
                    deductions: payroll.deduction
                })
            }).then(res => res.status == 201 ? router.push('/dashboard/payrolls/list'):Promise.reject())
        }
    },[saving]);

    return (
        <section className = 'flex items-start gap-10'>
            <section className = 'bg-white p-2 rounded shadow'>
                <h2>New Payroll</h2>

                <div className = 'form-group'>
                    <label htmlFor="employee">Employee</label>
                    <select
                        onChange = {ele => {
                            setPayroll(payroll => {
                                payroll.employee = ele.target.value;
                                payroll.baseSalary = employees.find(
                                    (emp:any) => emp.id == ele.target.value)?.salary ?? 0;
                                return payroll;
                            })
                        }}
                        defaultValue = {payroll.employee}>
                        {employees.map((emp:any) => (
                            <option key = {emp.id} value = {emp.id}>
                                {emp.fullname}
                            </option>
                        ))}
                    </select>
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
                        value = {payroll.bonus}
                        type = 'number'
                        min = '0'
                        onInput = {ele => setPayroll((payroll:any) => {
                            payroll.bonus = ele.currentTarget.value;
                            return payroll;
                        })}/> USD</div>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="employee">Deduction</label>
                    <div className = 'flex items-center gap-5'><input
                        value = {payroll.deduction}
                        type = 'number'
                        min = '0'
                        max = {payroll.baseSalary + payroll.bonus}
                        onInput = {ele => setPayroll((payroll:any) => {
                            payroll.deduction = ele.currentTarget.value;
                            return payroll;
                        })}/> USD</div>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="employee">Date</label>
                    <input
                        value = {payroll.date}
                        type = 'date'
                        onInput = {ele => setPayroll((payroll:any) => {
                            payroll.date = ele.currentTarget.value;
                            return payroll;
                        })}/>
                </div>
                    
                <button className = 'button' onClick = {() => setSaving(true)}>
                    {saving ? <ButtonLoader />:<>Save Payroll</>}
                </button>
            </section>
        </section>
    )
}