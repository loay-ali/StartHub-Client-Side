"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Users, CheckCircle, ChevronLeft, Send } from "lucide-react";
import IndividualForm from "./IndividualForm";
import StartupForm from "./StartupForm";

// Types
export type ApplicantType = "individual" | "startup" | null;

export interface ApplicationData {
  applicantType: ApplicantType;
  // Individual fields
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  currentRole: string;
  linkedin: string;
  portfolio: string;
  cv: File | null;
  additionalDocs: File | null;
  
  // Startup fields
  startupName: string;
  founderName: string;
  startupLogo: File | null;
  pitchDeck: File | null;
  bmc: File | null;
  startupStage: string;
  teamSize: string;
  website: string;
  startupDescription: string;
  whyApplying: string;

  // Shared
  sectors: string[];
}

const initialData: ApplicationData = {
  applicantType: null,
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  currentRole: "",
  linkedin: "",
  portfolio: "",
  cv: null,
  additionalDocs: null,
  startupName: "",
  founderName: "",
  startupLogo: null,
  pitchDeck: null,
  bmc: null,
  startupStage: "",
  teamSize: "",
  website: "",
  startupDescription: "",
  whyApplying: "",
  sectors: [],
};

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityTitle: string | null;
}

export default function ApplicationModal({ isOpen, onClose, opportunityTitle }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Reset state if closed and re-opened
      setTimeout(() => {
        setStep(1);
        setFormData(initialData);
        setIsSuccess(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  
  const updateForm = (updates: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateStep2 = (): boolean => {
    if (formData.applicantType === "individual") {
      return !!(formData.fullName && formData.email && formData.phone && formData.country && formData.sectors.length > 0 && formData.cv);
    } else if (formData.applicantType === "startup") {
      return !!(formData.startupName && formData.founderName && formData.phone && formData.country && formData.address && formData.sectors.length > 0 && formData.pitchDeck && formData.bmc);
    }
    return false;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const renderSelectionStep = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-4">
        How would you like to apply?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => {
            updateForm({ applicantType: "individual" });
            handleNext();
          }}
          className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 bg-white dark:bg-slate-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-colors">
            <User size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">Apply as an Individual</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">For solo innovators, researchers, and professionals.</p>
          </div>
        </button>

        <button
          onClick={() => {
            updateForm({ applicantType: "startup" });
            handleNext();
          }}
          className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 bg-white dark:bg-slate-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-colors">
            <Users size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">Apply as a Team / Startup</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">For established teams, startups, and registered companies.</p>
          </div>
        </button>
      </div>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 max-w-2xl mx-auto w-full"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Review Application</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Please review your details before submitting.</p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">Application Type</span>
          <span className="text-sm font-semibold capitalize text-slate-800 dark:text-slate-200">{formData.applicantType}</span>
        </div>

        {formData.applicantType === "individual" && (
          <>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Full Name</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formData.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Contact</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formData.email} | {formData.phone}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Location</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formData.city ? formData.city + ", " : ""}{formData.country}</span>
            </div>
          </>
        )}

        {formData.applicantType === "startup" && (
          <>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Startup Name</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formData.startupName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Founder Name</span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{formData.founderName}</span>
            </div>
          </>
        )}

        <div className="flex flex-col gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">Sectors</span>
          <div className="flex flex-wrap gap-2">
            {formData.sectors.map(s => (
              <span key={s} className="px-2 py-1 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 rounded text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-1">
          <span className="text-sm text-slate-500 dark:text-slate-400">Files Provided</span>
          <div className="flex flex-wrap gap-3">
            {formData.cv && <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300"><CheckCircle size={14} className="text-teal-500"/> CV</div>}
            {formData.pitchDeck && <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300"><CheckCircle size={14} className="text-teal-500"/> Pitch Deck</div>}
            {formData.bmc && <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300"><CheckCircle size={14} className="text-teal-500"/> BMC</div>}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Submit Application <Send size={16} /></>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderSuccessState = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
        >
          <CheckCircle size={40} className="text-teal-500" />
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">Application Submitted!</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
        Your application for <strong>{opportunityTitle}</strong> has been received successfully and is now under review.
      </p>
      <div className="flex gap-3 justify-center w-full">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Back to Opportunity
        </button>
        <button
          onClick={() => { onClose(); /* Navigate to Dashboard/Applications */ }}
          className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors"
        >
          View My Applications
        </button>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100000]"
          />
          <div className="fixed inset-0 z-[100001] flex items-center justify-center p-0 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl bg-white dark:bg-[#0b131a] md:rounded-3xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-[#0b131a] z-10 shrink-0">
                <div className="flex items-center gap-3">
                  {step > 1 && !isSuccess && (
                    <button
                      onClick={handleBack}
                      className="p-1.5 -ml-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Application Form</h2>
                    {opportunityTitle && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] md:max-w-md">
                        {opportunityTitle}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Indicator */}
              {!isSuccess && step > 0 && (
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 shrink-0">
                  <motion.div
                    className="h-full bg-teal-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    renderSuccessState()
                  ) : step === 1 ? (
                    renderSelectionStep()
                  ) : step === 2 ? (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {formData.applicantType === "individual" ? (
                        <IndividualForm
                          data={formData}
                          updateData={updateForm}
                          onNext={handleNext}
                          isValid={validateStep2()}
                        />
                      ) : (
                        <StartupForm
                          data={formData}
                          updateData={updateForm}
                          onNext={handleNext}
                          isValid={validateStep2()}
                        />
                      )}
                    </motion.div>
                  ) : step === 3 ? (
                    renderReviewStep()
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
