'use client';

import Stepper from "./components/Stepper";

import BmcMethodStep from "./steps/BmcMethodStep";
import UploadBmcStep from "./steps/UploadBmcStep";
import AiDiscoveryStep from "./steps/AiDiscoveryStep";
import BmcScoreStep from "./steps/BmcScoreStep";
import CompanyInfoStep from "./steps/CompanyInfoStep";
import FounderInfoStep from "./steps/FounderInfoStep";
import PaymentStep from "./steps/PaymentStep";
import SuccessStep from "./steps/SuccessStep";
import { init } from "@/src/services/registeration";
import AuthSwitcher from "../auth/AuthSwitcher";

import { useState,useEffect, useRef } from 'react';
import config from "@/constants/config";
import { register } from "module";
import { ButtonLoader } from "../preloader/ButtonLoader";
import { useTranslations } from "next-intl";
import { forbidden, useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();
  const [isFinalizing, setIsFinalizing] = useState(false);

  const [currentStep,setCurrentStep] = useState(1);

  const [bmcMethod,setBmcMethod] = useState('');

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState('');
  const [isErr,setIsErr] = useState(false);

  /* Company Data (Step 1) */
  const [companyImage,setCompanyImage] = useState<File|null>(null);

  const [companyName,setCompanyName] = useState('');
  const [companyIndustry,setCompanyIndustry] = useState('');
  const [companyWebsite,setCompanyWebsite] = useState('');
  const [companySize,setCompanySize] = useState('');
  const [companyCountry,setCompanyCountry] = useState('');
  const [companyFoundDate,setCompanyFoundDate] = useState('');

  const [saveCompanyData,setSaveCompanyData] = useState(false);

  /* Founder Data (Step 2) */
  const [founderImage,setFounderImage] = useState<File|null>(null);
  const [founderFirstName,setFounderFirstName] = useState('');
  const [founderLastName,setFounderLastName] = useState('');
  const [founderEmail,setFounderEmail] = useState('');
  const [founderPhone,setFounderPhone] = useState('');
  const [founderPassword,setFounderPassword] = useState('');
  const [founderConfirmPassword,setFounderConfirmPassword] = useState('');

  const [saveFounder,setSaveFounder] = useState(false);

  /* BMC (Step 3) */
  const [uploadedBmc,setUploadedBmc] = useState<File|null>(null);
  const [uploadingBmc,setUploadingBmc] = useState(false);

  /* Analyze BMC (Step 4) */
  const [bmcAnswer,setBmcAnswers] = useState([]);

  /* Show Bmc Analyze Score */
  const [bmcScore,setBmcScore] = useState(50);

  const t = useTranslations();

  const formRef = useRef<any>(null);

  const [errorFetching,setErrorFetching] = useState(false);

  useEffect(() => {
    if( loading ) fetch(config.apiUrl +'/registration/register',{method: 'POST',credentials: 'include'}).then(res => {
      return res.status === 201 ? res.json():Promise.reject(new Error(`HTTP error! status: ${res.status}`))
    }).then(res => {
      if( res.step && res.step >= 1 && res.step <= 6 ) {
        setCurrentStep(res.step);
      }
    }).catch(() => setErrorFetching(true)).finally(() => setLoading(false));

    if( uploadingBmc ) {
      
      if (bmcMethod === 'upload' && uploadedBmc) {
        const formData = new FormData();
        formData.append('file', uploadedBmc);

        fetch(config.apiUrl + '/upload-file/file', {
          method: 'POST',
          credentials: 'include',
          body: formData
        }).then(res => res.json())
        .then(({filePath}) => {
            fetch(config.apiUrl +'/registration/fill-bmc',{
              method:"POST",
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                bmcFile: filePath,
                method: bmcMethod
              })
            }).then(res => res.json())
            .then(res => {
              setBmcScore(res.score || 50);
              setUploadingBmc(false);
              setCurrentStep(s => s + 1);
            }).catch(err => {
              console.error("Fill BMC failed:", err);
              setError("bmc-upload-failed");
              setUploadingBmc(false);
            });
        }).catch(err => {
          console.error("BMC file upload failed:", err);
          setError("bmc-file-upload-failed");
          setUploadingBmc(false);
        });
      } else if (bmcMethod === 'ai') {
        fetch(config.apiUrl +'/registration/fill-bmc',{
          method:"POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answers: bmcAnswer,
            method: bmcMethod
          })
        }).then(res => res.json())
        .then(res => {
          setBmcScore(res.score || 50);
          setUploadingBmc(false);
          setCurrentStep(s => s + 1);
        }).catch(err => {
          console.error("AI BMC fill failed:", err);
          setError("bmc-ai-failed");
          setUploadingBmc(false);
        });
      } else {
        setUploadingBmc(false);
      }
    }

    if( errorFetching ) {
      setLoading(false);
      return;
    }

    if( saveFounder ) {
        if( founderPassword != founderConfirmPassword ) {
          setError("password-not-match");
          setSaveFounder(false);
          return;
        }

        const submitFounder = (imagePath?: string) => {
          fetch(config.apiUrl + '/registration/founder', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...(imagePath ? { image: imagePath } : {}),
              firstName: founderFirstName,
              lastName: founderLastName,
              phone: founderPhone || undefined,
              email: founderEmail,
              password: founderPassword
            })
          })
          .then(async (res) => {
            if (res.status === 201 || res.status === 200) {
              setSaveFounder(false);
              setCurrentStep(s => s + 1);
              return;
            }
            const errorData = await res.json().catch(() => null);
            const message = Array.isArray(errorData?.message)
              ? errorData.message.join(', ')
              : errorData?.message || `HTTP error! status: ${res.status}`;
            throw new Error(message);
          })
          .catch(err => {
            console.error("Founder registration failed:", err);
            setError(err.message || "Registration failed");
            setSaveFounder(false);
          });
        };

        if (founderImage) {
          const formData = new FormData();
          formData.append('file', founderImage);

          fetch(config.apiUrl + '/upload-file/image', {
            method: 'POST',
            credentials: 'include',
            body: formData
          })
          .then(res => res.json())
          .then(({ filePath }: { filePath: string }) => {
            submitFounder(filePath);
          })
          .catch(err => {
            console.error("Founder image upload failed:", err);
            setSaveFounder(false);
          });
        } else {
          submitFounder();
        }
    }

    if( saveCompanyData ) {
      const formData = new FormData();
      if( companyImage ) formData.append('file',companyImage);

      //Upload Image
      if( companyImage ) {
        fetch(config.apiUrl +'/upload-file/image',{
          method: 'POST',
          credentials: 'include',
          body: formData
        })
        .then(async (response) => {
          if (response.status === 201 || response.status === 200) {
            return response.json();
          }
          const errorData = await response.json().catch(() => null);
          const message = Array.isArray(errorData?.message)
            ? errorData.message.join(', ')
            : errorData?.message || `HTTP error! status: ${response.status}`;
          throw new Error(message);
        })
        .then(res => {
          fetch(config.apiUrl +'/registration/company',{
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              companyImage: res.filePath,
              companyName: companyName,
              companyIndustry: companyIndustry,
              companyWebsite: companyWebsite,
              companySize: companySize,
              companyLocation: companyCountry,
              companyFoundDate: companyFoundDate
            })
          })
          .then(async (res) => {
            if (res.status === 201 || res.status === 200) {
              setSaveCompanyData(false);
              setCurrentStep(s => s + 1);
              return;
            }
            const errorData = await res.json().catch(() => null);
            const message = Array.isArray(errorData?.message)
              ? errorData.message.join(', ')
              : errorData?.message || `HTTP error! status: ${res.status}`;
            throw new Error(message);
          })
          .catch(err => {
            console.error("Company registration failed:", err);
            setSaveCompanyData(false);
          });
        })
        .catch(err => {
          console.error("Company image upload failed:", err);
          setSaveCompanyData(false);
        });
      } else {
        fetch(config.apiUrl +'/registration/company',{
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            companyName: companyName,
            companyIndustry: companyIndustry,
            companyWebsite: companyWebsite,
            companySize: companySize,
            companyLocation: companyCountry,
            companyFoundDate: companyFoundDate
          })
        })
        .then(async (res) => {
          if (res.status === 201 || res.status === 200) {
            setSaveCompanyData(false);
            setCurrentStep(s => s + 1);
            return;
          }
          const errorData = await res.json().catch(() => null);
          const message = Array.isArray(errorData?.message)
            ? errorData.message.join(', ')
            : errorData?.message || `HTTP error! status: ${res.status}`;
          throw new Error(message);
        })
        .catch(err => {
          console.error("Company registration failed:", err);
          setSaveCompanyData(false);
        });
      }
    }
  },[saveCompanyData,saveFounder,uploadingBmc]);

  if( loading ) return (
    <div className = 'h-[200px] flex items-center justify-center'>
      <ButtonLoader size = {30} />
    </div>
  );

  const handleCompleteRegistration = async () => {
    if (isFinalizing) return;
    setIsFinalizing(true);
    setError('');

    try {
      const res = await fetch(config.apiUrl + '/registration/complete', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        setCurrentStep(7);
        setTimeout(() => {
          router.replace('/dashboard');
        }, 1500);
        return;
      }

      const errorData = await res.json().catch(() => null);
      const message = Array.isArray(errorData?.message)
        ? errorData.message.join(', ')
        : errorData?.message || `HTTP error! status: ${res.status}`;

      throw new Error(message);
    } catch (err: any) {
      console.error("Registration finalization failed:", err);
      setError(err?.message || "Failed to complete registration");
      setIsFinalizing(false);
    }
  };

  const goBack = () => {
    if (currentStep > 1 && currentStep <= 6 && !isFinalizing && !saveCompanyData && !saveFounder && !uploadingBmc) {
      setError('');
      setIsErr(false);
      setCurrentStep(prev => prev - 1);
    }
  };

  function nextStep() {
    setIsErr(false);
    setError('');

    if (currentStep === 1 || currentStep === 2) {
      if( formRef?.current?.checkValidity?.() == false ) {
        formRef?.current?.scrollIntoView();
        setIsErr(true);
        return;
      }
    }

    switch(currentStep) {
      case 1:
        setSaveCompanyData(true);
      break;

      case 2:
        setSaveFounder(true);
      break;

      case 3:
        if (!bmcMethod) {
          setError("please-select-bmc-method");
          setIsErr(true);
          return;
        }
        setCurrentStep(4);
      break;

      case 4:
        if (bmcMethod === 'upload' && !uploadedBmc) {
          setError("please-upload-bmc-file");
          setIsErr(true);
          return;
        }
        setUploadingBmc(true);
      break;

      case 5:
        setCurrentStep(6);
      break;

      case 6:
        handleCompleteRegistration();
      break;
    }
  }

  const isBusy = saveCompanyData || saveFounder || uploadingBmc || isFinalizing;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl rounded-3xl bg-surface p-10 shadow-sm">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary">
            {t('public.register.startup-registeration')}
          </h1>

          <p className="mt-3 text-text-secondary">
            {t('public.register.compelete-the-onboarding-process-to-create-your-workspace')}
          </p>
        </div>

        <Stepper currentStep={currentStep} />

        <section>
          {saveCompanyData ? <div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30} />
          </div>:currentStep === 1 
          && <CompanyInfoStep
              data = {{img: companyImage}}
              isErr = {isErr}
              formRef={formRef}
              errors = {error}
              setError = {setError}
              setFoundYear={setCompanyFoundDate}
              setCountry = {setCompanyCountry}
              setSize = {setCompanySize}
              setWebsite = {setCompanyWebsite}
              setIndustry = {setCompanyIndustry}
              setName = {setCompanyName}
              setImage = {setCompanyImage}
              companyName = {companyName}
              companyIndustry = {companyIndustry}
              companyWebsite = {companyWebsite}
              companySize = {companySize}
              companyCountry = {companyCountry}
              companyFoundDate = {companyFoundDate}/>}

          {saveFounder ? <div className = 'p-5 flex justify-center items-center'>
            <ButtonLoader size = {30} />
          </div>:currentStep === 2
          && <FounderInfoStep
              isErr = {isErr}
              formRef={formRef}
              error = {error}
              setError = {setError}
              setImage = {setFounderImage}
              setFirstname = {setFounderFirstName}
              setLastname = {setFounderLastName}
              setEmail = {setFounderEmail}
              setPhone = {setFounderPhone}
              setPassword = {setFounderPassword}
              setConfirmPassword = {setFounderConfirmPassword}
              founderFirstName = {founderFirstName}
              founderLastName = {founderLastName}
              founderEmail = {founderEmail}
              founderPhone = {founderPhone}
              founderPassword = {founderPassword}
              founderConfirmPassword = {founderConfirmPassword}/>}


          {currentStep === 3 && <BmcMethodStep onSelect={(method:string) => {
            setError('');
            setIsErr(false);
            setBmcMethod(method);
            setCurrentStep(4);
          }} />}


          {currentStep === 4 && bmcMethod == 'upload' && (
            <UploadBmcStep
            error = {error}
            setError = {setError}
            selectedFile={uploadedBmc}
            onFileSelect={(file:File):void => { setError(''); setUploadedBmc(file); }}
            />
          )}

          {currentStep === 4 && bmcMethod == 'ai' && <AiDiscoveryStep answers={bmcAnswer} setAnswers={setBmcAnswers} error = {error} setError = {setError}/>}

          {currentStep === 5 && <BmcScoreStep data = {''} score = {bmcScore} />}

          {currentStep === 6 && <PaymentStep setCurrentStep = {setCurrentStep} onCompleteRegistration = {handleCompleteRegistration} />}

          {currentStep === 7 && <SuccessStep />}
        </section>

        {currentStep >= 1 && currentStep < 7 && (
          <div className="mt-12 flex justify-between items-center border-t border-border pt-8 gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={isBusy}
                className="rounded-xl border border-border px-6 py-3 font-medium transition hover:bg-surface-hover disabled:opacity-50"
              >
                {t('public.register.back')}
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={() => nextStep()}
              disabled={isBusy}
              className="rounded-xl bg-primary px-8 py-3 font-medium text-white transition hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 min-w-[140px]"
            >
              {isBusy ? (
                <ButtonLoader size={20} />
              ) : currentStep === 6 ? (
                t('public.register.complete-registration')
              ) : (
                t('public.register.next')
              )}
            </button>
          </div>
        )}

        <AuthSwitcher 
          text={t('public.register.looking-to-invest-instead')} 
          buttonText={t('public.register.register-as-investor')} 
          href="/investor/register" 
        />
      </div>
    </div>
  );
}
