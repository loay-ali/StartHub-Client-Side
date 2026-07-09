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

import { useState,useEffect, useRef } from 'react';
import config from "@/constants/config";
import { register } from "module";
import { ButtonLoader } from "../preloader/ButtonLoader";
import { useTranslations } from "next-intl";
import { forbidden } from "next/navigation";

export default function RegistrationPage() {

  const [currentStep,setCurrentStep] = useState(6);

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
    fetch('/api/registeration').then(() => setLoading(false)).catch(() => setErrorFetching(true));

    if( uploadingBmc ) {
      fetch(config.apiUrl +'/registeration/fill-bmc?token=registerationToken',{
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
        
      });
    }

    if( errorFetching ) {
      return forbidden();
    }

    if( saveFounder ) {
        const formData = new FormData();
        if( founderImage ) formData.append('file',founderImage);

        fetch(config.apiUrl +'/registeration/founder-image',{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: formData
        }).then(res => res.json())
        .then(({filePath}:{filePath:string}) => {

          fetch(config.apiUrl +'/registeration/founder',{
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                image: filePath,
                firstName:founderFirstName,
                lastName:founderLastName,
                phone: founderPhone,
                email: founderEmail,
                password: founderPassword
              })
            }
          ).then(res => {
            if( res.status == 200 ) {
              setCurrentStep(s => s + 1);
              return;
            }

            return Promise.reject();
          })
        })
    }

    if( saveCompanyData ) {

      const formData = new FormData();
      if( companyImage ) formData.append('file',companyImage);

      //Upload Image
      if( companyImage ) {
        fetch(config.apiUrl +'/registeration/company-image',{
          method: 'POST',
          credentials: 'include',
          headers: {
          'Content-Type': "multipart/form-data",
        },body: formData}).then(response => response.status == 200 ? response.json():Promise.reject()).then(res => {
            fetch(config.apiUrl +'/registeration/company',{method: 'POST',credentials: 'include',headers: {'Content-Type': 'application/json'},body: JSON.stringify({
              image: res.filePath,
              name: companyName,
              industry: companyIndustry,
              website: companyWebsite,
              size: companySize,
              country: companyCountry 
            })}).then(() => {
              setSaveCompanyData(false);
              setCurrentStep(s => s + 1);
            });
        })
      }else {
          fetch(config.apiUrl +'/registeration/company',{method: 'POST',credentials: 'include',headers: {'Content-Type': 'application/json'},body: JSON.stringify({
            name: companyName,
            industry: companyIndustry,
            website: companyWebsite,
            size: companySize,
            country: companyCountry 
          })}).then(() => {
            setSaveCompanyData(false);
            setCurrentStep(s => s + 1);
          }) 
      }

      fetch(config.apiUrl +'/registeration/company',{method: 'POST',credentials: 'include',headers: {'Content-Type': 'application/json'},body: JSON.stringify({
        name: companyName,
        industry: companyIndustry,
        website: companyWebsite,
        size: companySize,
        country: companyCountry 
      })}).then(() => {
        setSaveCompanyData(false);
        setCurrentStep(s => s + 1);
      })
    }
  },[saveCompanyData,saveFounder]);

  if( loading ) return (
    <div className = 'p-5 flex items-center justify-center'>
      <ButtonLoader size = {30} />
    </div>
  );

  function nextStep() {
    setIsErr(false);
    if( formRef?.current?.checkValidity?.() == false ) {
      formRef?.current?.scrollIntoView();
      setIsErr(true);
      return;
    }

    setCurrentStep(step => step + 1);
  }

  return (
    <div className="min-h-screen bg-background p-8 mt-20">
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
          {currentStep === 1 
          && <CompanyInfoStep
              data = {{img: companyImage}}
              isErr = {isErr}
              formRef={formRef}
              errors = {error}
              setError = {setError}
              setCountry = {setCompanyCountry}
              setSize = {setCompanySize}
              setWebsite = {setCompanyWebsite}
              setIndustry = {setCompanyIndustry}
              setName = {setCompanyName}
              setImage = {setCompanyImage}/>}

          {currentStep === 2
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
              setConfirmPassword = {setFounderConfirmPassword}/>}


          {currentStep === 3 && <BmcMethodStep onSelect={(method:string) => {
            setBmcMethod(method);
            setCurrentStep(s => s + 1);
          }} />}


          {currentStep === 4 && bmcMethod == 'upload' && (
            <UploadBmcStep
            error = {error}
            setError = {setError}
            selectedFile={uploadedBmc}
            onFileSelect={(file:File):void => setUploadedBmc(file)}
            />
          )}

          {currentStep === 4 && bmcMethod == 'ai' && <AiDiscoveryStep error = {error} setError = {setError}/>}

          {currentStep === 5 && <BmcScoreStep data = {''} score = {bmcScore} />}

          {currentStep === 6 && <PaymentStep setCurrentStep = {setCurrentStep} />}

          {currentStep === 7 && <SuccessStep />}
        </section>

        {currentStep >= 1 && currentStep < 7 && (
          <div className="mt-12 flex justify-between border-t border-border pt-8">
            <button
              onClick = {() => setCurrentStep(currentStep - 1)}
              className="rounded-xl border border-border px-6 py-3 transition hover:bg-slate-50"
            >
              Back
            </button>

            <button
              onClick = {() => nextStep()}
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
