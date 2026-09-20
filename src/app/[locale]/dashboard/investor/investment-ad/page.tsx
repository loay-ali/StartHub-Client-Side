"use client";

import {
  FiDollarSign,
  FiTarget,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";

export default function InvestmentAdPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-10 text-white shadow-xl">
        <h1 className="text-5xl font-extrabold">
          Create Investment Opportunity 🚀
        </h1>

        <p className="mt-4 max-w-3xl text-xl text-teal-100">
          Publish a new investment opportunity and connect with promising
          startups.
        </p>
      </div>

      {/* Budget + Investor Type */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget */}
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
              <FiDollarSign size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Investment Budget</h2>

              <p className="mt-1 text-gray-500">Available capital to invest</p>
            </div>
          </div>

          <input
            type="number"
            placeholder="500,000"
            className="
              w-full
              rounded-2xl
              border
              p-5
              text-3xl
              font-bold
              outline-none
              transition
              focus:border-teal-600
            "
          />
        </div>

        {/* Investor Type */}
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
              <FiTarget size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Investor Type</h2>

              <p className="mt-1 text-gray-500">
                Choose your investment strategy
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Angel */}
            <button
              type="button"
              className="
                rounded-2xl
                border-2
                border-teal-600
                bg-teal-50
                p-6
                text-left
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <div className="mb-4 text-teal-700">
                <FiDollarSign size={40} />
              </div>

              <h3 className="text-2xl font-bold">Angel Investor</h3>

              <p className="mt-3 text-gray-500">Passive investment strategy.</p>
            </button>

            {/* Involved */}
            <button
              type="button"
              className="
                rounded-2xl
                border
                p-6
                text-left
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <div className="mb-4 text-teal-700">
                <FiBriefcase size={40} />
              </div>

              <h3 className="text-2xl font-bold">Involved Investor</h3>

              <p className="mt-3 text-gray-500">
                Active participation strategy.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Investment Focus */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-2xl bg-teal-50 p-4 text-teal-700">
            <FiTrendingUp size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">Investment Focus</h2>

            <p className="mt-1 text-gray-500">Select the industry you prefer</p>
          </div>
        </div>

        <select
          className="
            w-full
            rounded-2xl
            border
            p-5
            text-xl
            outline-none
            focus:border-teal-600
          "
        >
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Finance</option>
          <option>Education</option>
          <option>Energy</option>
        </select>
      </div>

      {/* Terms */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="mb-3 text-3xl font-bold">Terms & Conditions</h2>

        <p className="mb-6 text-gray-500">
          Describe your investment requirements and conditions.
        </p>

        <textarea
          rows={6}
          placeholder="Write your investment terms..."
          className="
            w-full
            rounded-2xl
            border
            p-5
            text-lg
            outline-none
            focus:border-teal-600
          "
        />
      </div>

      {/* Goals */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="mb-3 text-3xl font-bold">Investment Goals</h2>

        <p className="mb-6 text-gray-500">
          Describe what kind of startups you are looking for.
        </p>

        <textarea
          rows={5}
          placeholder="Describe your investment goals..."
          className="
            w-full
            rounded-2xl
            border
            p-5
            text-lg
            outline-none
            focus:border-teal-600
          "
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="button"
          className="
            rounded-2xl
            bg-teal-700
            px-10
            py-4
            text-xl
            font-semibold
            text-white
            shadow-lg
            transition
            hover:-translate-y-1
            hover:bg-teal-800
          "
        >
          Publish Opportunity
        </button>
      </div>
    </div>
  );
}
