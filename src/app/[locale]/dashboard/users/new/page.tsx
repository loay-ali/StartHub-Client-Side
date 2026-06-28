'use client';

import config from "@/constants/config";
import ROLES from "@/constants/roles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AiOutlineLoading } from "react-icons/ai";

export default function newUser() {

  useEffect(() => {
    fetch(config.apiUrl +'/ai/chat',{credentials:'include',method: 'POST',headers: {'Content-Type': "application/json"},body: JSON.stringify({
      msg: "Hello Buddy"
    })}).then(res => {
      console.log(res);
    })
  },[]);

    const router = useRouter();

    const [isSubmitting,setIsSubmitting] = useState(false);

    const [user_name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [repassword,setRePassword] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    const [department,setDepartment] = useState('');

    useEffect(() => {
        if( isSubmitting ) {
            fetch(config.apiUrl +'/user',{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: user_name,
                    username,
                    email,
                    role,
                    password
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

    return (
    <section className = 'max-w-[750px] m-auto p-5 bg-white rounded'>

        <strong>Create New User</strong>
        <hr />

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'name'>
                Name
            </label>
            <input required type = 'text' onInput = {(element:any) => setName(element.target?.value ?? "")} value = {user_name} name = 'name' id = 'name' placeholder = "John Doe..."/>
        </div>

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'username'>
                Username
            </label>
            <input required type = 'text' onInput = {(element:any) => setUsername(element.target?.value ?? "")} value = {username} name = 'username' id = 'username' placeholder = "john_doe"/>
        </div>

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'email'>
                E-Mail
            </label>
            <input required type = 'email' onInput = {(element:any) => setEmail(element.target?.value ?? "")} value = {email} name = 'email' id = 'email' placeholder = "john_doe@domain.com"/>
        </div>

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'pwd'>
                Password
            </label>
            <input required type = 'password' onInput = {(element:any) => setPassword(element.target?.value ?? "")} value = {password} name = 'password' id = 'pwd' placeholder = "*********"/>
        </div>

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'repwd'>
                Repeat Password
            </label>
            <input required type = 'password' value = {repassword} onInput = {(element:any) => setRePassword(element.target?.value ?? "")} name = 'repeat-password' id = 'repwd' placeholder = "*********"/>
        </div>

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'role'>
                Role
            </label>
            <select defaultValue = {role} required name = 'role' id = 'role' onChange = {(element:any) => setRole(element.target.value ?? 'EMPLOYEE')}>
                {Object.entries(ROLES).map(([value,title]:[string,string]) => {
                    return (<option key = {value} value = {value}>
                        {title}
                    </option>);
                })}
            </select>
        </div>

        <div className = 'flex flex-col my-5'>
            <label htmlFor = 'department'>
                Department
            </label>
            <select onChange = {(element:any) => setDepartment(element.target.value)}>
                
            </select>
        </div>

        <button type = 'submit' className = 'button w-full flex justify-center' onClick = {() => setIsSubmitting(true)}>
            {isSubmitting ? <AiOutlineLoading className = 'spinner-loading'/>:<>Create</>}
        </button>

    </section>
    );
}