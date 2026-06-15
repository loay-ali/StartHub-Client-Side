"use client";

import Image from "next/image";
import { useState } from "react";

import PaymentTabs from "./PaymentTabs";
import { paymentMethods } from "./paymentMethods";

export default function CheckoutPage() {
  const [activeMethod, setActiveMethod] = useState("visa");

  const [cardNumber, setCardNumber] = useState("");

  const [expiryDate, setExpiryDate] = useState("");

  const [cvv, setCvv] = useState("");

  const selectedMethod =
    paymentMethods.find((method) => method.id === activeMethod) ||
    paymentMethods[0];

  const handleCardNumberChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    const formatted = numbersOnly.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    let formatted = numbersOnly;

    if (numbersOnly.length > 2) {
      formatted = numbersOnly.slice(0, 2) + "/" + numbersOnly.slice(2, 4);
    }

    setExpiryDate(formatted.slice(0, 5));
  };

  const handleCvvChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    setCvv(numbersOnly.slice(0, 3));
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-[32px] border border-border bg-surface p-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-text-primary">Checkout</h1>

          <p className="mt-4 text-text-secondary">
            Complete your payment using your preferred method.
          </p>
        </div>

        <div className="mt-12">
          <PaymentTabs
            activeMethod={activeMethod}
            onChange={setActiveMethod}
            methods={paymentMethods}
          />
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-background p-10">
          <div className="flex justify-center">
            <Image
              src={selectedMethod.image}
              alt={selectedMethod.name}
              width={120}
              height={70}
              className="h-16 w-auto object-contain"
            />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-text-primary">
            Pay with {selectedMethod.name}
          </h2>

          <div className="mx-auto mt-10 min-h-[260px] max-w-xl">
            {activeMethod === "visa" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => handleExpiryDateChange(e.target.value)}
                    className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                  />
                </div>
              </div>
            )}

            {activeMethod === "paypal" && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="PayPal Email"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>
            )}

            {activeMethod === "stripe" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => handleExpiryDateChange(e.target.value)}
                    className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                  />
                </div>
              </div>
            )}

            {activeMethod === "wallet" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
                />

                <select className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary">
                  <option>Vodafone Cash</option>

                  <option>Orange Cash</option>

                  <option>Etisalat Cash</option>
                </select>
              </div>
            )}

            <button className="mt-8 w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90">
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
