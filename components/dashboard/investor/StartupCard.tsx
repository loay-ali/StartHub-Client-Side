"use client";

import {
  FiArrowRight,
  FiDollarSign,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";

interface Props {
  companyName: string;
  industry: string;
  description: string;
  budget: string;
  score: number;
  stage: string;
}

export default function StartupCard({
  companyName,
  industry,
  description,
  budget,
  score,
  stage,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-teal-50
            text-2xl
            font-bold
            text-teal-700
          "
        >
          {companyName[0]}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{companyName}</h2>

          <p className="text-gray-500">{industry}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 line-clamp-3 text-gray-600">{description}</p>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <FiDollarSign />
            Budget
          </div>

          <span className="font-semibold">{budget}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <FiTrendingUp />
            BMC Score
          </div>

          <span className="font-semibold text-green-600">{score}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <FiBriefcase />
            Stage
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1">{stage}</span>
        </div>
      </div>

      {/* Button */}
      <button
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-teal-700
          py-3
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-teal-800
        "
      >
        View Company
        <FiArrowRight />
      </button>
    </div>
  );
}
