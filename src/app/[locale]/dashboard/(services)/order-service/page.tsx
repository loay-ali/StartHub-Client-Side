import Stepper from "@/components/dashboard/pages/orderService/Stepper";

import ChooseService from '@/components/dashboard/pages/orderService/ChooseService';
import ServiceData from '@/components/dashboard/pages/orderService/ServiceData';

import Link from 'next/link';
import OrderPlaced from "@/components/dashboard/pages/orderService/Congrats";
import PaymentSection from "@/components/payment/Payment";
import ServicePayments from "@/components/dashboard/pages/orderService/ServicePayment";

export default async function OrderService({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const currentStep:number = params.step ? Number(params.step):1;

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

                    <section>
                        {currentStep === 1 && <ChooseService/>}
                        {currentStep === 2 && <ServiceData searchParams = {searchParams}/>}
                        {currentStep === 3 && <ServicePayments />}
                        {currentStep === 4 && <OrderPlaced />}
                    </section>

                    {currentStep >= 1 && currentStep < 4 && (
                    <div className="mt-12 flex justify-between border-t border-border pt-8">
                        <Link
                        href={'?step='+ (currentStep - 1)}
                        className="rounded-xl border border-border px-6 py-3 transition hover:bg-slate-50"
                        >
                        Back
                        </Link>

                        {currentStep < 2 && <Link
                        href={'?step='+ (currentStep + 1)}
                        className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
                        >Next
                        </Link>}
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}