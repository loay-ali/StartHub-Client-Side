"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Save, ArrowLeft } from "lucide-react";

interface PaymentMethod {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface UpdatePaymentMethodProps {
  payment?: PaymentMethod;
  onSave?: (payment: PaymentMethod) => void;
}

export default function UpdatePaymentMethod({
  payment = {
    cardHolder: "Investor Account",
    cardNumber: "**** **** **** 4589",
    expiryDate: "08/28",
    cvv: "***",
  },
  onSave,
}: UpdatePaymentMethodProps) {
  const [form, setForm] = useState(payment);

  const handleChange = (field: keyof PaymentMethod, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Update Payment Method
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Update your payment card information.
            </p>
          </div>

          <CreditCard size={28} className="text-teal-700" />
        </div>

        {/* Form */}

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Card Holder
            </label>

            <input
              value={form.cardHolder}
              onChange={(e) => handleChange("cardHolder", e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Card Number
            </label>

            <input
              value={form.cardNumber}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expiry Date
              </label>

              <input
                value={form.expiryDate}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
                placeholder="MM/YY"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                CVV
              </label>

              <input
                value={form.cvv}
                onChange={(e) => handleChange("cvv", e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-8 flex justify-end gap-3">
          <Link
            href="/dashboard/investor/subscription"
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Cancel
          </Link>

          <button
            onClick={() => onSave?.(form)}
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
