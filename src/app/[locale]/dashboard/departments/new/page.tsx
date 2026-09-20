'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import config from '@/constants/config';
import { notificationService } from "@/lib/notifiationSystem";
import { ButtonLoader } from '@/components/preloader/ButtonLoader';
import { useTranslations } from 'next-intl';

import { CiSearch } from "react-icons/ci";

export default function NewDepartment() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [departmentName, setName] = useState('');
    const [departmentDesc,setDepartmentDesc] = useState('');

    const [employees,setEmployees] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);

    const [searchEmp,setSearchEmp] = useState('');

    const t = useTranslations();

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/employees',{credentials: 'include'})
            .then(res => res.status == 200)
            .then((res:any) => {
                setEmployees(res);
            }).finally(() => {
                setLoading(false);
            })
        }
  
        if (isSubmitting) {
            fetch(config.apiUrl + '/departments', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: departmentName }),
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 201) {
                        notificationService.success("Department created", `"${departmentName}" was added successfully.`);
                        router.replace('/dashboard/departments/all');
                    } else {
                        notificationService.error("Creation failed", "Could not create the department. Please try again.");
                    }
                })
                .catch(() => {
                    notificationService.error("Network error", "Could not reach the server. Check your connection.");
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        }
    }, [isSubmitting]);

    if( loading ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30} />
        </div>;
    }

    return (
        <section className='max-w-[750px] m-auto p-5 bg-white rounded'>
            <h2 className = 'text-2xl'>{t('dashboard.sidebar.add-department')}</h2>

            <div className='form-group flex flex-col my-5'>
                <label htmlFor='name'>{t('dashboard.common.title')}</label>
                <input
                    required
                    type='text'
                    onInput={(element: any) => setName(element.target?.value ?? "")}
                    value={departmentName}
                    name='name'
                    id='name'
                    placeholder={t("dashboard.departments.department-name")}
                />
            </div>

            <div className = 'form-group'>
                <label htmlFor="description">
                    {t('dashboard.common.description')}
                </label>
                <textarea
                    defaultValue={departmentDesc}
                    onInput = {e => setDepartmentDesc(e.currentTarget.value)}></textarea>
            </div>

            <div className = 'form-group'>
                {employees.length > 0 ?  <>
                <label htmlFor="employees">{t('dashboard.employees.employees')}</label>
               <section className = 'flex flex-col'>
                    <header className = 'flex items-center gap-3'>
                        <CiSearch />
                        <input
                            type = 'search'
                            defaultValue={searchEmp} onInput = {e => setSearchEmp(e.currentTarget.value)}
                            placeholder={t('dashboard.common.search')} />
                    </header>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('dashboard.common.name')}</th>
                                <th>{/* Enable/Disable */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((ele:{id:string,fullName:string,inDepartment:boolean},ind) => {
                                return (<tr>
                                    <td>{ind + 1}</td>
                                    <td>
                                        <label htmlFor={'employee-'+ ele.id}>{ele.fullName}</label>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id={'employee-'+ ele.id}
                                            defaultChecked={ele.inDepartment}/>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </section></>:<span className = 'text-center'>{t('dashboard.employees.no-employees')}</span>}
            </div>

            <button
                type='submit'
                className='button w-full flex justify-center items-center'
                onClick={() => setIsSubmitting(true)}
            >
                {isSubmitting ? <ButtonLoader /> : t('dashboard.common.create')}
            </button>
        </section>
    );
}