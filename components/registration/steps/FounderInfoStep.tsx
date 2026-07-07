import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock, FiUploadCloud } from "react-icons/fi";

export default function FounderInfoStep({formRef,isErr,error,setError,setImage,setFirstname,setLastname,setPhone,setEmail,setPassword,setConfirmPassword}:any) {
  const t = useTranslations();
  
  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImg(url);
    }
  };

  const [img,setImg] = useState('');

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">{t('public.register.founder-information')}</h2>

        <p className="mt-3 text-text-secondary">
          {t('public.register.create-the-primary-account-owner-for-your-company')}
        </p>
      </div>

      <form onInvalid = {(e:any) => {console.log(e);setError(e.target.dataset.error)}} ref = {formRef} className="space-y-6">
        {isErr && error && <p className = 'text-red-500'>{t('public.errors.'+ error)}</p>}
        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-4 text-xl font-semibold">{t('public.register.upload-photo')}</h3>

          <label className="block cursor-pointer">
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center transition hover:border-primary">
               {img ? <img className = 'mx-auto' src = {img} />:<><FiUploadCloud className="mx-auto mb-4 text-5xl text-primary" />

              <p className="font-medium">{t('public.register.upload-profile-photo')}</p>

              <p className="mt-2 text-sm text-text-secondary">
                PNG, JPG
              </p></>}
            </div>

            <input onInput = {(ele) => {
                setImage(ele.currentTarget.files?.[0])
                handleFileChange(ele) 
            }} type="file" accept=".png,.jpg,.jpeg" className="hidden" />
          </label>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">{t('public.register.personal-information')}</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                required = {true}
                data-error = "first-name-is-required"
                onInput = {(ele) => setFirstname(ele.currentTarget.value)}
                placeholder={t('public.register.first-name')}
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
              required = {true}
              data-error = "last-name-is-required"
              onInput = {(ele) => setLastname(ele.currentTarget.value)}
                placeholder={t('public.register.last-name')}
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
              required = {true}
              data-error = "email-is-required"
                onInput = {(ele) => setEmail(ele.currentTarget.value)}
                type="email"
                placeholder={t('public.register.email')}
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                required = {true}
                data-error = "phone-is-required"
                onInput = {(ele) => setPhone(ele.currentTarget.value)}
                placeholder={t('public.register.phone')}
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6">
          <h3 className="mb-6 text-xl font-semibold">Account Security</h3>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                required = {true}
                data-error = "password-is-required"
                onInput = {(ele) => setPassword(ele.currentTarget.value)}
                type="password"
                placeholder={t('public.register.password')}
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                required = {true}
                data-error = "password-not-match"
                onInput = {(ele) => setConfirmPassword(ele.currentTarget.value)}
                type="password"
                placeholder={t('public.register.repeat-password')}
                className="w-full rounded-xl border border-border py-3 pl-11 pr-4"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
