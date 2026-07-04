'use client';

import config from "@/constants/config";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AiOutlineLoading } from "react-icons/ai";

export default function Bill({t}:{t:string}) {
    const router = useRouter();

    const [revenueTypes,setRevenueTypes] = useState<any[]>([]);
    const [isLoading,setIsLoading] = useState(true);

    const [type,setType] = useState('');
    const [amounts,setAmounts] = useState<Record<string,number>>({});
    const [date,setDate] = useState(new Date());
    const [details,setDetails] = useState('');
    
    const [isSaving,setIsSaving] = useState(false);

    useEffect(() => {
        if( isLoading ) {
            fetch(config.apiUrl +'/finance/bill/types/'+ t,{credentials: "include"})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setIsLoading(false);
                    setRevenueTypes(res);
                    if( res && res.length > 1 ) setType(res.at(0).id);
                })
        }

        if( isSaving ) {
            fetch(config.apiUrl +'/finance/bill',{
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    details,
                    date,
                    amounts,
                    type
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                //router.push('/dashboard/bills/list');
            }).catch(err => {
                console.warn(err);
            })
        }
    },[isSaving]);

    if( isLoading ) return <div className = 'p-5 flex items-center justify-center'><AiOutlineLoading className = 'spinner-loading'/></div>

    if( revenueTypes.length == 0 ) return <strong>Error Fetching Bills</strong>

    return (
    <section className = 'bg-white p-5 rounded mx-auto mt-20 shadow max-w-[750px]'>
        <h2>New {t == 'revenue' ? <>Revenue</>:<>Expense</>}</h2>

        <div className = 'form-group'>
            <label htmlFor="type">Type</label>
            <select name = 'type' id = 'type' defaultValue = {type} onChange = {ele => setType(ele.currentTarget.value)}>
                {revenueTypes.map((option:{id:string,label:string}) => {
                    return <option key = {option.id} value = {option.id}>{option.label}</option>
                })}
            </select>
        </div>

        <div className = 'form-group'>
            <label htmlFor="details">Details</label>
            <textarea className = 'border-1 rounded border-gray-500' onInput = {ele => setDetails(ele.currentTarget.value)} name="details" id="details" defaultValue={details}></textarea>
        </div>
            
        {revenueTypes.find((ty:{id:string}) => ty.id == type) && <div className = 'form-group'>
            <table>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {revenueTypes.find((ty:{id:string}) => ty.id == type).amounts.map((amount:any) => {
                        return <tr key = {amount}>
                            <td className = 'text-center'>
                                {amount}
                            </td>
                            <td className = 'text-center'>
                                <input type = 'number' min = '0' onInput = {ele => setAmounts((amounts:any) => {
                                    amounts[amount] = Number((ele.target as HTMLInputElement).value);
                                    return amounts;
                                })} />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>}

        <button onClick = {() => setIsSaving(true)} className = 'button'>
            Save Bill
        </button>
    </section>
    )
}