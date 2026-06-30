'use client';

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from 'react-icons/ai';
import config from '@/constants/config';
import { notificationService } from "@/lib/notifiationSystem";

export default function NewDepartment() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [department_name, setName] = useState('');

    useEffect(() => {
        if (!isSubmitting) return;

        fetch(config.apiUrl + '/departments', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: department_name }),
        })
            .then((res) => {
                if (res.status === 201) {
                    notificationService.success("Department created", `"${department_name}" was added successfully.`);
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
    }, [isSubmitting]);

    return (
        <section className='max-w-[750px] m-auto p-5 bg-white rounded'>
            <strong>Create New Department</strong>
            <hr />

            <div className='flex flex-col my-5'>
                <label htmlFor='name'>Name</label>
                <input
                    required
                    type='text'
                    onInput={(element: any) => setName(element.target?.value ?? "")}
                    value={department_name}
                    name='name'
                    id='name'
                    placeholder="Department Name..."
                />
            </div>

            <button
                type='submit'
                className='button w-full flex justify-center'
                onClick={() => setIsSubmitting(true)}
            >
                {isSubmitting ? <AiOutlineLoading className='spinner-loading' /> : <>Create</>}
            </button>
        </section>
    );
}