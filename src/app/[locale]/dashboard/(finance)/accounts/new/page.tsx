'use client';

import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Account = {
    slug:string;
    accountId:number;
    isDebit: boolean;
    parentId?: number;
}

export default function SingleAccount() {
    const router = useRouter();

    const [allAccounts,setAllAcounts] = useState<Account[]>([]);
    const [loadingAccounts,setLoadingAccounts] = useState(true);
    const [account,setAccount] = useState<Account>({
        slug: "",
        accountId: 0,
        isDebit: false
    });
    const [updating,setUpdating] = useState(false);

    useEffect(() => {     
        if( loadingAccounts ) {
            fetch(config.apiUrl +'/finance/account',{credentials:"include"})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setAllAcounts(res.data || res); // Handle both nested data array and flat array
                }).finally(() => {
                    setLoadingAccounts(false);
                });
        }

        if( updating ) {
            fetch(config.apiUrl +'/finance/account',{
                credentials: 'include',
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    slug: account.slug,
                    accountId: account.accountId,
                    parentId: account.parentId,
                    isDebit: account.isDebit
                })
            }).then(res => res.status == 201 ? router.push('/dashboard/accounts/list'):Promise.reject());
        }
    },[updating]);

    if( loadingAccounts ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30}/>
        </div>
    }

    if( account == null ) {
        return (<>No Such Account</>)
    }

    return (
        <section className = 'flex items-start'>
            <section className = 'bg-white shadow p-5 rounded'>
                <h2>
                    Account Page
                </h2>

                <div className = 'form-group'>
                    <label htmlFor="slug">Slug</label>
                    <input type = 'text' defaultValue={account.slug} onInput = {ele => setAccount(account => {
                        account.slug = ele.currentTarget.value;
                        return account;
                    })}/>
                </div>

                <div className = 'form-group'>
                    <label htmlFor = 'account-id'>Account ID</label>
                    <input type = 'number' min = '0' onInput = {ele => setAccount(account => {
                        account.accountId = Number(ele.currentTarget.value);
                        return account;
                    })}/>
                </div>

                <div className="form-group">
                    <label htmlFor="isDebit">Is Debit</label>
                    <input type="checkbox" onInput = {ele => setAccount(account => {
                        account.isDebit = ele.currentTarget.checked;
                        return account;
                    })} id="isDebit" defaultChecked = {account.isDebit} />
                </div>

                <div className = 'form-group'>
                    <label htmlFor = 'parent-account'>Parent Account</label>
                    <select id = 'parent-account' onChange = {ele => {
                        setAccount(account => {
                            account.parentId = Number(ele.target.value);
                            return account;
                        })
                    }}>
                        {allAccounts.map(acco => {
                            return (
                                <option value = {acco.accountId}>
                                    {acco.slug}
                                </option>
                            );
                        })}
                    </select>
                </div>  

                <button type = 'button' onClick = {() => setUpdating(true)}>
                    {updating ? <ButtonLoader />:<>Create</>}
                </button>
            </section>
        </section>
    );
}