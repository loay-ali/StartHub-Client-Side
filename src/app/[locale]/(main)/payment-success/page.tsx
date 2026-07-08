"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

import { useSearchParams,useRouter } from "next/navigation";

import successAnimation from "@/public/lotties/payment-success.json";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');

  if( ! paymentId ) {
    router.replace("/");
  }

  return (
    <div className="bg-[#F8FAFC] flex min-h-screen items-center justify-center px-6 py-12">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          w-full
          max-w-2xl
          rounded-[24px]
          border
          border-[#D1FAE5]
          bg-white
          p-12
          text-center
          shadow-[0_8px_30px_rgba(15,118,110,0.12)]
        "
      >
        {/* Lottie */}
        <div className="mx-auto mb-8 h-[320px] w-[320px]">
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-xl text-lg leading-8 text-[#475569]">
          Your payment has been completed successfully. You can now continue
          using all StartHub services and access your dashboard.
        </p>

        {/* Button */}
        <Link
          href="/dashboard"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-[#0F766E]
            px-8
            py-4
            text-base
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#115E59]
          "
        >
          Go To Dashboard
        </Link>
      </motion.div>
    </div>
  );
}