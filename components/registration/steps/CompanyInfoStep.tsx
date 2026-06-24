'use client';

import { FiUploadCloud } from "react-icons/fi";

import Countries from "../components/Countries";
import { useEffect, useState } from "react";
import config from "@/constants/config";

export default function CompanyInfoStep({setWebsite,setIndustry,setSize,setCountry,setName,setImage}:{setWebsite:Function,setIndustry:Function,setSize:Function,setCountry:Function,setName:Function,setImage:Function,registerationToken:string}) {
  
  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Company Information</h2>

        <p className="mt-3 text-text-secondary">
          Tell us more about your company and business.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-4 text-xl font-semibold">Company Logo</h3>

          <label className="block cursor-pointer">
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center transition hover:border-primary">
              <FiUploadCloud className="mx-auto mb-4 text-5xl text-primary" />

              <p className="font-medium">Upload Company Logo</p>

              <p className="mt-2 text-sm text-text-secondary">
                Optional • PNG, JPG, SVG
              </p>
            </div>

            <input
              onInput = {(ele:any) => setImage(ele.currentTarget?.files?.[0])}
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
              onInput = {(ele:any) => setName(ele.currentTarget.value)}
              placeholder="Company Name"
              className="rounded-xl border border-border px-4 py-3"
            />

            <select onChange = {(ele:any) => setIndustry(ele.target.value)} className="rounded-xl border border-border px-4 py-3">
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
            <select onChange = {(ele) => setSize(ele.target.value)} name = 'company-size' className="rounded-xl border border-border px-4 py-3">
              <option>Company Size</option>
              <option value = '1-10'>1-10 Employees</option>
              <option value = '11-50'>11-50 Employees</option>
              <option value = '51-200'>51-200 Employees</option>
              <option value = '+200'>200+ Employees</option>
            </select>

            <input
              type="month"
              name = 'company-founded-in'
              placeholder="Founded Date"
              className="rounded-xl border border-border px-4 py-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
