'use client';

import AIHelperButton from "@/components/ai/AIHelperButton";
import AISection, { ActionType } from "@/components/ai/section/AISection";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import { notificationService } from "@/lib/notifiationSystem";
import Candidate from "@/types/requests/candidates";
import interview from "@/types/requests/interview";
import Job from "@/types/requests/jobs";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { forbidden, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditInterview() {
    const t = useTranslations();

    const {id} = useParams();

    if( ! id ) return forbidden();

    const [interview,setInterview] = useState<interview>({
        candidateId: '',
        jobId: '',
        durationMin: 1,
        scheduledAt: "",
        interviewType: ""
    });

    const INTERVIEW_TYPES = {
        'HR': t('dashboard.interviews.hr'),
        'TECHNICAL': t('dashboard.interviews.technical'),
        'FINAL': t('dashboard.interviews.final'),
        'BEHAVIORAL': t('dashboard.interviews.behavioral')
    };

    const [jobs,setJobs] = useState<Job[]>([]);
    const [candidates,setCandidates] = useState<Candidate[]>([]);

    const [loading,setLoading] = useState(true);
    const [loadingJobs,setLoadingJobs] = useState(true);
    const [loadingCandidates,setLoadingCandidates] = useState(true);

    const [saving,setSaving] = useState(false);

    useEffect(() => {
        if( loading ) {
            fetch(config.apiUrl +'/interviews/'+ id,{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setInterview(res);
            }).finally(() => setLoading(false))
        }

        if( loadingJobs ) {
            fetch(config.apiUrl +'/jobs',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setJobs(res);
            }).finally(() => {
                setLoadingJobs(false);
            })
        }

        if( loadingCandidates ) {
            fetch(config.apiUrl +'/candidates',{credentials: 'include'})
            .then(res => res.status == 200 ? res.json():Promise.reject())
            .then(res => {
                setCandidates(res);
            }).finally(() => {
                setLoadingCandidates(false);
            })
        }

        if( saving ) {
            fetch(config.apiUrl +'/interviews/'+ id,{
                credentials: 'include',
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(interview)
            }).then(res => {
                if( res.status == 200 ) notificationService.info(t('dashboard.common.updated'),t('dashboard.interviews.interview-updated-successfully'))
            }).finally(() => setSaving(false))
        }
    },[saving]);


    if( jobs.length == 0 ) {
        return (<>{t('dashboard.jobs.no-jobs')}</>)
    }

    if( candidates.length == 0 ) {
        return (<>{t('dashboard.candidates.no-candidates')}</>)
    }

    return (
        <section className = 'flex justify-center items-start gap-5 max-w-[1200px]'>
            <section className = 'bg-white shadow rounded p-5 grow'>
                <h2 className = 'text-2xl'>
                    {t("dashboard.interviews.interviews-list")}
                </h2>

                <div className = 'form-group'>
                    <label htmlFor="job">
                        {t('dashboard.jobs.choose-job')}    
                    </label>
                    <select id = 'job' defaultValue = {interview.jobId} onChange = {ele => {
                        setInterview(i => {
                            i.jobId = ele.target.value;
                            return i;
                        })
                    }}>
                        {jobs.map((job:Job) => {
                            return <option value = {job.id}>
                                {job.title}
                            </option>
                        })}
                    </select>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="candidate">
                        {t('dashboard.candidates.choose-candidate')}    
                    </label>
                    <select id = 'candidate' defaultValue = {interview.candidateId} onChange = {ele => {
                        setInterview(i => {
                            i.candidateId = ele.target.value;
                            return i;
                        })
                    }}>
                        {candidates.filter(c => c.jobId == interview.jobId).map((candidate:Candidate) => {
                            return <option value = {candidate.id}>
                                {candidate.fullname}
                            </option>
                        })}
                    </select>
                </div>

                <div className="form-group relative">
                    <label htmlFor="schedule">{t('dashboard.interviews.scheduled-at')}</label>
                    <input type="datetime" defaultValue={interview.scheduledAt} id="schedule" onInput = {ele => {
                        setInterview(i => {
                            i.scheduledAt = ele.currentTarget.value;
                            return i;
                        })
                    }}/>
                    <AIHelperButton
                        purpose = "setInterviewDatetime"
                        message = {
                            {content: "Do You Need To Set Interview Schedule With AI ?",actions: []}
                        } />
                </div>

                <div className="form-group">
                    <label htmlFor="durationMin">{t('dashboard.interviews.duration-minutes')}</label>
                    <input min = {1} type="number" defaultValue={interview.durationMin} id="durationMin" onInput = {ele => {
                        setInterview(i => {
                            i.durationMin = Number(ele.currentTarget.value);
                            return i;
                        })
                    }}/>
                </div>

                <div className = 'form-group'>
                    <label htmlFor="interview-type">
                        {t('dashboard.interviews.choose-interview-type')}    
                    </label>
                    <select id = 'interview-type' defaultValue = {interview.candidateId} onChange = {ele => {
                        setInterview(i => {
                            i.interviewType = ele.target.value;
                            return i;
                        })
                    }}>
                        <option value = "">
                            {t('dashboard.interviews.choose-interview-type')}
                        </option>
                        {Object.entries(INTERVIEW_TYPES).map(([value,title]:[string,string]) => {
                            return <option value = {value}>
                                {title}
                            </option>
                        })}
                    </select>
                </div>

                <button className = 'button flex justify-center items-center'>
                    {saving ? <ButtonLoader />:<>{t('dashboard.interviews.update-interview')}</>}
                </button>
            </section>
            <AISection
                Icon = {Bot}
                initialActions={[
                    {title: t('dashboard.interviews.edit-interview-data'),action: "updateInterview",type: ActionType.CHAT}
                ]}
                title = {t('dashboard.ai.need-help')} />
        </section>
    );
}