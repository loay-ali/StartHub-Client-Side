'use client';

import { FiUploadCloud } from "react-icons/fi";

import Countries from "../components/Countries";
import { useEffect, useState } from "react";
import config from "@/constants/config";
import { useTranslations } from "next-intl";

export default function CompanyInfoStep({formRef,errors,setError,setWebsite,setIndustry,setSize,setCountry,setName,setImage}:{data:any,isErr:boolean,formRef:any,errors:string,setError:Function,setWebsite:Function,setIndustry:Function,setSize:Function,setCountry:Function,setName:Function,setImage:Function}) {
  
  const t = useTranslations();

    const handleFileChange = (e:any) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const url = URL.createObjectURL(selectedFile);
        console.log(url);
        setImg(url);
      }
    };

    const [img,setImg] = useState('');

  return (
    //@ts-ignore
    <form onInvalid = {e => setError(e.target.dataset.error)} ref = {formRef} className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">{t('public.register.company-information')}</h2>

        <p className="mt-3 text-text-secondary">
         {t('public.register.tell-us-more-about-your-business')}
        </p>
      </div>

      <div className="space-y-6">
        {errors && <p className = 'text-red-500'>{t('public.errors.'+ errors)}</p>}
        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-4 text-xl font-semibold">{t('public.register.company-image')}</h3>

          <label className="block cursor-pointer">
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center transition hover:border-primary">
              {img ? <img className = 'mx-auto' src = {img} />:<><FiUploadCloud className="mx-auto mb-4 text-5xl text-primary" />

              <p className="font-medium">{t('public.register.upload-your-company-logo')}</p>

              <p className="mt-2 text-sm text-text-secondary">
                PNG, JPG, SVG
              </p></>}
            </div>

            <input
              data-error = "company-image-is-required"
              required = {true}
              onInput = {(ele:any) => {
                setImage(ele.currentTarget?.files?.[0])
                handleFileChange(ele) 
              }}
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="hidden"
            />
          </label>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Company Details</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              data-error = "company-name-is-required"
              required = {true}
              onInput = {(ele:any) => setName(ele.currentTarget.value)}
              placeholder="Company Name"
              className="rounded-xl border border-border px-4 py-3"
            />

            <select data-error = "company-industry-is-required" required = {true} onChange = {(ele:any) => setIndustry(ele.target.value)} className="rounded-xl border border-border px-4 py-3">
              <option value = ''>Industry</option>
              <option value = 'technology'>Technology</option>
              <option value = 'ai'>Artificial Intelligence</option>
              <option value = 'education'>Education</option>
              <option value = 'healthcare'>Healthcare</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Online Presence</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              onInput = {(ele:any) => setWebsite(ele.currentTarget.value)}
              placeholder="Website URL"
              className="rounded-xl border border-border px-4 py-3"
            />

            <Countries className = "rounded-xl border border-border px-4 py-3" onChange = {(ele:any) => setCountry(ele.target.value)}/>
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Company Metrics</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <select data-error = "company-size-is-required" required = {true} onChange = {(ele) => setSize(ele.target.value)} name = 'company-size' className="rounded-xl border border-border px-4 py-3">
              <option value = ''>Company Size</option>
              <option value = '1-10'>1-10 Employees</option>
              <option value = '11-50'>11-50 Employees</option>
              <option value = '51-200'>51-200 Employees</option>
              <option value = '+200'>200+ Employees</option>
            </select>

            <input
              data-error = "company-founded-date-is-required"
              required = {true}
              type="month"
              name = 'company-founded-in'
              placeholder="Founded Date"
              className="rounded-xl border border-border px-4 py-3"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
