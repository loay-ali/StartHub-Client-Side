'use client';

import { useState,useEffect } from 'react';

import { useRouter } from "next/navigation";
import { AiOutlineLoading } from 'react-icons/ai';
import config from '@/constants/config';

export default function NewDepartment() {

    const router = useRouter();

    const [isSubmitting,setIsSubmitting] = useState(false);

    const [department_name,setName] = useState('');

    useEffect(() => {
        if( isSubmitting ) {
            fetch(config.apiUrl +'/user',{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: department_name,
                })
            }).then(res => {
                if( res.status == 201 ) {
                    router.replace('/dashboard/users/all');
                }
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    },[isSubmitting]);

    return (<section className = 'max-w-[750px] m-auto p-5 bg-white rounded'>
    
            <strong>Create New Department</strong>
            <hr />
    
            <div className = 'flex flex-col my-5'>
                <label htmlFor = 'name'>
                    Name
                </label>
                <input required type = 'text' onInput = {(element:any) => setName(element.target?.value ?? "")} value = {department_name} name = 'name' id = 'name' placeholder = "Department Name..."/>
            </div>

    
            <button type = 'submit' className = 'button w-full flex justify-center' onClick = {() => setIsSubmitting(true)}>
                {isSubmitting ? <AiOutlineLoading className = 'spinner-loading'/>:<>Create</>}
            </button>
    
        </section>);
}