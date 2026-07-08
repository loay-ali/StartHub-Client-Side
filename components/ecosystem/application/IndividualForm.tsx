import React from "react";
import { ApplicationData } from "./ApplicationModal";
import { Upload, X } from "lucide-react";

interface IndividualFormProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  isValid: boolean;
}

const SECTORS = [
  "AI", "FinTech", "HealthTech", "EdTech", "AgriTech", "SaaS",
  "E-commerce", "Cybersecurity", "IoT", "CleanTech", "Mobility",
  "Gaming", "Robotics", "Other"
];

export default function IndividualForm({ data, updateData, onNext, isValid }: IndividualFormProps) {

  const handleSectorToggle = (sector: string) => {
    if (data.sectors.includes(sector)) {
      updateData({ sectors: data.sectors.filter(s => s !== sector) });
    } else {
      updateData({ sectors: [...data.sectors, sector] });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "cv" | "additionalDocs") => {
    if (e.target.files && e.target.files[0]) {
      updateData({ [field]: e.target.files[0] });
    }
  };

  const removeFile = (field: "cv" | "additionalDocs") => {
    updateData({ [field]: null });
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
      {/* Personal Information */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
            <input
              type="text"
              value={data.fullName}
              onChange={e => updateData({ fullName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email *</label>
            <input
              type="email"
              value={data.email}
              onChange={e => updateData({ email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={e => updateData({ phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Country *</label>
            <input
              type="text"
              value={data.country}
              onChange={e => updateData({ country: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="United States"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
            <input
              type="text"
              value={data.city}
              onChange={e => updateData({ city: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="San Francisco"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address</label>
            <input
              type="text"
              value={data.address}
              onChange={e => updateData({ address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="123 Innovation Way"
            />
          </div>
        </div>
      </section>

      {/* Professional Information */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          Professional Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Role</label>
            <input
              type="text"
              value={data.currentRole}
              onChange={e => updateData({ currentRole: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="Software Engineer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">LinkedIn Profile</label>
            <input
              type="url"
              value={data.linkedin}
              onChange={e => updateData({ linkedin: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Portfolio / Website</label>
            <input
              type="url"
              value={data.portfolio}
              onChange={e => updateData({ portfolio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          Interested Sectors *
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Select at least one sector</p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map(sector => {
            const isSelected = data.sectors.includes(sector);
            return (
              <button
                key={sector}
                onClick={() => handleSectorToggle(sector)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all border ${isSelected
                    ? "bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-400"
                    : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
              >
                {sector}
              </button>
            )
          })}
        </div>
      </section>

      {/* Attachments */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          Attachments
        </h4>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Upload CV * (PDF, DOCX up to 20MB)</label>
            {!data.cv ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => handleFileUpload(e, "cv")} />
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-900/50 rounded-xl">
                <span className="text-sm font-medium text-teal-800 dark:text-teal-300 truncate">{data.cv.name}</span>
                <button onClick={() => removeFile("cv")} className="p-1 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/30 rounded-md transition-colors"><X size={16} /></button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Action */}
      <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Application
        </button>
      </div>
    </div>
  );
}
