'use client';

import { useTranslations } from "next-intl";
import { FiCheckCircle } from "react-icons/fi";

export default function SuccessStep() {
  const t = useTranslations();
  
  return (
    <div className="mx-auto max-w-3xl text-center">
      <FiCheckCircle className="mx-auto text-primary" size={90} />

      <h2 className="mt-6 text-4xl font-bold">
        {t('public.register.registration-completed')}
      </h2>

      <p className="mt-4 text-lg text-text-secondary">
        {t('public.register.your-company-workspace-has-been-created-successfully')}
      </p>

      <div className="mt-10 rounded-3xl border border-border p-8">
        <h3 className="text-xl font-semibold">{t('public.register.welcome-to-startHub')} 🚀</h3>
      </div>
    </div>
  );
}
