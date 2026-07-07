"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Mail,
  Users,
  Wallet,
} from "lucide-react";

interface CompanyCardProps {
  company: {
    id: number;
    name: string;
    logo?: string;
    budgetMin: number;
    budgetMax: number;
    joinedDate: string;
    minEmployees: number;
    maxEmployees: number;
    founderName: string;
    founderEmail: string;
    isFavorite: boolean;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
      {/* Header */}

      <div className="flex items-start justify-between p-6">
        <div className="flex items-center gap-4">
          {/* Logo */}

          {company.logo ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 text-2xl font-bold text-white shadow-md">
              {company.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Company */}

          <div>
            <h3 className="text-xl font-bold text-slate-900">{company.name}</h3>

            <p className="mt-1 text-sm text-slate-500">
              Founder • {company.founderName}
            </p>
          </div>
        </div>

        {/* Favorite */}

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-red-200 hover:bg-red-50">
          <Heart
            size={20}
            className={
              company.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-slate-400"
            }
          />
        </button>
      </div>

      {/* Divider */}

      <div className="border-t border-slate-100" />

      {/* Body */}

      <div className="space-y-6 p-6">
        {/* Budget + Employees */}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-teal-700">
              <Wallet size={18} />

              <span className="text-sm font-medium">Budget</span>
            </div>

            <p className="font-semibold text-slate-900">
              ${company.budgetMin.toLocaleString()}
            </p>

            <p className="text-sm text-slate-500">
              to ${company.budgetMax.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-teal-700">
              <Users size={18} />

              <span className="text-sm font-medium">Employees</span>
            </div>

            <p className="font-semibold text-slate-900">
              {company.minEmployees} - {company.maxEmployees}
            </p>

            <p className="text-sm text-slate-500">Team Members</p>
          </div>
        </div>

        {/* Joined */}

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
          <CalendarDays size={20} className="text-teal-700" />

          <div>
            <p className="text-sm text-slate-500">Joined</p>

            <p className="font-medium text-slate-900">{company.joinedDate}</p>
          </div>
        </div>

        {/* Founder */}

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Founder Information
          </p>

          <h4 className="font-semibold text-slate-900">
            {company.founderName}
          </h4>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Mail size={16} />

            {company.founderEmail}
          </div>
        </div>
        {/* Footer */}

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Status
            </p>

            <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>

          <Link
            href={`/dashboard/investor/company/${company.id}`}
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-800 hover:shadow-lg group-hover:translate-x-1"
          >
            View Details
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
