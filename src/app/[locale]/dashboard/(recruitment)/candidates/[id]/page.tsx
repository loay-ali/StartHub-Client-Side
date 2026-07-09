'use client';

import AISection, { ActionType } from "@/components/ai/section/AISection";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import Job from "@/types/requests/jobs";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { forbidden, useParams, useRouter } from 'next/navigation';

import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { PiEmptyLight } from "react-icons/pi";

export default function CandidatePage() {

    const {id} = useParams();

    if( ! id ) return forbidden();

    const t = useTranslations();

    const router = useRouter();

    const [jobs,setJobs] = useState<Job[]>([]);
    const [isLoadingJobs,setIsLoadingJobs] = useState(true);

    const [isSavingCandidate,setIsSavingCandidate] = useState(false);
    const [isLoadingData,setIsLoadingData] = useState(true);
    const [candidate,setCandidate] = useState<{fullname:string,email:string,phone:string,appliedJob:string,cv:File|null,cvUrl?:string}>({
        fullname: '',
        email: '',
        phone: '',
        appliedJob: '',
        cv: null
    });

    useEffect(() => {
        if( isLoadingData ) {
          fetch(config.apiUrl +'/candidates/'+ id,{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
              setIsLoadingData(false);

              setCandidate({
                fullname: res.fullname,
                email: res.email,
                phone: res.phone,
                appliedJob: '',
                cvUrl: res.cvUrl,
                cv: null
              });
            })
        }

        if( isLoadingJobs ) {
            fetch(config.apiUrl +'/candidates',{credentials: 'include'})
                .then(res => res.status == 200 ? res.json():Promise.reject())
                .then(res => {
                    setJobs(res);
                }).finally(() => {
                    setIsLoadingJobs(false);
                })
        }

        if( isSavingCandidate ) {
            if( candidate.cv ) {
                const formData = new FormData();
                formData.append('file',candidate.cv);

                fetch(config.apiUrl +'/upload-file/cv',{
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    body: formData
                }).then(res => res.status == 201 ? res.json():Promise.reject())
                .then(res => {
                    fetch(config.apiUrl +'/candidates',{
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            jobId: candidate.appliedJob,
                            fullName: candidate.fullname,
                            phone: candidate.phone,
                            email: candidate.email,
                            cvUrl: res.data
                        })
                    }).then(() => {
                        router.push('/dashboard/candidates/list');
                    })
                })
            }

            fetch(config.apiUrl +'/candidates',{
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jobId: candidate.appliedJob,
                    fullName: candidate.fullname,
                    phone: candidate.phone,
                    email: candidate.email
                })
            }).then(() => {
                router.push('/dashboard/candidates/list');
            })
        }
    },[isSavingCandidate]);

    if( isLoadingJobs || isLoadingData ) return <div className = 'p-5 flex justify-center items-center'>
        <ButtonLoader size = {30} />
    </div>

    if( jobs.length == 0 ) {
        return (
            <section className = 'flex flex-col justify-center items-center gap-5 mt-20'>
                <PiEmptyLight size = {80} />
                <strong>{t('dashboard.candidates.no-jobs-to-apply-candidates-to')}</strong>

                <Link className = 'button' href = "/dashboard/jobs/new">{t('dashboard.jobs.create-a-job')}</Link>
            </section>
            );
    }

    return (
    <section className = 'flex items-start gap-5 justify-center max-w-[1200px] mx-auto'>
        <section className = 'bg-white mx-auto p-5 rounded shadow'>
            <h2 className = 'text-2xl'>{t('dashboard.candidates.create-a-candidate')}</h2>

            <div className = 'form-group'>
                <label htmlFor = 'fullname'>
                    {t('dashboard.fields.fullname')}
                </label>
                <input onInput = {(ele) => {
                    setCandidate(data => {
                        data.fullname = ele.currentTarget.value;
                        return data;
                    });
                }} value = {candidate.fullname} type="text" name="fullname" id="fullname" />
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'email'>
                    {t('dashboard.fields.email')}
                </label>
                <input onInput = {(ele) => {
                    setCandidate(data => {
                        data.email = ele.currentTarget.value;
                        return data;
                    });
                }} value = {candidate.email} type="email" name="email" id="email" />
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'phone'>
                    {t('dashboard.fields.phone')}
                </label>
                <input onInput = {(ele) => {
                    setCandidate(data => {
                        data.phone = ele.currentTarget.value;
                        return data;
                    });
                }} value = {candidate.phone} type="tel" name="phone" id = "phone" />
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'job'>
                    {t('dashboard.fields.applied-job')}
                </label>
                <select onInput = {(ele) => setCandidate((data) => {
                    data.appliedJob = ele.currentTarget.value;
                    return data;
                })} defaultValue = {candidate.appliedJob} name="job" id="job">
                    {jobs.map(job => (<option value = {job.id}>
                        {job.title}
                    </option>))}
                </select>
            </div>

            <div className = 'form-group'>
                <label htmlFor = 'cv'>
                    {t('dashboard.fields.cv')}
                </label>
                {candidate.cvUrl && <Link className = "button" href = {candidate.cvUrl} download = {true}>
                        {t("dashboard.fields.download-cv")}
                </Link>}
                <input onInput = {(ele) => setCandidate((data) => {
                    data.cv = ele.currentTarget.files?.[0] ?? null;
                    return data;
                })} type = 'file' name = 'cv' id = 'cv' accept = '*.png,*.jpg,*.pdf' />
            </div>

            <button onClick = {() => setIsSavingCandidate(true)} type ='submit' className = 'button w-full flex justify-center items-center'>
                {isSavingCandidate ? <ButtonLoader />:<>{t('dashboard.candidates.create-candidate')}</>}
            </button>
        </section>
        <AISection
            title = {t('dashboard.ai.need-help')}
            Icon = {Bot}
            initialActions={[
                {title: t('dashboard.ai.is-this-candidate-qualified'),type: ActionType.CHAT,action: "analyzeCandidate"}
            ]} />
    </section>
    );
}
