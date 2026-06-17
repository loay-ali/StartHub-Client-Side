'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import Stepper from "@/components/dashboard/pages/orderService/Stepper";

import ChooseService from '@/components/dashboard/pages/orderService/ChooseService';

export default function OrderService() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <>
            <div className="min-h-screen bg-background p-8">
                <div className="mx-auto max-w-7xl rounded-3xl bg-surface p-10 shadow-sm">
                    <div className="mb-8">
                    <h1 className="text-4xl font-bold text-text-primary">
                        Startup Registration
                    </h1>

                    <p className="mt-3 text-text-secondary">
                        Complete the onboarding process to create your workspace.
                    </p>
                    </div>

                    <Stepper currentStep={currentStep} />

                    <motion.div
                    key={currentStep}
                    initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.98,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.35,
                    }}
                    className="mt-12"
                    >
                    {currentStep === 1 && <ChooseService/>}

                    {currentStep === 2 && <>Step 2</>}

                    {currentStep === 3 && <>Step 3</>}

                    {currentStep === 4 && <>Step 4</>}
                    </motion.div>

                    {currentStep >= 1 && currentStep <= 4 && (
                    <div className="mt-12 flex justify-between border-t border-border pt-8">
                        <button
                        onClick={handleBack}
                        className="rounded-xl border border-border px-6 py-3 transition hover:bg-slate-50"
                        >
                        Back
                        </button>

                        <button
                        onClick={handleNext}
                        className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
                        >
                        {currentStep === 4 ? "Complete Registration" : "Next"}
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}