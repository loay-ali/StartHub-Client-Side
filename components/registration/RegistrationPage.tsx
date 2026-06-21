import Stepper from "./components/Stepper";

import BmcMethodStep from "./steps/BmcMethodStep";
import UploadBmcStep from "./steps/UploadBmcStep";
import AiDiscoveryStep from "./steps/AiDiscoveryStep";
import BmcScoreStep from "./steps/BmcScoreStep";
import CompanyInfoStep from "./steps/CompanyInfoStep";
import FounderInfoStep from "./steps/FounderInfoStep";
import PaymentStep from "./steps/PaymentStep";
import SuccessStep from "./steps/SuccessStep";

export default async function RegistrationPage({params}:{params: Promise<{step: number,bmcMethod: 'upload'|'ai'}>}) {
  const currentParams = await params;

  const currentStep = currentParams.step;

  const bmcMethod= currentParams.bmcMethod ?? null;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleMethodSelect = (method: "upload" | "ai") => {
    setBmcMethod(method);
    setCurrentStep(4);
  };

  const handleNext = () => {
    if (currentStep === 2 && bmcMethod === "upload" && !uploadedFile) {
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
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
          {currentStep === 1 && <CompanyInfoStep />}

          {currentStep === 2 && <FounderInfoStep />}


          {currentStep === 3 && <BmcMethodStep onSelect={handleMethodSelect} />}


          {currentStep === 4 && bmcMethod === "upload" && (
            <UploadBmcStep
            selectedFile={uploadedFile}
            onFileSelect={setUploadedFile}
            />
          )}

          {currentStep === 4 && bmcMethod === "ai" && <AiDiscoveryStep />}

          {currentStep === 5 && <BmcScoreStep />}

          {currentStep === 6 && <PaymentStep />}

          {currentStep === 7 && <SuccessStep />}
        </motion.div>

        {currentStep >= 1 && currentStep < 7 && (
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
              {currentStep === 6 ? "Complete Registration" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
