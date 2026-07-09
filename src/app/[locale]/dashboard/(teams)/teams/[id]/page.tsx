'use client';

import AIHelperButton from "@/components/ai/AIHelperButton";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

type Team = {
    name: string;
    employees: string[];
}

export default function SingleTeam() {
    const {id} = useParams();

    if( ! id ) {
        return <>No Such Team</>
    }

    const router = useRouter();

    const [employees,setEmployees] = useState([]);
    const [loadingEmployees,setLoadingEmployees] = useState(true);

    const [teamData,setTeamData] = useState<Team>({name: "",employees: []});
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const [choosedEmployee,setChoosedEmployee] = useState('');

    const [saving,setSaving] = useState(false);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/teams/'+ id,{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setTeamData(res);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
        }

        if( loadingEmployees ) {
            fetch(config.apiUrl +'/employees',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setEmployees(res);
            }).finally(() => {
                setLoadingEmployees(false);
            })
        }

        if( saving ) {
            fetch(config.apiUrl +'/teams/'+ id,{
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    name: teamData.name,
                    employees: teamData.employees
                })
            }).then(res => {
                if( res.status == 201 ) {
                    return router.push('/dashboard/teams/list');
                }
            })
        }
    },[]);

    if( loading || loadingEmployees ) {
        return <div className = 'flex items-center justify-center p-5'>
            <ButtonLoader size = {30} />
        </div>
    }

    if( error ) {
        return <>Error Fetching Team Data</>;
    }

    return (
        <section className = 'flex items-start justify-center gap-5'>
            <section className = 'bg-white p-5 rounded shadow'>
                <h2>
                    Team's Data
                </h2>

                <div className = 'form-group relative'>
                    <label htmlFor="name">Name</label>
                    <input type="text" value = {teamData.name} id="name" onInput = {ele => setTeamData(team => {
                        team.name = ele.currentTarget.value;
                        return team;
                    })}/>
                    <AIHelperButton purpose = "teamName" message = {{
                        content: "What Do You Need For Team Name Field ?",
                        actions: [],
                        //@ts-ignore
                        additional: {name: teamData.name}
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
                        {teamData.employees.map((emp:any,ind:number) => {
                            return (
                                <tr>
                                    <td>{ind + 1}</td>
                                    <td>
                                        {emp.fullname}
                                    </td>
                                    <td>
                                        <button
                                            onClick = {() => {
                                                setTeamData(team => {
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
                                        setTeamData(team => {

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
    );
}