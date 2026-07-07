"use client";

import Image from "next/image";
import { MapPin, Building2, Wallet, Users, Brain } from "lucide-react";

export default function CompanyDetails() {
  const company = {
    name: "TechNova",
    logo: "",
    location: "Cairo, Egypt",
    industry: "Technology",
    description:
      "TechNova is an AI-powered startup helping businesses automate financial operations and provide smart investment solutions.",

    budgetMin: 100000,
    budgetMax: 500000,

    minEmployees: 10,
    maxEmployees: 50,

    aiScore: 82,

    founder: "Ahmed Mohamed",
    founderEmail: "ahmed@technova.com",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Hero */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 px-6 py-7 text-white">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            {company.logo ? (
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-4 border-white/30 bg-white">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/30 bg-white text-3xl font-bold text-teal-700">
                {company.name.charAt(0)}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold">{company.name}</h1>

              <div className="mt-2 flex flex-wrap gap-5 text-sm text-teal-50">
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  {company.industry}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {company.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <h3 className="mb-2 text-base font-semibold text-slate-900">
            About Company
          </h3>

          <p className="text-sm leading-6 text-slate-600">
            {company.description}
          </p>
        </div>
      </section>

      {/* Statistics */}

      <section className="grid gap-4 md:grid-cols-3">
        {/* Budget */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <Wallet size={18} className="text-teal-700" />
          </div>

          <p className="text-xs text-slate-500">Investment Budget</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            ${company.budgetMin.toLocaleString()}
          </h3>

          <p className="text-sm text-slate-500">
            to ${company.budgetMax.toLocaleString()}
          </p>
        </div>

        {/* Employees */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Users size={18} className="text-blue-600" />
          </div>

          <p className="text-xs text-slate-500">Team Size</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {company.minEmployees} - {company.maxEmployees}
          </h3>

          <p className="text-sm text-slate-500">Employees</p>
        </div>

        {/* AI Score */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
            <Brain size={18} className="text-purple-600" />
          </div>

          <p className="text-xs text-slate-500">AI Score</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {company.aiScore}%
          </h3>

          <p className="text-sm font-medium text-emerald-600">Excellent</p>
        </div>
      </section>
      {/* Business Model Canvas */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <Brain size={18} className="text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Business Model Canvas
            </h2>

            <p className="text-xs text-slate-500">
              AI evaluation of the company's business model.
            </p>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">AI Confidence Score</span>

          <span className="text-lg font-bold text-teal-700">
            {company.aiScore}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500"
            style={{
              width: `${company.aiScore}%`,
            }}
          />
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-900">
            AI Summary
          </h4>

          <p className="text-sm leading-6 text-slate-600">
            This company demonstrates a strong business model with sustainable
            growth potential, a clear value proposition, and a promising market
            opportunity according to the AI evaluation.
          </p>
        </div>
      </section>

      {/* Founder */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">
          Founder Information
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 text-xl font-bold text-white">
            {company.founder.charAt(0)}
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {company.founder}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {company.founderEmail}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
