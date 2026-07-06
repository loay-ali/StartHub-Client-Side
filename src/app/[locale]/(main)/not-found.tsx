"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import { ArrowLeft, House, Mail } from "lucide-react";
import notFoundAnimation from "@/public/lotties/not-found.json";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Illustration */}
          <div className="flex justify-center">
            <div className="w-full max-w-[500px]">
              <Lottie animationData={notFoundAnimation} loop />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Error code */}
            <span className="text-7xl font-black tracking-tight text-teal-700 md:text-8xl">
              404
            </span>

            {/* Title */}
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Oops! Page Not Found
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
              The page you are looking for might have been removed, renamed, or
              is temporarily unavailable.
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              {/* Home */}
              <Link
                href="/"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-teal-700
                  px-6
                  py-3
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-teal-800
                  hover:shadow-lg
                "
              >
                <House size={18} />
                Home
              </Link>

              {/* Contact */}
              <Link
                href="/contact-us"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-6
                  py-3
                  text-slate-700
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-slate-400
                  hover:shadow-md
                "
              >
                <Mail size={18} />
                Contact Us
              </Link>

              {/* Back */}
              <button
                onClick={() => history.back()}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-6
                  py-3
                  text-slate-700
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-slate-400
                  hover:shadow-md
                "
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
