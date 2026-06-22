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

import { useState,useEffect } from 'react';
import config from "@/constants/config";
import { register } from "module";

export default function RegistrationPage() {

  const [registerationToken,setRegisterationToken] = useState('');
  const [currentStep,setCurrentStep] = useState(5);

  const [bmcMethod,setBmcMethod] = useState('');

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

  useEffect(() => {
    if( registerationToken == '' ) {
      fetch('/api/registeration').then(res => res.json()).then(token => setRegisterationToken(token.token));
    }

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

          fetch(config.apiUrl +'/registeration/founder?token='+ registerationToken,{
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
            fetch(config.apiUrl +'/registeration/company?token='+ registerationToken,{method: 'POST',credentials: 'include',headers: {'Content-Type': 'application/json'},body: JSON.stringify({
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
          fetch(config.apiUrl +'/registeration/company?token='+ registerationToken,{method: 'POST',credentials: 'include',headers: {'Content-Type': 'application/json'},body: JSON.stringify({
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

      fetch(config.apiUrl +'/registeration/company?token='+ registerationToken,{method: 'POST',credentials: 'include',headers: {'Content-Type': 'application/json'},body: JSON.stringify({
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

  if( ! registerationToken ) return (<strong className = 'text-center'>Loading...</strong>);

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

        <section>
          {currentStep === 1 
          && <CompanyInfoStep
              setCountry = {setCompanyCountry}
              setSize = {setCompanySize}
              setWebsite = {setCompanyWebsite}
              setIndustry = {setCompanyIndustry}
              setName = {setCompanyName}
              setImage = {setCompanyImage}
              registerationToken = {registerationToken}/>}

          {currentStep === 2
          && <FounderInfoStep
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
            selectedFile={uploadedBmc}
            onFileSelect={(file:File):void => setUploadedBmc(file)}
            />
          )}

          {currentStep === 4 && bmcMethod == 'ai' && <AiDiscoveryStep />}

          {currentStep === 5 && <BmcScoreStep score = {bmcScore} />}

          {currentStep === 6 && <PaymentStep />}

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
              onClick = {() => (
                currentStep == 1 ? setSaveCompanyData(true):(
                currentStep == 2 ? setSaveFounder(true):(
                currentStep == 4 ? setUploadingBmc(true):setCurrentStep(currentStep + 1))))}
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
