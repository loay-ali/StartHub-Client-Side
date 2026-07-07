"use client";

import { CreditCard, Pencil } from "lucide-react";
import Link from "next/link";
interface PaymentMethod {
  brand: string;
  last4: string;
  holder: string;
  expiry: string;
}

interface PaymentMethodProps {
  payment?: PaymentMethod;
  onUpdate?: () => void;
}

export default function PaymentMethod({
  payment = {
    brand: "Visa",
    last4: "4589",
    holder: "Investor Account",
    expiry: "08/28",
  },
  onUpdate,
}: PaymentMethodProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your default payment card.
          </p>
        </div>

        <Link
          href="/dashboard/investor/subscription/payment-method"
          className="flex items-center gap-2 rounded-lg border border-teal-700 px-3 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
        >
          <Pencil size={16} />
          Update
        </Link>
      </div>

      {/* Card */}

      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-5 text-white">
        <div className="mb-6 flex items-center justify-between">
          <CreditCard size={26} />

          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            {payment.brand}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-[3px]">
          •••• •••• •••• {payment.last4}
        </h3>

        <div className="mt-6 flex justify-between">
          <div>
            <p className="text-xs text-slate-300">Card Holder</p>

            <h4 className="mt-1 text-sm font-medium">{payment.holder}</h4>
          </div>

          <div>
            <p className="text-xs text-slate-300">Expires</p>

            <h4 className="mt-1 text-sm font-medium">{payment.expiry}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
