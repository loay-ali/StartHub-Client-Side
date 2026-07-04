'use client';

import config from "@/constants/config";
import { useEffect, useState } from "react";
import { ButtonLoader } from "../preloader/ButtonLoader";

import { IoMdClose } from "react-icons/io";

export default function SettingsWindow({setDashboardWidgets,closeSettingsWindow}:{setDashboardWidgets:Function,closeSettingsWindow:Function}) {

    const [settings,setSettings] = useState<{slug:string,isActive:boolean}[]>([]);
    const [loading,setLoading] = useState(true);

    const [saving,setSaving] = useState(false);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/dashboard/getSettings',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setSettings(res);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        if( saving ) {
            fetch(config.apiUrl +'/dashboard/setSettings',{
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(settings)
            }).then(res => res.status == 201 ? res.json():Promise.reject())
            .then(res => {
                setDashboardWidgets(res);
            }).finally(() => {
                setSaving(false);
                closeSettingsWindow();
            })
        }
    },[saving]);

    function updateSetting(slug:string,checked:boolean=false) {
        setSettings((s:any[]) => {
            s.find(ele => ele.slug == slug).isActive = checked;
            return s;
        })
    }

    return (
        <section className = 'flex flex-col fixed w-[600px] h-[500px] top-[calc(50%_-_250px)] left-[calc(50%_-_300px)] bg-white rounded p-2 outline-solid outline-[#0003] outline-[100vmax] z-9999'>
            <header className = 'flex items-center justify-between p-2 border-b-1 border-gray-300'>
                <strong>Adjusting Dashboard</strong>
                <button className = 'cursor-pointer' onClick = {() => closeSettingsWindow()}>
                    <IoMdClose />
                </button>
            </header>
            <section className = 'flex items-center justify-center grow overflow-auto'>
                {loading ? <ButtonLoader size = {40} color = "#000"/>:(
                    <ul className = 'grow h-full p-5'>
                    {settings.length == 0 ? (<>Something Went Wrong</>):settings.map((setting:{slug:string,isActive:boolean}) => {
                        return (
                        <li key = {setting.slug} className = 'p-2 flex justify-between items-center'>
                            <label htmlFor = {setting.slug}>{setting.slug}</label>
                            <input onInput = {(ele) => updateSetting(setting.slug,ele.currentTarget.checked)} type = 'checkbox' id = {setting.slug} defaultChecked = {setting.isActive}/>
                        </li>
                        )
                    })}
                    </ul>
                )}
            </section>
            <footer className = 'flex justify-between items-center gap-15'>
                <button className = 'button flex items-center justify-center' onClick = {() => setSaving(true)}>
                    {saving ? <ButtonLoader />:<>Save</>}
                </button>

                <button className = 'button secondary' onClick = {() => closeSettingsWindow()}>Cancel</button>
            </footer>
        </section>
    );
}