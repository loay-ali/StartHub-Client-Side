'use client';

import AIHelperButton from "@/components/ai/AIHelperButton";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { FaRegTrashCan } from "react-icons/fa6";

export default function NewTeam() {
    const t = useTranslations();

    const [team,setTeam] = useState<{name:string,employees: string[]}>({
        name: "",
        employees: []
    })

    const [employees,setEmployees] = useState([]);
    const [choosedEmployee,setChoosedEmployee] = useState('');

    const [loading,setLoading] = useState(true);

    const [saving,setSaving] = useState(false);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/employees',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setEmployees(res);
                }).finally(() => {
                    setLoading(false);
                })
        }

        if( saving ) {
            fetch(config.apiUrl +'/employees',{
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    name: team.name,
                    employees: team.employees.map((emp:any) => emp.id)
                })
            })
        }
    },[saving]);

    if( loading ) {
        return <div className = 'p-5 flex items-center justify-center'>
            <ButtonLoader size = {30} />
        </div>
    }

    return (
    <section className = 'flex justify-center items-start gap-5'>
        <section className = 'bg-white rounded shadow p-4 grow max-w-[750px]'>
            <h2>Create New Team</h2>

            <div className = 'form-group relative'>
                <label htmlFor="name">Team Name</label>
                <input type = 'text' id = 'name' value = {team.name} onInput = {ele => setTeam(tm => {
                    tm.name = ele.currentTarget.value;
                    return tm;
                })} />
                <AIHelperButton purpose = "teamName" message = {{
                    content: "What Do You Need For Team Name Field ?",
                    actions: [],
                    //@ts-ignore
                    additional: {name: team.name}
                }} />
            </div>

            <div className = 'form-group'>
                <label htmlFor="members">Members</label>
                <table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                {/* Operations */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {team.employees.map((emp:any,ind:number) => {
                        return (
                            <tr>
                                <td>{ind + 1}</td>
                                <td>
                                    {emp.fullname}
                                </td>
                                <td>
                                    <button
                                        onClick = {() => {
                                            setTeam(team => {
                                                team.employees = team.employees.filter((e:any) => e.id != emp.id);

                                                return team;
                                            })
                                        }}
                                        type = 'button'
                                        className = 'bg-red-300 text-red-600 p-2 rounded'>
                                        <FaRegTrashCan />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                        <td className = 'flex items-center justify-between gap-5' colSpan = {3}>
                            <select
                                onChange = {ele => {
                                    setChoosedEmployee(ele.target.value);
                                }}>
                                    <option value = ''>
                                        Choose Employee
                                    </option>
                                {employees.map((emp:any) => {
                                    return (
                                        <option key = {emp.id} value = {emp.id}>
                                            {emp.fullname}
                                        </option>
                                    )
                                })}
                            </select>

                            <button
                                onClick = {() => {
                                    setTeam(team => {

                                        team.employees.push(choosedEmployee);
                                        setChoosedEmployee('');

                                        return team;
                                    })
                                }}
                                type = 'button'
                                className = 'button secondary'>
                                Add
                            </button>
                        </td>
                    </tfoot>
                </table>
            </div>

            <button onClick = {() => setSaving(true)}className = 'button' type = 'button'>
                {saving ? <ButtonLoader />:<>Save</>}
            </button>
        </section>
    </section>
    )
}