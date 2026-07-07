'use client';

import PaymentSection from "@/components/payment/Payment";
import { ButtonLoader } from "@/components/preloader/ButtonLoader";
import config from "@/constants/config";
import Plan from "@/types/requests/plans";
import { useTranslations } from "next-intl";
import { forbidden } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCheck, FiCreditCard, FiCalendar } from "react-icons/fi";

export default function PaymentStep() {
  const t = useTranslations();

  const [plans,setPlans] = useState<Plan[]>([]);

  const [loading,setLoading] = useState(true);
  const [err,setErr] = useState(false);

  const [monthly,setMonthly] = useState(true);

  const [paymentData,setPaymentData] = useState({
      paymentIntent: '',
      client_secret: "",
      price: 0
  });

  useEffect(() => {
    if( loading ) {
      fetch(config.apiUrl +'/plans')
      .then(res => res.status == 200 ? res.json():Promise.reject())
      .then(res => {
        setPlans(res);
      }).catch(() => setErr(true)).finally(() => setLoading(false));
    }
  },[]);

  if( loading ) {
    return <div className = 'p-5 flex justify-center items-center'>
      <ButtonLoader size = {30} />
    </div>
  }

  if( err ) {
    return forbidden();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">{t('public.register.choose-your-subscription')}</h2>

        <p className="mt-3 text-text-secondary">
          {t('public.register.select-a-plan-and-billing-cycle-to-activate-your-workspace')}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FiCalendar />
          {t('public.register.billing-cycle')}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <button onClick = {() => setMonthly(true)} className={"rounded-2xl border border-border p-5 text-left transition hover:border-primary "+ (monthly == true ? " border-primary bg-primary text-white":"")}>
            <h4 className="font-semibold">{t('public.register.monthly')}</h4>

            <p className="mt-2 text-sm text-text-secondary">
              {t('public.register.flexible-monthly-billing')}
            </p>
          </button>

          <button onClick = {() => setMonthly(false)} className={"rounded-2xl border border-border p-5 text-left transition hover:border-primary "+ (monthly == false ? " border-primary bg-primary text-white":"")}>
            <h4 className="font-semibold">{t('public.register.yearly')}</h4>

            {/* <p className="mt-2 text-sm text-text-secondary">
              Save up to 20% annually.
            </p> */}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">{t('public.register.select-a-plan')}</h3>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan:Plan) => {
            return (<div className={"rounded-3xl border border-border p-8 "+ (plan.isRecommended ? "shadow-lg relative":"")}>
              {plan.isRecommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
              {t('public.register.most-popular')}
            </div>}
            <h4 className="text-xl font-semibold">{t('public.plan.'+ plan.name)}</h4>

            <p className="mt-4 text-5xl font-bold">{plan.monthlyPrice} USD</p>

            <p className="mt-2 text-text-secondary">{t('public.pay.per-month')}</p>

            {/*<div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Basic Analytics
              </div>

              <div className="flex items-center gap-2">
                <FiCheck className="text-green-500" />
                Email Support
              </div>
            </div>*/}
          </div>)
          })}
      </div>

      <div className="rounded-3xl border border-border p-6">
        <PaymentSection redirect = {() => {}} paymentIntent = {paymentData.paymentIntent} clientSecret = {paymentData.client_secret} price = {paymentData.price} payment="service" additional=""/>
      </div>
    </div>
    </div>
  );
}
