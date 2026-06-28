"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const steps = [
  "Creating your account",
  "Setting up your workspace",
  "Initializing AI agents",
  "Building company memory",
  "Preparing your dashboard",
];

const messages = [
  [
    "Creating your secure StarHub workspace...",
    "Verifying your information...",
    "Securing your account...",
  ],
  [
    "Configuring your startup environment...",
    "Personalizing your workspace...",
    "Preparing your organization...",
  ],
  [
    "Activating your AI Operating System...",
    "Starting intelligent agents...",
    "Connecting AI assistants...",
  ],
  [
    "Building your company memory...",
    "Organizing operational knowledge...",
    "Preparing future insights...",
  ],
  [
    "Finalizing your dashboard...",
    "Loading your founder workspace...",
    "You're seconds away from StarHub...",
  ],
];

const tips = [
  "💡 StarHub continuously learns from your company's data.",
  "⚡ AI agents collaborate to help founders make faster decisions.",
  "📊 Your dashboard evolves as your company grows.",
  "🧠 Company Memory keeps organizational knowledge searchable.",
  "🚀 You're building an AI Operating System, not just another dashboard.",
];

/* ─── StarHub Orbital Loader SVG (48px) ───────────────────────────────── */
const OrbitalLoader = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Hub */}
    <circle cx="24" cy="24" r="6" fill="#0F766E" opacity="0.9">
      <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="24" cy="24" r="4" fill="#5EEAD4">
      <animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Inner orbit */}
    <circle
      cx="24"
      cy="24"
      r="14"
      stroke="#CCFBF1"
      strokeWidth="1"
      fill="none"
      strokeDasharray="3 3"
      opacity="0.5"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 24 24"
        to="360 24 24"
        dur="6s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="38" cy="24" r="3" fill="#0F766E">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 24 24"
        to="360 24 24"
        dur="6s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Outer orbit */}
    <circle
      cx="24"
      cy="24"
      r="20"
      stroke="#CCFBF1"
      strokeWidth="0.8"
      fill="none"
      strokeDasharray="4 6"
      opacity="0.35"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="360 24 24"
        to="0 24 24"
        dur="10s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="44" cy="24" r="2.5" fill="#14B8A6">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="360 24 24"
        to="0 24 24"
        dur="10s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="24" cy="4" r="2" fill="#5EEAD4">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="360 24 24"
        to="0 24 24"
        dur="10s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Connection lines */}
    <line x1="24" y1="24" x2="38" y2="24" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
    </line>

    {/* Glow ring */}
    <circle cx="24" cy="24" r="22" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.1">
      <animate attributeName="r" values="22;24;22" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.1;0.05;0.1" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

/* ─── Small orbital spinner for step items (20px) ──────────────────────── */
const StepSpinner = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="2.5" fill="#0F766E" opacity="0.6">
      <animate attributeName="r" values="2.5;3;2.5" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="8" cy="8" r="1.5" fill="#5EEAD4">
      <animate attributeName="r" values="1.5;1.8;1.5" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="8" cy="8" r="5" stroke="#CCFBF1" strokeWidth="0.5" fill="none" strokeDasharray="2 2" opacity="0.4">
      <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="13" cy="8" r="1.5" fill="#0F766E" opacity="0.7">
      <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default function RegistrationLoader() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState(messages[0][0]);
  const [tipIndex, setTipIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 2;

      if (current >= 100) {
        current = 100;
        setFinished(true);
        clearInterval(interval);
      }

      setProgress(current);

      const newStep =
        current < 20
          ? 0
          : current < 40
          ? 1
          : current < 60
          ? 2
          : current < 80
          ? 3
          : 4;

      setStep(newStep);

      const random =
        messages[newStep][
          Math.floor(Math.random() * messages[newStep].length)
        ];

      setMessage(random);
    }, 200);

    const tipsInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(tipsInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 mt-28 mb-28">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

        {/* Orbital Logo */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl bg-[#F0FDFA] p-4 shadow-lg border border-[#CCFBF1]">
            <OrbitalLoader size={48} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to StarHub
          </h2>

          <p className="mt-3 text-gray-600">
            Your AI Operating System is being prepared...
          </p>
        </div>

        {/* Tip */}
        <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-4 text-center text-sm text-teal-700 mb-8">
          {tips[tipIndex]}
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition"
            >
              <span
                className={
                  index <= step
                    ? "font-medium text-gray-900"
                    : "text-gray-400"
                }
              >
                {item}
              </span>

              {index < step ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : index === step && !finished ? (
                <StepSpinner />
              ) : finished ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-300" />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}