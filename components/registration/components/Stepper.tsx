interface StepperProps {
  currentStep: number;
}

const steps = [
  "Company",
  "Founder",
  "BMC Method",
  "BMC Analysis",
  "BMC Score",
  "Payment",
  "Complete",
];
export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="mb-12 flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-1 items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full font-semibold transition-all ${
                index + 1 <= currentStep
                  ? "bg-primary text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {index + 1}
            </div>

            <span
              className={`mt-3 text-sm font-medium ${
                index + 1 <= currentStep
                  ? "text-text-primary"
                  : "text-text-secondary"
              }`}
            >
              {step}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`mx-4 h-1 flex-1 rounded-full transition-all ${
                index + 1 < currentStep ? "bg-primary" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
