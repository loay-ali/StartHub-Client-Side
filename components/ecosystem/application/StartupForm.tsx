import React, { useState } from "react";
import { ApplicationData } from "./ApplicationModal";
import { Upload, X, Building, ChevronDown } from "lucide-react";

interface StartupFormProps {
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

// Mock dummy data for the user's existing startups
const MY_STARTUPS = [
  { id: "s1", name: "Optima AI", founder: "Jane Doe", phone: "+1 555 123 4567", country: "USA", address: "123 Tech Lane", sectors: ["AI", "SaaS"] },
  { id: "s2", name: "GreenCharge", founder: "Jane Doe", phone: "+1 555 987 6543", country: "Germany", address: "45 Innovation Blvd", sectors: ["CleanTech", "IoT"] }
];

export default function StartupForm({ data, updateData, onNext, isValid }: StartupFormProps) {
  
  const [selectedStartupId, setSelectedStartupId] = useState<string>("");

  const handleStartupSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedStartupId(id);
    
    if (id) {
      const startup = MY_STARTUPS.find(s => s.id === id);
      if (startup) {
        updateData({
          startupName: startup.name,
          founderName: startup.founder,
          phone: startup.phone,
          country: startup.country,
          address: startup.address,
          sectors: startup.sectors
        });
      }
    } else {
      updateData({
        startupName: "",
        founderName: "",
        phone: "",
        country: "",
        address: "",
        sectors: []
      });
    }
  };

  const handleSectorToggle = (sector: string) => {
    if (data.sectors.includes(sector)) {
      updateData({ sectors: data.sectors.filter(s => s !== sector) });
    } else {
      updateData({ sectors: [...data.sectors, sector] });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "pitchDeck" | "bmc") => {
    if (e.target.files && e.target.files[0]) {
      updateData({ [field]: e.target.files[0] });
    }
  };

  const removeFile = (field: "pitchDeck" | "bmc") => {
    updateData({ [field]: null });
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
      {/* Existing Startup Selection */}
      <section className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Building className="text-teal-500" size={18} />
          <h4 className="font-bold text-slate-800 dark:text-slate-100">Select Existing Startup</h4>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Applying with an existing startup will prefill the details below.
        </p>
        <div className="relative">
          <select 
            value={selectedStartupId} 
            onChange={handleStartupSelect}
            className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium"
          >
            <option value="">-- Register a new startup --</option>
            {MY_STARTUPS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
        </div>
      </section>

      {/* Startup Information */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          Startup Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Startup Name *</label>
            <input 
              type="text" 
              value={data.startupName} 
              onChange={e => updateData({ startupName: e.target.value })} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="Your Startup Inc."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Founder Name *</label>
            <input 
              type="text" 
              value={data.founderName} 
              onChange={e => updateData({ founderName: e.target.value })} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="Jane Doe"
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
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Address *</label>
            <input 
              type="text" 
              value={data.address} 
              onChange={e => updateData({ address: e.target.value })} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              placeholder="123 Startup Way"
            />
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          Startup Sectors *
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Select at least one sector</p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map(sector => {
            const isSelected = data.sectors.includes(sector);
            return (
              <button
                key={sector}
                onClick={() => handleSectorToggle(sector)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                  isSelected 
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

      {/* Startup Documents */}
      <section>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          Startup Documents
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pitch Deck *</label>
            {!data.pitchDeck ? (
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-semibold">Upload Pitch Deck</span></p>
                </div>
                <input type="file" className="hidden" accept=".pdf,.ppt,.pptx" onChange={e => handleFileUpload(e, "pitchDeck")} />
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-900/50 rounded-xl h-28">
                <span className="text-xs font-medium text-teal-800 dark:text-teal-300 truncate mr-2">{data.pitchDeck.name}</span>
                <button onClick={() => removeFile("pitchDeck")} className="p-1.5 bg-white dark:bg-slate-900 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/30 rounded-md transition-colors"><X size={14} /></button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Model Canvas *</label>
            {!data.bmc ? (
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-semibold">Upload BMC</span></p>
                </div>
                <input type="file" className="hidden" accept=".pdf,.ppt,.pptx" onChange={e => handleFileUpload(e, "bmc")} />
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-900/50 rounded-xl h-28">
                <span className="text-xs font-medium text-teal-800 dark:text-teal-300 truncate mr-2">{data.bmc.name}</span>
                <button onClick={() => removeFile("bmc")} className="p-1.5 bg-white dark:bg-slate-900 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/30 rounded-md transition-colors"><X size={14} /></button>
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
